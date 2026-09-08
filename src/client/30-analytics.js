    function tokenLabel(value) {
      const number = Number(value)
      if (!Number.isFinite(number)) return '—'
      return new Intl.NumberFormat('zh-CN', {
        notation: number >= 10_000 ? 'compact' : 'standard',
        maximumFractionDigits: number >= 10_000 ? 1 : 0,
      }).format(number)
    }

    function exactTokens(value) {
      const number = Number(value)
      return Number.isFinite(number) ? new Intl.NumberFormat('zh-CN').format(number) : '—'
    }

    function dateFromKey(key) {
      const parts = String(key ?? '').split('-').map(Number)
      if (parts.length !== 3 || parts.some(value => !Number.isInteger(value))) return null
      const date = new Date(parts[0], parts[1] - 1, parts[2], 12)
      return Number.isFinite(date.getTime()) ? date : null
    }

    function clientDateKey(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    function createClientTotals() {
      return { total: 0, input: 0, output: 0, cacheRead: 0, cacheWrite: 0, reasoning: 0 }
    }

    function addClientRecord(target, record) {
      target.total += Number(record.total) || 0
      target.input += Number(record.input) || 0
      target.output += Number(record.output) || 0
      target.cacheRead += Number(record.cacheRead) || 0
      target.cacheWrite += Number(record.cacheWrite) || 0
      target.reasoning += Number(record.reasoning) || 0
    }

    function clientBreakdownRows(map) {
      return [...map.values()].sort((a, b) => b.total - a.total || b.requests - a.requests || a.id.localeCompare(b.id)).slice(0, 12)
    }

    function filterAnalyticsState(state, rangeDays, providerFilter, modelFilter) {
      if (!Array.isArray(state?.records)) return state
      const records = state.records
      const end = dateFromKey(state?.rangeEnd) ?? new Date()
      const start = new Date(end)
      start.setDate(start.getDate() - (Math.max(1, Number(rangeDays) || 365) - 1))
      const rangeStart = clientDateKey(start)
      const rangeEnd = clientDateKey(end)
      const selected = records.filter(record => {
        const provider = String(record.provider ?? 'unknown')
        const model = String(record.model ?? 'unknown')
        const route = `${provider}/${model}`
        return record.date >= rangeStart
          && record.date <= rangeEnd
          && (providerFilter === 'all' || provider === providerFilter)
          && (modelFilter === 'all' || route === modelFilter)
      })
      const totals = createClientTotals()
      const daily = new Map()
      const providers = new Map()
      const models = new Map()
      for (const record of selected) {
        addClientRecord(totals, record)
        const day = daily.get(record.date) ?? { date: record.date, ...createClientTotals(), requests: 0 }
        addClientRecord(day, record)
        day.requests += 1
        daily.set(record.date, day)
        const providerId = String(record.provider ?? 'unknown')
        const provider = providers.get(providerId) ?? { id: providerId, total: 0, requests: 0 }
        provider.total += Number(record.total) || 0
        provider.requests += 1
        providers.set(providerId, provider)
        const modelId = `${providerId}/${String(record.model ?? 'unknown')}`
        const model = models.get(modelId) ?? { id: modelId, total: 0, requests: 0 }
        model.total += Number(record.total) || 0
        model.requests += 1
        models.set(modelId, model)
      }
      const dates = [...daily.keys()].sort()
      return {
        ...state,
        rangeStart,
        rangeEnd,
        coverageStart: dates[0] ?? '',
        reasoningReported: selected.some(record => record.reasoningReported === true),
        sessionCount: new Set(selected.map(record => record.session)).size,
        activeDays: daily.size,
        requestCount: selected.length,
        totals,
        daily: [...daily.values()].sort((a, b) => a.date.localeCompare(b.date)),
        providers: clientBreakdownRows(providers),
        models: clientBreakdownRows(models),
        records: selected,
      }
    }

    function analyticsFilterOptions(state, providerFilter) {
      const records = Array.isArray(state?.records) ? state.records : []
      const providers = [...new Set(records.map(record => String(record.provider ?? 'unknown')))].sort()
      const models = [...new Set(records
        .filter(record => providerFilter === 'all' || String(record.provider ?? 'unknown') === providerFilter)
        .map(record => `${String(record.provider ?? 'unknown')}/${String(record.model ?? 'unknown')}`))].sort()
      return { providers, models }
    }

    function dayUsageDetail(state, date) {
      const records = (Array.isArray(state?.records) ? state.records : []).filter(record => record.date === date)
      const totals = createClientTotals()
      const models = new Map()
      for (const record of records) {
        addClientRecord(totals, record)
        const key = `${String(record.provider ?? 'unknown')}/${String(record.model ?? 'unknown')}`
        models.set(key, (models.get(key) ?? 0) + (Number(record.total) || 0))
      }
      const cache = totals.cacheRead + totals.cacheWrite
      const base = totals.input + totals.output + cache
      const share = value => base > 0 ? Math.round((value / base) * 100) : 0
      return {
        date,
        requests: records.length,
        totals,
        cache,
        inputShare: share(totals.input),
        outputShare: share(totals.output),
        cacheShare: share(cache),
        models: [...models.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => id),
      }
    }

    function analyticsFreshness(state, nowTime = Date.now()) {
      if (state === null || state === undefined) return { kind: 'unavailable', title: '尚未读取本地统计', detail: '等待首次扫描' }
      const successful = Number(state.lastSuccessfulAt || state.generatedAt) || 0
      const attempted = Number(state.attemptedAt) || 0
      if (state.status === 'error') return {
        kind: 'error',
        title: successful > 0 ? `扫描失败，保留上次结果 · ${relativeAgeLabel(successful, nowTime)}` : '本地统计扫描失败',
        detail: `最后扫描：${timeLabel(attempted)}${state.message ? ` · ${state.message}` : ''}`,
      }
      if (state.status === 'unavailable') return {
        kind: 'unavailable',
        title: successful > 0 ? `会话服务不可用，保留上次结果 · ${relativeAgeLabel(successful, nowTime)}` : '会话服务不可用',
        detail: `最后扫描：${timeLabel(attempted)}${state.message ? ` · ${state.message}` : ''}`,
      }
      const expired = successful > 0 && nowTime - successful > 6 * 60_000
      return {
        kind: expired ? 'stale' : 'ok',
        title: expired ? `本地统计已过期 · ${relativeAgeLabel(successful, nowTime)}` : relativeAgeLabel(successful, nowTime),
        detail: `本地统计最后扫描：${timeLabel(attempted)}`,
      }
    }

    function buildHeatmap(state) {
      const end = dateFromKey(state?.rangeEnd) ?? new Date()
      const start = dateFromKey(state?.rangeStart) ?? new Date(end.getFullYear(), end.getMonth(), end.getDate() - 364, 12)
      const byDate = new Map((Array.isArray(state?.daily) ? state.daily : []).map(day => [day.date, day]))
      const coverageStart = typeof state?.coverageStart === 'string' ? state.coverageStart : ''
      const cells = Array.from({ length: start.getDay() }, () => null)
      for (const cursor = new Date(start); cursor <= end; cursor.setDate(cursor.getDate() + 1)) {
        const key = clientDateKey(cursor)
        const actual = byDate.get(key)
        const recorded = actual !== undefined || (coverageStart.length > 0 && key >= coverageStart)
        cells.push(actual === undefined
          ? { date: key, total: recorded ? 0 : null, requests: recorded ? 0 : null, recorded }
          : { ...actual, recorded: true })
      }
      const maximum = Math.max(0, ...cells.filter(day => day?.recorded).map(day => Number(day.total) || 0))
      const weeks = Math.ceil(cells.length / 7)
      const months = []
      let lastMonth = ''
      cells.forEach((day, index) => {
        if (day === null) return
        const date = dateFromKey(day.date)
        if (date === null) return
        const key = `${date.getFullYear()}-${date.getMonth()}`
        if (key === lastMonth) return
        lastMonth = key
        months.push({ key, label: `${date.getMonth() + 1}月`, column: Math.floor(index / 7) + 1 })
      })
      const timeline = months.filter((month, index) => {
        const next = months[index + 1]
        return next === undefined || next.column - month.column >= 4
      })
      return { cells, maximum, weeks, months: timeline }
    }

    function ActivityLegend({ state }) {
      return el('div', { className: 'dsh-signal-heatmap-legend', 'aria-hidden': 'true' },
        el('span', { className: 'unrecorded' }, el('i'), '未记录'),
        el('span', { className: 'zero' }, el('i'), '已记录 · 0'),
        el('span', { className: 'used' }, el('i'), '有用量'),
        el('span', { className: 'range' }, el('i'), '淡化 · 范围外'),
        el('span', null, state.coverageStart ? `记录始于 ${state.coverageStart}` : '暂无用量记录'))
    }

    function MonthTimeline({ months, count, className = 'dsh-signal-heatmap-months' }) {
      return el('div', { className, style: { '--dsh-signal-weeks': count } },
        months.map(month => el('span', {
          key: month.key,
          className: 'dsh-signal-heatmap-month',
          style: { gridColumn: `${month.column} / span 4` },
        }, month.label)))
    }

    function DailyActivity({ state, calendarState }) {
      const annualState = calendarState ?? state
      const { cells, maximum, weeks, months } = useMemo(() => buildHeatmap(annualState), [annualState])
      const activeDays = cells.filter(day => day?.recorded && Number(day.total) > 0)
      const recordedDays = cells.filter(day => day?.recorded)
      const [hoveredDate, setHoveredDate] = useState(null)
      const [pinnedDate, setPinnedDate] = useState(null)
      const viewRef = useRef(null)
      const userScrolledRef = useRef(false)
      const restoringScrollRef = useRef(false)
      const scrollReadyRef = useRef(false)
      useEffect(() => {
        const view = viewRef.current
        const viewport = view?.parentElement
        if (!(viewport instanceof HTMLElement)) return undefined
        const onScroll = () => {
          if (scrollReadyRef.current && !restoringScrollRef.current) userScrolledRef.current = true
        }
        viewport.addEventListener('scroll', onScroll, { passive: true })
        return () => viewport.removeEventListener('scroll', onScroll)
      }, [])
      useLayoutEffect(() => {
        const view = viewRef.current
        const viewport = view?.parentElement
        if (!(viewport instanceof HTMLElement)) return undefined
        userScrolledRef.current = false
        scrollReadyRef.current = false
        const alignToLatest = () => {
          if (!userScrolledRef.current && viewport.scrollWidth > viewport.clientWidth) {
            restoringScrollRef.current = true
            viewport.scrollLeft = viewport.scrollWidth - viewport.clientWidth
            window.requestAnimationFrame(() => {
              restoringScrollRef.current = false
              scrollReadyRef.current = true
            })
          } else {
            scrollReadyRef.current = true
          }
        }
        const frame = window.requestAnimationFrame(alignToLatest)
        const resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(() => {
          if (!userScrolledRef.current) window.requestAnimationFrame(alignToLatest)
        }) : null
        resizeObserver?.observe(viewport)
        resizeObserver?.observe(view)
        window.addEventListener('resize', alignToLatest)
        return () => {
          window.cancelAnimationFrame(frame)
          resizeObserver?.disconnect()
          window.removeEventListener('resize', alignToLatest)
        }
      }, [annualState.rangeStart, annualState.rangeEnd, annualState.coverageStart])
      useEffect(() => {
        if (pinnedDate !== null && !recordedDays.some(day => day.date === pinnedDate)) setPinnedDate(null)
      }, [pinnedDate, annualState.rangeStart, annualState.rangeEnd])
      const selectedDate = hoveredDate ?? pinnedDate ?? activeDays.at(-1)?.date ?? recordedDays.at(-1)?.date ?? null
      const detail = selectedDate === null ? null : dayUsageDetail(annualState, selectedDate)
      const summary = state.coverageStart
        ? `完整年度每日 Token 热力图，当前筛选 ${state.rangeStart} 至 ${state.rangeEnd}，共 ${exactTokens(state.activeDays)} 个活跃日，总计 ${exactTokens(state.totals?.total)} Token`
        : `完整年度每日 Token 热力图，当前筛选 ${state.rangeStart} 至 ${state.rangeEnd}，暂无可汇总记录`
      return el('div', { ref: viewRef, className: 'dsh-signal-activity-view', 'data-activity-mode': 'daily' },
        el('div', { className: 'dsh-signal-heatmap', role: 'grid', 'aria-label': summary },
          cells.map((day, index) => {
            if (day === null) return el('span', { key: `blank-${index}`, className: 'dsh-signal-heat-cell blank', 'aria-hidden': 'true' })
            const inRange = day.date >= state.rangeStart && day.date <= state.rangeEnd
            if (!day.recorded) return el('span', {
              key: day.date,
              className: `dsh-signal-heat-cell unrecorded${inRange ? '' : ' outside-range'}`,
              title: `${day.date}：未记录${inRange ? '' : ' · 当前筛选范围外'}`,
              'aria-hidden': 'true',
            })
            const total = Number(day.total) || 0
            const level = total <= 0 || maximum <= 0 ? 0 : Math.max(1, Math.min(4, Math.ceil(Math.sqrt(total / maximum) * 4)))
            const label = `${day.date}：${exactTokens(total)} Token，${exactTokens(day.requests)} 次请求${inRange ? '' : '，当前筛选范围外'}`
            return el('button', {
              key: day.date,
              type: 'button',
              className: `dsh-signal-heat-cell interactive${inRange ? '' : ' outside-range'}${pinnedDate === day.date ? ' pinned' : ''}`,
              'data-level': String(level),
              'data-dsh-signal-day': day.date,
              'data-in-range': inRange ? 'true' : 'false',
              style: { '--dsh-signal-cell-delay': `${Math.min(360, index * 4)}ms` },
              title: label,
              'aria-label': `${label}。悬停查看明细，点击${pinnedDate === day.date ? '取消固定' : '固定明细'}`,
              'aria-pressed': pinnedDate === day.date,
              onPointerEnter: () => setHoveredDate(day.date),
              onPointerLeave: () => setHoveredDate(null),
              onFocus: () => setHoveredDate(day.date),
              onBlur: () => setHoveredDate(null),
              onClick: () => setPinnedDate(value => value === day.date ? null : day.date),
            })
          })),
        el(MonthTimeline, { months, count: weeks }),
        el(ActivityLegend, { state: annualState }),
        detail !== null ? el('div', { className: 'dsh-signal-day-detail', 'data-dsh-signal-day-detail': detail.date, 'aria-live': 'polite' },
          el('div', { className: 'dsh-signal-day-detail-head' },
            el('strong', null, detail.date),
            el('span', null, pinnedDate === detail.date ? '已固定 · 再点一次取消' : hoveredDate === detail.date ? '实时预览' : '最近活跃日')),
          el('div', { className: 'dsh-signal-day-detail-metrics' },
            el('span', null, 'Token', el('strong', null, exactTokens(detail.totals.total))),
            el('span', null, '请求', el('strong', null, exactTokens(detail.requests))),
            el('span', null, '模型', el('strong', null, exactTokens(detail.models.length)))),
          el('div', { className: 'dsh-signal-day-detail-split', 'aria-label': '输入输出缓存占比' },
            [['输入', detail.totals.input, detail.inputShare], ['输出', detail.totals.output, detail.outputShare], ['缓存', detail.cache, detail.cacheShare]].map(([label, value, share]) =>
              el('span', { key: label }, el('i', { style: { '--dsh-signal-split': `${share}%` } }), el('b', null, `${label} ${share}%`), el('small', null, `${exactTokens(value)} Token`)))),
          el('div', { className: 'dsh-signal-day-models' },
            el('span', null, '使用模型'),
            el('strong', { title: detail.models.join('、') }, detail.models.length > 0 ? detail.models.join('、') : '当日无模型请求'))) : null,
        activeDays.length > 0 ? el('ul', { className: 'dsh-signal-sr-only', 'aria-label': '有用量日期' },
          activeDays.map(day => el('li', { key: day.date }, `${day.date}：${exactTokens(day.total)} Token，${exactTokens(day.requests)} 次请求`))) : null)
    }

    function WeeklyActivity({ state }) {
      const heatmap = useMemo(() => buildHeatmap(state), [state])
      const weeks = useMemo(() => Array.from({ length: heatmap.weeks }, (_, index) => {
        const days = heatmap.cells.slice(index * 7, index * 7 + 7).filter(Boolean)
        const total = days.reduce((sum, day) => sum + (Number(day.total) || 0), 0)
        const requests = days.reduce((sum, day) => sum + (Number(day.requests) || 0), 0)
        const recorded = days.some(day => day.recorded)
        return { index, days, total, requests, recorded }
      }), [heatmap])
      const maximum = Math.max(0, ...weeks.filter(week => week.recorded).map(week => week.total))
      const activeWeeks = weeks.filter(week => week.recorded && week.total > 0)
      const sparse = activeWeeks.length <= 1
      const summary = state.coverageStart
        ? `每周 Token 用量，记录始于 ${state.coverageStart}，总计 ${exactTokens(state.totals?.total)} Token`
        : '每周 Token 用量，暂无可汇总记录'
      return el('div', { className: 'dsh-signal-activity-view', 'data-activity-mode': 'weekly' },
        sparse
          ? el('div', { className: 'dsh-signal-weekly-sparse', role: 'img', 'aria-label': summary },
            el('strong', null, activeWeeks.length === 1 ? '每周累计起点' : '等待更多周数据'),
            el('span', null, activeWeeks.length === 1
              ? `${activeWeeks[0].days[0]?.date ?? '—'} 至 ${activeWeeks[0].days.at(-1)?.date ?? '—'} · ${exactTokens(activeWeeks[0].total)} Token · ${exactTokens(activeWeeks[0].requests)} 次请求`
              : '记录第二个完整周后，这里会显示周间变化。'),
            activeWeeks.length === 1 ? el('span', { className: 'dsh-signal-weekly-sparse-meter', 'aria-hidden': 'true' }, el('i')) : null)
          : el('div', { className: 'dsh-signal-weekly-chart', style: { '--dsh-signal-weeks': weeks.length }, role: 'img', 'aria-label': summary },
            weeks.map((week, index) => {
              const ratio = maximum > 0 ? Math.sqrt(week.total / maximum) : 0
              const start = week.days[0]?.date ?? '—'
              const end = week.days.at(-1)?.date ?? '—'
              const label = week.recorded
                ? `${start} 至 ${end}：${exactTokens(week.total)} Token，${exactTokens(week.requests)} 次请求`
                : `${start} 至 ${end}：未记录`
              return el('span', {
                key: `week-${index}`,
                className: `dsh-signal-week-bar${week.recorded ? '' : ' unrecorded'}`,
                style: {
                  '--dsh-signal-bar-height': `${ratio * 100}%`,
                  '--dsh-signal-cell-delay': `${Math.min(260, index * 8)}ms`,
                  ...(week.recorded ? { opacity: .22 + ratio * .72 } : {}),
                },
                title: label,
                'aria-hidden': 'true',
              })
            })),
        el(MonthTimeline, { months: heatmap.months, count: heatmap.weeks, className: 'dsh-signal-weekly-months' }),
        el(ActivityLegend, { state }),
        activeWeeks.length > 0 ? el('ul', { className: 'dsh-signal-sr-only', 'aria-label': '有用量周' }, activeWeeks.map(week => {
          const start = week.days[0]?.date ?? '—'
          const end = week.days.at(-1)?.date ?? '—'
          return el('li', { key: `active-week-${week.index}` }, `${start} 至 ${end}：${exactTokens(week.total)} Token，${exactTokens(week.requests)} 次请求`)
        })) : null)
    }

    function buildMonthly(state) {
      const end = dateFromKey(state?.rangeEnd) ?? new Date()
      const start = dateFromKey(state?.rangeStart) ?? new Date(end.getFullYear(), end.getMonth(), end.getDate() - 364, 12)
      const coverageDate = dateFromKey(state?.coverageStart)
      const totals = new Map()
      for (const day of Array.isArray(state?.daily) ? state.daily : []) {
        const date = dateFromKey(day.date)
        if (date === null) continue
        const key = `${date.getFullYear()}-${date.getMonth()}`
        totals.set(key, (totals.get(key) ?? 0) + (Number(day.total) || 0))
      }
      const months = []
      let cumulative = 0
      for (const cursor = new Date(start.getFullYear(), start.getMonth(), 1, 12); cursor <= end; cursor.setMonth(cursor.getMonth() + 1)) {
        const key = `${cursor.getFullYear()}-${cursor.getMonth()}`
        const monthEnd = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0, 12)
        const recorded = coverageDate !== null && monthEnd >= coverageDate
        const total = recorded ? totals.get(key) ?? 0 : null
        if (recorded) cumulative += total
        months.push({ key, year: cursor.getFullYear(), label: `${cursor.getMonth() + 1}月`, total, cumulative: recorded ? cumulative : null, recorded })
      }
      return months
    }

    function CumulativeActivity({ state }) {
      const months = useMemo(() => buildMonthly(state), [state])
      const maximum = Math.max(0, ...months.filter(month => month.recorded).map(month => Number(month.cumulative) || 0))
      const baseline = 112
      const points = months.map((month, index) => {
        const x = months.length <= 1 ? 500 : (index / (months.length - 1)) * 1000
        const y = month.recorded && maximum > 0 ? baseline - (month.cumulative / maximum) * 94 : baseline
        return { ...month, x, y }
      })
      const recordedPoints = points.filter(point => point.recorded)
      const line = recordedPoints.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(' ')
      const area = recordedPoints.length < 2 ? '' : `M ${recordedPoints[0].x.toFixed(2)} ${baseline} ${line.replace(/^M/, 'L')} L ${recordedPoints.at(-1).x.toFixed(2)} ${baseline} Z`
      const endpoint = recordedPoints.at(-1) ?? null
      const sparse = recordedPoints.length === 1
      const summary = state.coverageStart
        ? sparse
          ? `累计 Token 当前只有 1 个有记录月份，记录始于 ${state.coverageStart}，累计 ${exactTokens(endpoint?.cumulative)} Token`
          : `累计 Token 趋势，记录始于 ${state.coverageStart}，当前累计 ${exactTokens(endpoint?.cumulative)} Token`
        : '累计 Token 趋势，暂无可汇总记录'
      return el('div', { className: 'dsh-signal-activity-view', 'data-activity-mode': 'cumulative' },
        el('div', { className: 'dsh-signal-cumulative-chart', role: 'img', 'aria-label': summary },
          el('svg', { viewBox: '0 0 1000 126', preserveAspectRatio: 'none', 'aria-hidden': 'true' },
            el('line', { className: 'dsh-signal-cumulative-axis', x1: 0, y1: baseline, x2: 1000, y2: baseline }),
            el('path', { className: 'dsh-signal-cumulative-area', d: area }),
            el('path', { className: 'dsh-signal-cumulative-line', d: line }),
            sparse && endpoint !== null ? el('line', {
              className: 'dsh-signal-cumulative-guide',
              x1: endpoint.x,
              y1: endpoint.y,
              x2: endpoint.x,
              y2: baseline,
            }) : null,
            endpoint !== null ? el('circle', { className: 'dsh-signal-cumulative-point', cx: endpoint.x, cy: endpoint.y, r: 3.5 }) : null),
          sparse ? el('div', { className: 'dsh-signal-cumulative-sparse', 'aria-hidden': 'true' },
            el('strong', null, '累计起点'),
            el('span', null, '仅 1 个有记录月份，更多月份后形成趋势。')) : null,
          endpoint !== null ? el('span', {
            className: 'dsh-signal-cumulative-end',
            style: { left: `${(endpoint.x / 1000) * 100}%`, top: `${(endpoint.y / 126) * 100}%` },
            title: `${exactTokens(endpoint.cumulative)} Token`,
            'aria-hidden': 'true',
          }, `${tokenLabel(endpoint.cumulative)} Token`) : null,
          el('div', { className: 'dsh-signal-cumulative-months', style: { '--dsh-signal-months': months.length } },
            months.map((month, index) => el('span', {
              key: month.key,
              className: month.recorded ? '' : 'unrecorded',
              title: month.recorded ? `${month.year}年${month.label}累计 ${exactTokens(month.cumulative)} Token` : `${month.year}年${month.label}：未记录`,
              'aria-hidden': 'true',
            }, index === 0 || index === months.length - 1 ? `${String(month.year).slice(-2)}年${month.label}` : month.label)))))
    }

    function ActivityView({ state, calendarState, mode }) {
      if (mode === 'weekly') return el(WeeklyActivity, { key: mode, state })
      if (mode === 'cumulative') return el(CumulativeActivity, { key: mode, state })
      return el(DailyActivity, { key: 'daily', state, calendarState })
    }

    function ActivityTabs({ value, onChange }) {
      const options = [['daily', '每日'], ['weekly', '每周'], ['cumulative', '累计']]
      return el('div', { className: 'dsh-signal-activity-tabs', role: 'tablist', 'aria-label': 'Token 活动聚合方式' },
        options.map(([id, label], index) => el('button', {
          key: id,
          type: 'button',
          role: 'tab',
          className: `dsh-signal-activity-tab${value === id ? ' active' : ''}`,
          'data-dsh-signal-activity-tab': id,
          'aria-selected': value === id,
          tabIndex: value === id ? 0 : -1,
          onClick: () => onChange(id),
          onKeyDown: event => {
            let next = index
            if (event.key === 'ArrowRight') next = (index + 1) % options.length
            else if (event.key === 'ArrowLeft') next = (index - 1 + options.length) % options.length
            else if (event.key === 'Home') next = 0
            else if (event.key === 'End') next = options.length - 1
            else return
            event.preventDefault()
            const nextId = options[next][0]
            onChange(nextId)
            event.currentTarget.parentElement?.querySelector(`[data-dsh-signal-activity-tab="${nextId}"]`)?.focus()
          },
        }, label)))
    }

    function AnalyticsSectionHead({ title, meta, actions }) {
      return el('div', { className: 'dsh-signal-section-head' },
        el('h3', null, title),
        meta ? el('span', { className: 'dsh-signal-section-meta' }, meta) : null,
        actions ?? null)
    }

    function breakdownIdentity(rowId, kind, overrides = providerOverrides.getSnapshot()) {
      const raw = String(rowId ?? '').trim()
      const separator = raw.indexOf('/')
      const providerId = kind === 'provider' ? raw : separator >= 0 ? raw.slice(0, separator) : raw
      const modelId = kind === 'model' && separator >= 0 ? raw.slice(separator + 1) : ''
      const source = providerSource(providerId)
      const identity = providerIdentity(providerId, providerId, source, overrides)
      const account = `${identity.brand} · ${identity.plan}`
      return {
        providerId,
        label: modelId ? `${account} / ${modelId}` : account,
      }
    }

    function rankingMeta(rows) {
      const total = Array.isArray(rows) ? rows.length : 0
      return total > 6 ? `前 6 项 · 共 ${exactTokens(total)} 项` : `${exactTokens(total)} 项`
    }

    function BreakdownList({ rows, kind }) {
      const overrides = useSyncExternalStore(fn => providerOverrides.subscribe(fn), () => providerOverrides.getSnapshot())
      if (!Array.isArray(rows) || rows.length === 0) return el('div', { className: 'dsh-signal-empty' }, '尚无可汇总的用量记录。')
      return el('div', { className: 'dsh-signal-breakdown-list' }, rows.slice(0, 6).map(row => {
        const identity = breakdownIdentity(row.id, kind, overrides)
        return el('div', { key: row.id, className: 'dsh-signal-breakdown-row' },
          el(ProviderMark, { providerId: identity.providerId, source: providerSource(identity.providerId), size: 22 }),
          el('span', { className: 'dsh-signal-breakdown-name', title: `原始标识：${row.id}` }, identity.label),
          el('span', { className: 'dsh-signal-breakdown-value', title: `${exactTokens(row.total)} Token · ${exactTokens(row.requests)} 次请求` }, tokenLabel(row.total)))
      }))
    }

    function DataFreshness({ state, nowTime }) {
      const value = analyticsFreshness(state, nowTime)
      return el('div', { className: `dsh-signal-data-state ${value.kind}`, role: 'status', 'data-dsh-signal-data-state': value.kind },
        el('span', { className: 'dsh-signal-data-state-dot', 'aria-hidden': 'true' }),
        el('div', null, el('strong', null, value.title), el('span', null, value.detail)))
    }

    function AnalyticsFilters({ state, rangeDays, providerFilter, modelFilter, onRange, onProvider, onModel, overrides }) {
      const options = useMemo(() => analyticsFilterOptions(state, providerFilter), [state, providerFilter])
      const providerLabel = id => {
        const identity = providerIdentity(id, id, providerSource(id), overrides)
        return `${identity.brand} · ${identity.plan}`
      }
      const modelLabel = id => {
        const separator = id.indexOf('/')
        const providerId = separator >= 0 ? id.slice(0, separator) : id
        const modelId = separator >= 0 ? id.slice(separator + 1) : 'unknown'
        return `${providerIdentity(providerId, providerId, providerSource(providerId), overrides).brand} / ${modelId}`
      }
      return el('div', { className: 'dsh-signal-filters', 'data-dsh-signal-filters': '' },
        el('div', { className: 'dsh-signal-range-filter', role: 'group', 'aria-label': '统计时间范围' },
          [[7, '7 天'], [30, '30 天'], [90, '90 天'], [365, '1 年']].map(([days, label]) => el('button', {
            key: days,
            type: 'button',
            className: rangeDays === days ? 'active' : '',
            'aria-pressed': rangeDays === days,
            onClick: () => onRange(days),
          }, label))),
        el('label', { className: 'dsh-signal-filter-select' },
          el('span', null, '提供方'),
          el('select', { value: providerFilter, onChange: event => onProvider(event.target.value) },
            el('option', { value: 'all' }, '全部提供方'),
            options.providers.map(id => el('option', { key: id, value: id }, providerLabel(id))))),
        el('label', { className: 'dsh-signal-filter-select' },
          el('span', null, '模型'),
          el('select', { value: modelFilter, onChange: event => onModel(event.target.value) },
            el('option', { value: 'all' }, '全部模型'),
            options.models.map(id => el('option', { key: id, value: id }, modelLabel(id))))),
        providerFilter !== 'all' || modelFilter !== 'all' ? el('button', {
          type: 'button',
          className: 'dsh-signal-filter-clear',
          onClick: () => { onProvider('all'); onModel('all') },
        }, '清除筛选') : null)
    }

    function ProviderBrandEditor({ state }) {
      const overrides = useSyncExternalStore(fn => providerOverrides.subscribe(fn), () => providerOverrides.getSnapshot())
      const observed = useMemo(() => [...new Set([
        ...Object.keys(overrides),
        ...(Array.isArray(state?.records) ? state.records.map(record => String(record.provider ?? '').trim().toLowerCase()) : []),
        ...(Array.isArray(state?.providers) ? state.providers.map(row => String(row.id ?? '').trim().toLowerCase()) : []),
      ].filter(Boolean))].sort(), [state, overrides])
      const [providerId, setProviderId] = useState('')
      const [draft, setDraft] = useState({ brand: '', plan: '', icon: 'custom' })
      const [feedback, setFeedback] = useState('')
      const listId = useId()
      useEffect(() => {
        if (providerId.length === 0 && observed.length > 0) setProviderId(observed[0])
      }, [providerId, observed.join('|')])
      useEffect(() => {
        const id = providerId.trim().toLowerCase()
        const current = overrides[id]
        setDraft(current ?? { brand: '', plan: '', icon: providerIconId(id, providerSource(id), {}) })
      }, [providerId, overrides])
      const id = providerId.trim().toLowerCase()
      const base = providerIdentity(id, id || '自定义 Provider', providerSource(id), {})
      const hasOverride = overrides[id] !== undefined
      const iconLabels = {
        custom: '通用几何标志', deepseek: 'DeepSeek 鲸鱼', openai: 'OpenAI', anthropic: 'Anthropic', google: 'Google',
        alibaba: 'Qwen', zhipuai: '智谱', kimi: 'Kimi', opencode: 'OpenCode', mistral: 'Mistral', openrouter: 'OpenRouter', siliconflow: 'SiliconFlow', groq: 'GroqCloud',
      }
      return el('details', { className: 'dsh-signal-analytics-section dsh-signal-brand-editor', 'data-dsh-signal-brand-editor': '', 'aria-label': '显示身份（本地品牌映射）' },
        el('summary', { className: 'dsh-signal-brand-editor-summary' },
          el('span', { className: 'dsh-signal-brand-editor-summary-copy' },
            el('strong', null, '显示身份'),
            el('span', null, '本地品牌映射 · 仅保存在本机 · 不生成或猜测额度')),
          el('svg', { viewBox: '0 0 12 12', fill: 'none', stroke: 'currentColor', strokeWidth: '1.25', strokeLinecap: 'round', 'aria-hidden': 'true' },
            el('path', { d: 'm2.5 4.5 3.5 3 3.5-3' }))),
        el('div', { className: 'dsh-signal-brand-editor-card' },
          el('div', { className: 'dsh-signal-brand-preview' },
            el(ProviderMark, { providerId: id, source: providerSource(id), size: 30, iconOverride: draft.icon }),
            el('div', null,
              el('strong', null, draft.brand || base.brand),
              el('span', null, draft.plan || base.plan))),
          el('div', { className: 'dsh-signal-brand-form' },
            el('label', null, el('span', null, 'Provider ID'), el('input', {
              value: providerId,
              list: listId,
              placeholder: '例如 my-provider',
              onChange: event => setProviderId(event.target.value),
            }), el('datalist', { id: listId }, observed.map(value => el('option', { key: value, value })))),
            el('label', null, el('span', null, '品牌名'), el('input', {
              value: draft.brand,
              placeholder: base.brand,
              maxLength: 48,
              onChange: event => setDraft(value => ({ ...value, brand: event.target.value })),
            })),
            el('label', null, el('span', null, '订阅名'), el('input', {
              value: draft.plan,
              placeholder: base.plan,
              maxLength: 64,
              onChange: event => setDraft(value => ({ ...value, plan: event.target.value })),
            })),
            el('label', null, el('span', null, '无底 Logo'), el('select', {
              value: draft.icon,
              onChange: event => setDraft(value => ({ ...value, icon: event.target.value })),
            }, PROVIDER_ICON_IDS.map(value => el('option', { key: value, value }, iconLabels[value]))))),
          el('div', { className: 'dsh-signal-brand-actions' },
            el('span', { role: 'status', 'aria-live': 'polite' }, feedback || (id ? `原始标识：${id}` : '输入 Provider ID 后保存')),
            hasOverride ? el('button', { type: 'button', onClick: () => setFeedback(removeProviderOverride(id) ? '已恢复默认显示' : '本机存储不可用，未能恢复默认') }, '恢复默认') : null,
            el('button', {
              type: 'button',
              className: 'primary',
              disabled: id.length === 0,
              onClick: () => setFeedback(saveProviderOverride(id, draft) ? '已保存本地映射' : '本机存储不可用，未保存；请重试'),
            }, '保存本地映射'))))
    }

    
