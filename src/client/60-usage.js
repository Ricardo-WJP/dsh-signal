    function SignalUsageSettings({ analytics, api }) {
      const snapshot = useSyncExternalStore(fn => analytics.subscribe(fn), () => analytics.getSnapshot())
      const overrides = useSyncExternalStore(fn => providerOverrides.subscribe(fn), () => providerOverrides.getSnapshot())
      const [activityMode, setActivityMode] = useState('daily')
      const [rangeDays, setRangeDays] = useState(30)
      const [providerFilter, setProviderFilter] = useState('all')
      const [modelFilter, setModelFilter] = useState('all')
      const nowTime = useMinuteClock(true)
      const pageRef = useRef(null)
      useEffect(() => {
        void api.ensureAnalytics?.()
      }, [api])
      useLayoutEffect(() => {
        const root = pageRef.current
        const dialog = root?.closest('[role="dialog"]')
        const resetScroll = () => {
          let node = root?.parentElement
          while (node && node !== dialog?.parentElement && node !== document.body) {
            if (node.scrollHeight > node.clientHeight) node.scrollTop = 0
            node = node.parentElement
          }
        }
        resetScroll()
        const frame = window.requestAnimationFrame(() => window.requestAnimationFrame(resetScroll))
        const timer = window.setTimeout(resetScroll, 120)
        return () => {
          window.cancelAnimationFrame(frame)
          window.clearTimeout(timer)
        }
      }, [])
      const sourceState = snapshot.state
      const availableFilters = useMemo(() => analyticsFilterOptions(sourceState, providerFilter), [sourceState, providerFilter])
      useEffect(() => {
        if (providerFilter !== 'all' && !availableFilters.providers.includes(providerFilter)) {
          setProviderFilter('all')
          setModelFilter('all')
        }
      }, [providerFilter, availableFilters.providers.join('|')])
      useEffect(() => {
        if (modelFilter !== 'all' && !availableFilters.models.includes(modelFilter)) setModelFilter('all')
      }, [modelFilter, availableFilters.models.join('|')])
      const state = useMemo(() => sourceState === null ? null : filterAnalyticsState(sourceState, rangeDays, providerFilter, modelFilter), [sourceState, rangeDays, providerFilter, modelFilter])
      const calendarState = useMemo(() => sourceState === null ? null : filterAnalyticsState(sourceState, 365, providerFilter, modelFilter), [sourceState, providerFilter, modelFilter])
      const ready = state !== null && (sourceState?.status === 'ok' || Number(sourceState?.lastSuccessfulAt) > 0)
      const totals = state?.totals ?? {}
      const cacheTotal = (Number(totals.cacheRead) || 0) + (Number(totals.cacheWrite) || 0)
      const inputPool = (Number(totals.input) || 0) + cacheTotal
      const cacheHit = inputPool > 0 ? `${Math.round(((Number(totals.cacheRead) || 0) / inputPool) * 100)}%` : '—'
      const average = Number(state?.requestCount) > 0 ? (Number(totals.total) || 0) / Number(state.requestCount) : 0
      const kpis = [
        { label: '总 Token', value: totals.total, description: '输入、缓存读写与输出之和' },
        { label: '输入', value: totals.input, description: '未命中缓存的输入 Token' },
        { label: '输出', value: totals.output, description: '模型输出 Token' },
        { label: '缓存', value: cacheTotal, description: '缓存读取与写入 Token' },
        {
          label: '推理',
          value: totals.reasoning,
          description: state?.reasoningReported ? '提供方上报的输出子集' : '当前提供方未单独上报推理 Token',
          display: state?.reasoningReported ? undefined : '未上报',
        },
        { label: '请求', value: state?.requestCount, description: '带用量记录的模型请求', exact: true },
      ]
      const statusMessage = snapshot.error ?? (!ready && sourceState?.message ? sourceState.message : null)
      return el('section', { ref: pageRef, className: 'dsh-signal-settings', 'data-dsh-signal-settings': '' },
        el('header', { className: 'dsh-signal-settings-head' },
          el('div', { className: 'dsh-signal-settings-heading' },
            el('h2', null, '用量与统计'),
            el('p', null, '类似 Codex 的本地用量视图，数据直接聚合自 DSH 会话日志中的官方 Token 记录。')),
          el('button', {
            type: 'button',
            className: 'dsh-signal-settings-refresh',
            disabled: snapshot.refreshing,
            onClick: () => { void api.refreshAnalytics() },
          }, snapshot.refreshing ? '刷新中' : '刷新')),
        statusMessage ? el('div', { className: 'dsh-signal-analytics-error', role: 'status' }, statusMessage) : null,
        sourceState !== null ? el(DataFreshness, { state: sourceState, nowTime }) : null,
        ready ? el(AnalyticsFilters, {
          state: sourceState,
          rangeDays,
          providerFilter,
          modelFilter,
          overrides,
          onRange: setRangeDays,
          onProvider: value => { setProviderFilter(value); setModelFilter('all') },
          onModel: setModelFilter,
        }) : null,
        el('div', { className: 'dsh-signal-kpis', 'aria-label': '用量概览' },
          kpis.map(item => {
            const display = !ready ? '—' : item.display ?? (item.exact ? exactTokens(item.value) : tokenLabel(item.value))
            const exact = !ready ? '尚未读取' : item.display ?? exactTokens(item.value)
            return el('div', { key: item.label, className: 'dsh-signal-kpi', title: item.description },
              el('span', { className: 'dsh-signal-kpi-label' }, item.label),
              el('strong', { className: 'dsh-signal-kpi-value', title: exact }, display))
          })),
        ready ? el(React.Fragment, null,
          el('section', { className: 'dsh-signal-analytics-section' },
            el(AnalyticsSectionHead, {
              title: 'Token 活动',
              meta: `年度底图 · 当前 ${state.rangeStart} — ${state.rangeEnd}${state.coverageStart ? ` · 记录始于 ${state.coverageStart}` : ' · 暂无记录'}`,
              actions: el(ActivityTabs, { value: activityMode, onChange: setActivityMode }),
            }),
            el('div', { className: 'dsh-signal-heatmap-wrap' }, el(ActivityView, { state, calendarState, mode: activityMode }))),
          el('section', { className: 'dsh-signal-analytics-section' },
            el(AnalyticsSectionHead, { title: '使用洞察', meta: `更新于 ${timeLabel(state.generatedAt)}` }),
            el('div', { className: 'dsh-signal-insights' },
              [['活跃天数', `${exactTokens(state.activeDays)} 天`], ['有用量会话', exactTokens(state.sessionCount)], ['平均每次请求', `${tokenLabel(average)} Token`], ['缓存读取占比', cacheHit]].map(([label, value]) =>
                el('div', { key: label, className: 'dsh-signal-insight' }, el('span', null, label), el('strong', null, value))))),
          el('section', { className: 'dsh-signal-analytics-section dsh-signal-breakdowns' },
            el('div', null, el(AnalyticsSectionHead, { title: '提供方用量', meta: rankingMeta(state.providers) }), el(BreakdownList, { rows: state.providers, kind: 'provider' })),
            el('div', null, el(AnalyticsSectionHead, { title: '模型用量', meta: rankingMeta(state.models) }), el(BreakdownList, { rows: state.models, kind: 'model' }))),
          ) : null,
        el('p', { className: 'dsh-signal-privacy-note' },
          '仅聚合 Token 数、匿名会话序号、提供方、模型与时间；不读取或传出消息正文。推理 Token 仅在提供方单独上报时显示，且不会重复计入总 Token。',
          Number(sourceState?.skippedSessions) > 0 ? ` 本次有 ${sourceState.skippedSessions} 个损坏或不可读会话被跳过。` : ''))
    }

    
