    const WORK_TOOL_DESCRIPTORS = [
      { pattern: /image|screenshot|pdf|document|slides?|sheet|render/i, title: '正在处理素材', detail: '模型正在处理图片、文档或其他视觉素材。', label: '处理图片 / 文档' },
      { pattern: /browser|web|fetch|http|url/i, title: '正在查看网页', detail: '模型正在访问网页或接口，核对外部信息。', label: '浏览 / 验证网页' },
      { pattern: /write|edit|patch|replace|move|rename|delete/i, title: '正在修改内容', detail: '模型正在更新文件，稍后会检查改动结果。', label: '修改文件' },
      { pattern: /bash|shell|pwsh|terminal|command|exec|run/i, title: '正在运行命令', detail: '模型正在执行命令，获取可验证的结果。', label: '运行命令' },
      { pattern: /read|cat|open|view|file|glob|grep|list|search/i, title: '正在查找资料', detail: '模型正在读取或搜索文件，整理任务所需的信息。', label: '读取 / 搜索文件' },
    ]

    function workToolDescriptor(name) {
      return WORK_TOOL_DESCRIPTORS.find(item => item.pattern.test(String(name ?? ''))) ?? {
        title: '正在调用工具', detail: '模型正在使用辅助工具处理当前任务。', label: '辅助工具',
      }
    }

    function sessionExplanation(snapshot) {
      const running = snapshot?.running === true
      const calls = Array.isArray(snapshot?.runningCalls) ? snapshot.runningCalls : []
      let latest = null
      const order = Array.isArray(snapshot?.chat?.order) ? snapshot.chat.order : []
      const nodes = snapshot?.chat?.nodes
      if (order.length > 0 && nodes && typeof nodes.get === 'function') latest = nodes.get(order[order.length - 1])
      const kind = String(latest?.kind ?? latest?.type ?? '').toLowerCase()
      if (snapshot?.lastAgentError || kind.includes('error')) return { phase: 'error', title: '这一步需要你的注意', detail: '模型遇到异常，建议查看会话中的错误提示。', step: 2, toolLabel: '' }
      if (running && calls.length > 0) {
        const descriptor = workToolDescriptor(calls.at(-1)?.name)
        return { phase: 'action', title: descriptor.title, detail: descriptor.detail, step: 1, toolLabel: descriptor.label }
      }
      if (running) return { phase: 'thinking', title: '正在组织答案', detail: '模型正在理解你的目标并逐步整理结果。', step: 0, toolLabel: '' }
      if (kind.includes('tool-result') || kind === 'command' || kind.includes('tool')) return { phase: 'checking', title: '正在检查结果', detail: '动作已经完成，模型正在核对并整理可读结论。', step: 2, toolLabel: '刚完成一项动作' }
      if (kind.includes('assistant') || kind.includes('message')) return { phase: 'done', title: '这一轮已经完成', detail: '你可以继续追问，或打开下方会话内容查看细节。', step: 2, toolLabel: '' }
      return { phase: 'waiting', title: '等待你的输入', detail: '发送任务后，这里会用简单语言解释每一步。', step: 0, toolLabel: '' }
    }

    function explainerElapsed(snapshot) {
      const started = Number(snapshot?.startedAt ?? snapshot?.started ?? snapshot?.createdAt)
      const updated = Number(snapshot?.updatedAt ?? snapshot?.finishedAt ?? Date.now())
      if (!Number.isFinite(started) || started <= 0 || !Number.isFinite(updated) || updated < started) return '—'
      const seconds = Math.max(0, Math.round((updated - started) / 1000))
      if (seconds < 60) return `${seconds} 秒`
      return `${Math.floor(seconds / 60)} 分 ${seconds % 60} 秒`
    }

    function WorkExplainer({ useSession, directory }) {
      const snapshot = typeof useSession === 'function' ? useSession(value => value) : null
      const directorySubscribe = useMemo(() => listener => directory?.subscribe?.(listener) ?? (() => {}), [directory])
      const directorySnapshot = useMemo(() => () => directory?.getSnapshot?.() ?? null, [directory])
      const models = useSyncExternalStore(directorySubscribe, directorySnapshot, directorySnapshot)
      const explanation = sessionExplanation(snapshot)
      const [open, setOpen] = useState(false)
      const [panelPlacement, setPanelPlacement] = useState(null)
      const buttonRef = useRef(null)
      const layoutRestoreRef = useRef(null)
      const panelId = useId()
      useEffect(() => {
        void directory?.load?.().catch(() => {})
      }, [directory])
      useEffect(() => {
        if (!open) return undefined
        const release = claimSignalOverlay('explainer', () => setOpen(false))
        const onKey = event => {
          if (event.key === 'Escape') {
            if (document.body.classList.contains('dsh-signal-settings-open')) return
            setOpen(false)
            buttonRef.current?.focus()
          }
        }
        document.addEventListener('keydown', onKey)
        return () => {
          release()
          document.removeEventListener('keydown', onKey)
        }
      }, [open])
      const modelGroup = models?.current === null || models?.current === undefined
        ? undefined
        : models.groups?.find(value => value.id === models.current.provider)
      const currentModel = models?.current === null || models?.current === undefined
        ? undefined
        : modelGroup?.models?.find(value => value.id === models.current.model)
      const modelName = currentModel?.name ?? models?.current?.model ?? '当前模型'
      useLayoutEffect(() => {
        if (!open) {
          const restore = layoutRestoreRef.current
          if (restore) {
            restore.target.style.width = restore.width
            restore.target.style.paddingRight = restore.paddingRight
            restore.target.style.boxSizing = restore.boxSizing
            delete restore.target.dataset.dshSignalExplainerReserved
            layoutRestoreRef.current = null
          }
          setPanelPlacement(null)
          return undefined
        }
        const reserve = 344
        const minReadableConversationWidth = 460
        const findConversationColumn = () => {
          let node = buttonRef.current?.parentElement
          let candidate = null
          while (node && node !== document.body) {
            const rect = node.getBoundingClientRect()
            const style = getComputedStyle(node)
            if (rect.width >= 500 && rect.height >= window.innerHeight * .7 && style.overflow === 'hidden') candidate = node
            node = node.parentElement
          }
          return candidate
        }
        const findConversationScroll = column => {
          const preferred = column?.querySelector('[data-conversation-scroll]')
          if (preferred) return preferred
          const candidates = [...(column?.querySelectorAll('*') ?? [])].filter(node => {
            const style = getComputedStyle(node)
            return (style.overflowY === 'auto' || style.overflowY === 'scroll') && node.clientHeight > 300
          })
          return candidates.sort((left, right) => right.clientHeight - left.clientHeight)[0] ?? null
        }
        const restoreReservedColumn = () => {
          const restore = layoutRestoreRef.current
          if (!restore) return
          restore.target.style.width = restore.width
          restore.target.style.paddingRight = restore.paddingRight
          restore.target.style.boxSizing = restore.boxSizing
          if (restore.scrollTarget) {
            restore.scrollTarget.style.paddingRight = restore.scrollPaddingRight
            restore.scrollTarget.style.boxSizing = restore.scrollBoxSizing
          }
          delete restore.target.dataset.dshSignalExplainerReserved
          layoutRestoreRef.current = null
        }
        const updatePlacement = () => {
          const trigger = buttonRef.current
          if (!trigger) return
          const triggerRect = trigger.getBoundingClientRect()
          let reservation = layoutRestoreRef.current
          const column = reservation?.target ?? findConversationColumn()
          const scrollTarget = reservation?.scrollTarget ?? findConversationScroll(column)
          const sidebarWidth = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dsh-sidebar-width')) || 0
          const availableWidth = scrollTarget?.clientWidth ?? column?.clientWidth ?? 0
          const shouldReserve = column !== null && availableWidth - reserve >= minReadableConversationWidth
          if (reservation && reservation.reserved !== shouldReserve) {
            restoreReservedColumn()
            reservation = null
          }
          if (column && !layoutRestoreRef.current) {
            layoutRestoreRef.current = {
              target: column,
              scrollTarget,
              reserved: shouldReserve,
              width: column.style.width,
              paddingRight: column.style.paddingRight,
              boxSizing: column.style.boxSizing,
              scrollPaddingRight: scrollTarget?.style.paddingRight ?? '',
              scrollBoxSizing: scrollTarget?.style.boxSizing ?? '',
            }
            if (shouldReserve && scrollTarget) {
              scrollTarget.style.boxSizing = 'border-box'
              scrollTarget.style.paddingRight = `${reserve}px`
            } else if (shouldReserve) {
              column.style.boxSizing = 'border-box'
              column.style.paddingRight = `${reserve}px`
            }
            column.dataset.dshSignalExplainerReserved = shouldReserve ? 'true' : 'overlay'
            window.requestAnimationFrame(updatePlacement)
            return
          }
          const boundary = Math.min(
            window.innerWidth - sidebarWidth - 12,
            column?.getBoundingClientRect().right || triggerRect.right,
          )
          const right = Math.max(12, window.innerWidth - boundary)
          const top = Math.max(12, Math.min(triggerRect.bottom + 10, window.innerHeight - 340))
          setPanelPlacement({ top: `${top}px`, right: `${right}px` })
        }
        const initialColumn = findConversationColumn()
        const resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(updatePlacement) : null
        if (initialColumn) resizeObserver?.observe(initialColumn)
        const layoutScope = initialColumn ?? buttonRef.current?.closest('[data-slot="conversation"]') ?? document.body
        const layoutObserver = typeof MutationObserver === 'function' ? new MutationObserver(records => {
          if (records.some(record => record.type === 'childList' || record.attributeName === 'class' || record.attributeName === 'style')) updatePlacement()
        }) : null
        layoutObserver?.observe(layoutScope, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] })
        updatePlacement()
        window.addEventListener('resize', updatePlacement)
        window.addEventListener('scroll', updatePlacement, true)
        return () => {
          window.removeEventListener('resize', updatePlacement)
          window.removeEventListener('scroll', updatePlacement, true)
          resizeObserver?.disconnect()
          layoutObserver?.disconnect()
          restoreReservedColumn()
        }
      }, [open])
      const phaseLabels = { waiting: '等待输入', thinking: '理解中', action: '执行中', checking: '核对中', done: '已完成', error: '需注意' }
      const nextLabels = {
        waiting: '输入任务后，模型会先理解目标，再开始执行。',
        thinking: '模型正在整理上下文；你可以继续观察，不必等待固定动画。',
        action: '模型正在调用工具或服务，完成后会自动进入检查阶段。',
        checking: '模型正在核对结果，随后会把结论整理成可读内容。',
        done: '这一轮已完成；你可以继续追问或打开会话日志查看细节。',
        error: '请先查看会话中的错误提示，再决定是否重试。',
      }
      const calls = Array.isArray(snapshot?.runningCalls) ? snapshot.runningCalls.length : 0
      const currentStep = explanation.phase === 'done' ? 4 : explanation.phase === 'checking' ? 3 : explanation.phase === 'action' ? 2 : explanation.phase === 'thinking' ? 1 : explanation.phase === 'error' ? 3 : 0
      const steps = ['理解你的目标', '规划路径', '执行必要动作', '检查并整理']
      const stepDescriptions = [
        '读取任务、会话背景与资源范围。',
        '把目标拆成可以验证的行动顺序。',
        '调用必要工具，并实时反馈进度。',
        '核对结果、整理风险，再给出结论。',
      ]
      const panelStyle = panelPlacement ? { '--dsh-signal-panel-top': panelPlacement.top, '--dsh-signal-panel-right': panelPlacement.right } : undefined
      return el('div', { className: 'dsh-signal-explainer' },
        el('button', {
          ref: buttonRef,
          type: 'button',
          className: 'dsh-signal-explainer-trigger',
          'aria-label': '模型工作说明',
          'aria-expanded': open,
          'aria-controls': panelId,
          'aria-haspopup': 'dialog',
          onClick: () => setOpen(value => !value),
        }, el('svg', { viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: '1.45', strokeLinecap: 'round', 'aria-hidden': 'true' },
          el('path', { d: 'M3 4.5h10M3 8h10M3 11.5h6' }))),
        open ? el('div', { id: panelId, className: 'dsh-signal-explainer-panel', role: 'dialog', 'aria-label': '模型工作说明', style: panelStyle },
          el('div', { className: 'dsh-signal-explainer-head' },
            el('div', null, el('strong', null, '模型工作说明'), el('span', null, '把当前会话翻译成易懂步骤')),
            el('button', { type: 'button', className: 'dsh-signal-explainer-close', 'aria-label': '关闭说明', onClick: () => { setOpen(false); buttonRef.current?.focus() } },
              el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', 'aria-hidden': 'true' }, el('path', { d: 'm7 7 10 10M17 7 7 17' })))),
          el('div', { className: 'dsh-signal-explainer-current' },
            el('span', { className: `dsh-signal-explainer-dot ${explanation.phase === 'done' ? 'done' : explanation.phase === 'error' ? 'error' : ''}` }),
            el('div', null, el('strong', null, explanation.title), el('span', null, explanation.detail), explanation.toolLabel ? el('small', { className: 'dsh-signal-explainer-tool' }, `动作类别：${explanation.toolLabel}`) : null)),
          el('div', { className: 'dsh-signal-explainer-steps' }, steps.map((label, index) => {
            const done = explanation.phase === 'done' || currentStep > index
            const active = !done && currentStep === index
            return el('div', { key: label, className: `dsh-signal-explainer-step${active ? ' active' : ''}${done ? ' done' : ''}` },
              el('span', { className: 'dsh-signal-explainer-step-mark' }, done ? '✓' : String(index + 1)),
              el('div', { className: 'dsh-signal-explainer-step-copy' }, el('span', null, label), el('small', null, stepDescriptions[index])))
          })),
          el('div', { className: 'dsh-signal-explainer-meta', 'aria-label': '会话摘要' },
            [['状态', phaseLabels[explanation.phase] ?? '进行中'], ['工具动作', `${calls} 次`], ['已用时', explainerElapsed(snapshot)]].map(([label, value]) =>
              el('div', { key: label, className: 'dsh-signal-explainer-meta-item' }, el('span', null, label), el('strong', null, value)))),
          el('div', { className: 'dsh-signal-explainer-next' }, el('strong', null, '接下来'), nextLabels[explanation.phase] ?? '模型会继续处理当前会话。'),
          el('div', { className: 'dsh-signal-explainer-foot' }, `当前模型：${modelName}`)) : null)
    }
