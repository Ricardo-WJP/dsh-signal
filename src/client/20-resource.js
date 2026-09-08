    function providerSource(providerId) {
      const id = String(providerId ?? '').trim().toLowerCase()
      if (id === 'deepseek' || id.startsWith('deepseek-') || id.startsWith('deepseek/')) return 'deepseek'
      if (id === 'opencode' || id === 'opencode-go' || id.startsWith('opencode-') || id.startsWith('opencode/')) return 'opencode'
      if (id === 'openai-codex' || id === 'codex' || id.includes('chatgpt') || id.startsWith('openai-codex-')) return 'codex'
      if (id === 'openrouter' || id.startsWith('openrouter-') || id.startsWith('openrouter/')) return 'openrouter'
      if (id === 'moonshotai-cn' || id.startsWith('moonshotai-cn-') || id.startsWith('moonshotai-cn/')) return 'moonshot-cn'
      if (id === 'moonshotai' || id.startsWith('moonshotai-') || id.startsWith('moonshotai/')) return 'moonshot'
      if (id === 'siliconflow' || id === 'siliconflow-cn' || id.startsWith('siliconflow-') || id.startsWith('siliconflow/')) return 'siliconflow'
      return null
    }

    function isRetiredProvider(providerId) {
      const id = String(providerId ?? '').trim().toLowerCase()
      // Keep legacy Antigravity sessions readable without exposing a retired
      // login/quota surface. New sessions cannot select this provider.
      return id === ['anti', 'gravity'].join('') || id === 'agy'
        || id === 'grok' || id.startsWith('grok-') || id.startsWith('grok/')
        || id === 'xai' || id.startsWith('xai-') || id.startsWith('xai/')
    }

    function providerIdentity(providerId, providerName, source, overrides = providerOverrides.getSnapshot()) {
      const id = String(providerId ?? '').trim().toLowerCase()
      const catalog = [
        [/opencode/, ['OpenCode', 'Go']],
        [/deepseek/, ['DeepSeek', 'Direct API']],
        [/chatgpt|codex/, ['OpenAI', 'ChatGPT / Codex']],
        [/amazon-bedrock/, ['Amazon Web Services', 'Bedrock']],
        [/azure-openai/, ['Microsoft Azure', 'OpenAI']],
        [/cloudflare-ai-gateway/, ['Cloudflare', 'AI Gateway']],
        [/cloudflare-workers-ai/, ['Cloudflare', 'Workers AI']],
        [/github-copilot/, ['GitHub', 'Copilot']],
        [/google-vertex/, ['Google Cloud', 'Vertex AI']],
        [/kimi-coding/, ['Kimi', 'Coding Plan']],
        [/moonshotai-cn/, ['Kimi', '中国站 API']],
        [/moonshotai/, ['Kimi', '国际站 API']],
        [/qwen-token-plan-cn/, ['Qwen', 'Coding Plan 中国站']],
        [/qwen-token-plan/, ['Qwen', 'Coding Plan']],
        [/zai-coding-cn/, ['智谱', 'Coding Plan 中国站']],
        [/xiaomi-token-plan-cn/, ['Xiaomi MiMo', 'Coding Plan 中国站']],
        [/xiaomi-token-plan-ams/, ['Xiaomi MiMo', 'Coding Plan 阿姆斯特丹']],
        [/xiaomi-token-plan-sgp/, ['Xiaomi MiMo', 'Coding Plan 新加坡']],
        [/cerebras/, ['Cerebras', 'API']],
        [/fireworks/, ['Fireworks AI', 'API']],
        [/huggingface/, ['Hugging Face', 'Inference']],
        [/minimax/, ['MiniMax', 'API']],
        [/nvidia/, ['NVIDIA', 'NIM']],
        [/together/, ['Together AI', 'API']],
        [/vercel-ai-gateway/, ['Vercel', 'AI Gateway']],
        [/xiaomi/, ['Xiaomi MiMo', 'API']],
        [/openai/, ['OpenAI', 'API 套餐']],
        [/anthropic|claude/, ['Anthropic', '套餐未识别']],
        [/google|gemini/, ['Google', '套餐未识别']],
        [/alibaba|qwen/, ['Qwen', '套餐未识别']],
        [/zhipu|zai|glm/, ['智谱', '套餐未识别']],
        [/kimi|moonshot/, ['Kimi', '套餐未识别']],
        [/mistral/, ['Mistral', '套餐未识别']],
        [/openrouter/, ['OpenRouter', 'Credits']],
        [/siliconflow/, ['SiliconFlow', '钱包账户']],
        [/groq/, ['GroqCloud', '套餐未识别']],
      ]
      const match = catalog.find(([pattern]) => pattern.test(id))
      const fallback = String(providerName ?? providerId ?? '正在读取路由').trim()
      const base = match !== undefined
        ? { brand: match[1][0], plan: match[1][1] }
        : { brand: fallback || '正在读取路由', plan: source === null ? '套餐未识别' : '当前账户' }
      const override = overrides?.[id]
      return {
        brand: override?.brand || base.brand,
        plan: override?.plan || base.plan,
      }
    }

    function providerCapability(providerId) {
      const id = String(providerId ?? '').trim().toLowerCase()
      if (/^openai(?:-|$)/.test(id)) return 'OpenAI 组织成本接口需要独立 Admin Key；普通推理密钥不含余额权限。本地 Token 仍会记录在 Signal 用量。'
      if (/anthropic|claude/.test(id)) return 'Anthropic 组织用量接口需要独立 Admin Key；普通推理密钥不能读取账户额度。本地 Token 仍会记录在 Signal 用量。'
      if (/mistral/.test(id)) return 'Mistral 用量接口需要独立 Admin API Key；普通推理密钥不能读取组织账单。本地 Token 仍会记录在 Signal 用量。'
      if (/groq/.test(id)) return 'Groq 的组织额度与花费当前由控制台管理；普通推理密钥没有独立余额接口。本地 Token 仍会记录在 Signal 用量。'
      if (/google|gemini|vertex|bedrock|azure|cloudflare|qwen|zai|glm|xiaomi|minimax|cerebras|fireworks|huggingface|nvidia|together|vercel/.test(id)) return '该路由的官方资源查询不由普通推理密钥直接提供；Signal 只显示本地真实 Token，不推算余额或套餐。'
      return '此路由尚无可由当前凭据安全读取的官方额度源；Signal 只显示本地真实 Token，不根据模型名猜测余额。'
    }

    function primaryGoWindow(entry) {
      const values = [
        ['5 小时', entry?.rolling],
        ['本周', entry?.weekly],
        ['本月', entry?.monthly],
      ]
      return values.find(([, value]) => value !== null && value !== undefined && normalizedPercent(value.percent) !== null) ?? null
    }

    const codexStatusPath = '/plugins/dsh-openai-codex/auth/status'
    const FIVE_HOURS_SECONDS = 5 * 60 * 60
    const WEEK_SECONDS = 7 * 24 * 60 * 60

    function isRecord(value) {
      return value !== null && typeof value === 'object' && !Array.isArray(value)
    }

    function normalizedPercent(value) {
      if ((typeof value !== 'number' && typeof value !== 'string') || String(value).trim() === '') return null
      const number = Number(value)
      return Number.isFinite(number) && number >= 0 && number <= 100 ? number : null
    }

    function normalizedAmount(value) {
      if ((typeof value !== 'number' && typeof value !== 'string') || String(value).trim() === '') return null
      const number = Number(value)
      return Number.isFinite(number) && number >= 0 ? number : null
    }

    function normalizedFractionPercent(value) {
      if ((typeof value !== 'number' && typeof value !== 'string') || String(value).trim() === '') return null
      const number = Number(value)
      return Number.isFinite(number) && number >= 0 && number <= 1 ? number * 100 : null
    }

    function normalizedReset(value, unixSeconds = false) {
      const parsed = unixSeconds ? Number(value) * 1000 : Date.parse(String(value ?? ''))
      if (!Number.isFinite(parsed) || parsed <= 0) return ''
      const date = new Date(parsed)
      return Number.isFinite(date.getTime()) ? date.toISOString() : ''
    }

    function quotaWindowLabel(seconds) {
      if (seconds === FIVE_HOURS_SECONDS) return '5 小时'
      if (seconds === WEEK_SECONDS) return '本周'
      if (seconds > 0 && seconds % 3600 === 0) return `${seconds / 3600} 小时`
      return '当前窗口'
    }

    function normalizeCodexStatus(value, attemptedAt = Date.now()) {
      if (!isRecord(value)) throw new Error('Codex Connect 返回了无效状态')
      if (value.status !== 'signed-in') {
        return { status: 'unavailable', connected: false, message: 'Codex Connect 尚未登录 ChatGPT。', fetchedAt: 0, attemptedAt, rateLimits: [], credits: null }
      }
      const usage = isRecord(value.usage) ? value.usage : {}
      const rateLimits = Array.isArray(usage.rateLimits) ? usage.rateLimits.flatMap(limit => {
        if (!isRecord(limit) || typeof limit.id !== 'string' || !Array.isArray(limit.windows)) return []
        const windows = limit.windows.flatMap(windowValue => {
          if (!isRecord(windowValue)) return []
          const remainingPercent = normalizedPercent(windowValue.remainingPercent)
          const windowSeconds = Number(windowValue.windowSeconds)
          if (remainingPercent === null || !Number.isSafeInteger(windowSeconds) || windowSeconds <= 0) return []
          return [{
            windowSeconds,
            remainingPercent,
            resetsAt: normalizedReset(windowValue.resetAt, true),
          }]
        })
        return windows.length === 0 ? [] : [{ id: limit.id, name: typeof limit.name === 'string' ? limit.name : limit.id, windows }]
      }) : []
      const rawCredits = isRecord(usage.credits) ? usage.credits : null
      const creditBalance = normalizedAmount(rawCredits?.balance)
      const credits = rawCredits === null || (rawCredits.unlimited !== true && creditBalance === null)
        ? null
        : { unlimited: rawCredits.unlimited === true, balance: creditBalance }
      const hasResource = rateLimits.length > 0 || credits !== null
      return {
        status: hasResource ? 'ok' : 'unavailable',
        connected: true,
        message: hasResource ? '' : 'Codex Connect 已登录，但服务端没有返回可显示的额度窗口。',
        fetchedAt: hasResource ? attemptedAt : 0,
        attemptedAt,
        rateLimits,
        credits,
      }
    }

    function codexLimitForModel(entry, modelId) {
      const limits = Array.isArray(entry?.rateLimits) ? entry.rateLimits : []
      const spark = /gpt-5\.3-codex-spark|bengalfox|spark/i.test(String(modelId ?? ''))
      const preferredId = spark ? 'codex_bengalfox' : 'codex'
      return limits.find(limit => limit.id === preferredId)
        ?? (!spark ? limits.find(limit => limit.id === 'codex') : undefined)
        ?? null
    }

    function primaryCodexWindow(entry, modelId) {
      const limit = codexLimitForModel(entry, modelId)
      if (limit === null) return null
      const preferred = limit.windows.find(windowValue => windowValue.windowSeconds === FIVE_HOURS_SECONDS)
        ?? limit.windows.find(windowValue => windowValue.windowSeconds === WEEK_SECONDS)
        ?? limit.windows[0]
      return preferred === undefined ? null : [quotaWindowLabel(preferred.windowSeconds), preferred]
    }

    async function companionJson(path, label, init = undefined) {
      const response = await window.fetch(path, {
        credentials: 'same-origin',
        cache: 'no-store',
        signal: AbortSignal.timeout(15_000),
        ...init,
        headers: { Accept: 'application/json', ...(init?.headers ?? {}) },
      })
      if (!response.ok) throw new Error(`${label} 状态接口返回 HTTP ${response.status}`)
      try {
        return await response.json()
      } catch {
        throw new Error(`${label} 状态接口返回了无效 JSON`)
      }
    }

    async function companionPost(path, label, body = {}) {
      return companionJson(path, label, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    }

    function companionFailure(previous, empty, attemptedAt, error) {
      const message = error instanceof Error ? error.message : String(error)
      return Number(previous?.fetchedAt) > 0
        ? { ...previous, status: 'error', message, attemptedAt }
        : { ...empty, status: 'error', message, fetchedAt: 0, attemptedAt }
    }

    async function readCodexResource(previous) {
      const attemptedAt = Date.now()
      try {
        const next = normalizeCodexStatus(await companionJson(codexStatusPath, 'Codex Connect'), attemptedAt)
        return next.connected === true && next.status !== 'ok' && Number(previous?.fetchedAt) > 0
          ? { ...previous, status: next.status, message: next.message, attemptedAt }
          : next
      } catch (error) {
        return companionFailure(previous, { connected: false, rateLimits: [], credits: null }, attemptedAt, error)
      }
    }

    const PROVIDER_ICONS = {
      openai: {
        viewBox: '0 0 40 40',
        path: 'M32.8377 17.282C33.2127 16.25 33.3072 15.218 33.2127 14.1875C33.1197 13.1571 32.7447 12.1251 32.2752 11.1876C31.4322 9.78209 30.2127 8.6571 28.8072 8.0001C27.3072 7.34461 25.7127 7.15711 24.1197 7.53211C23.3698 6.78212 22.5253 6.12512 21.5878 5.65713C20.6503 5.18913 19.5253 5.00013 18.4948 5.00013C16.8851 4.99074 15.3125 5.48246 13.9948 6.40712C12.6824 7.34311 11.7449 8.6571 11.2754 10.1571C10.1504 10.4376 9.21289 10.9071 8.27539 11.4696C7.4324 12.1251 6.77541 12.9696 6.21291 13.8126C5.36992 15.2195 5.08792 16.8125 5.27542 18.407C5.46399 19.9968 6.11605 21.496 7.1504 22.718C6.79608 23.7086 6.66795 24.7659 6.77541 25.8124C6.86991 26.8444 7.2449 27.8749 7.7129 28.8124C8.55739 30.2194 9.77538 31.3444 11.1824 31.9999C12.6824 32.6569 14.2753 32.8444 15.8698 32.4694C16.6198 33.2194 17.4628 33.8749 18.4003 34.3444C19.3378 34.8139 20.4628 34.9999 21.4948 34.9999C23.1043 35.0097 24.6769 34.5185 25.9947 33.5944C27.3072 32.6569 28.2447 31.3444 28.7127 29.8444C29.7719 29.6432 30.7682 29.1934 31.6197 28.5319C32.4627 27.8749 33.2127 27.1249 33.6822 26.1874C34.5251 24.7819 34.8071 23.1875 34.6196 21.5945C34.4322 20 33.8697 18.5015 32.8377 17.282ZM21.5878 33.0304C20.0878 33.0304 18.9628 32.5609 17.9323 31.7179C17.9323 31.7179 18.0253 31.6234 18.1198 31.6234L24.1197 28.1554C24.2862 28.0803 24.4196 27.9469 24.4947 27.7804C24.5698 27.636 24.6021 27.4731 24.5877 27.3109V18.875L27.1197 20.375V27.3124C27.1455 28.0547 27.0215 28.7945 26.755 29.4878C26.4885 30.181 26.085 30.8134 25.5687 31.3473C25.0523 31.8811 24.4337 32.3054 23.7497 32.5949C23.0658 32.8843 22.3305 33.0314 21.5878 33.0304ZM9.49488 27.8749C8.83789 26.7499 8.55739 25.4374 8.83789 24.125C8.83789 24.125 8.93239 24.2195 9.02539 24.2195L15.0253 27.6874C15.1693 27.7638 15.3325 27.7966 15.4948 27.7819C15.6823 27.7819 15.8698 27.7819 15.9628 27.6874L23.2753 23.4695V26.3749L17.1823 29.9374C16.5506 30.3042 15.8527 30.5427 15.1287 30.6393C14.4046 30.7358 13.6686 30.6884 12.9629 30.4999C11.4629 30.1249 10.2449 29.1874 9.49488 27.8749ZM7.9004 14.8445C8.56239 13.7234 9.58826 12.8627 10.8074 12.4056V19.532C10.8074 19.718 10.8074 19.907 10.9004 20C10.9755 20.1665 11.1089 20.2998 11.2754 20.375L18.5878 24.5944L16.0573 26.0944L10.0574 22.625C9.41842 22.2639 8.85742 21.7797 8.40684 21.2004C7.95627 20.6211 7.62506 19.9582 7.4324 19.25C7.05741 17.8445 7.1504 16.157 7.9004 14.8445ZM28.6197 19.625L21.3073 15.407L23.8377 13.9071L29.8377 17.375C30.7752 17.9375 31.5252 18.6875 31.9947 19.625C32.4642 20.5625 32.7447 21.5945 32.6502 22.7195C32.5603 23.7755 32.1699 24.7837 31.5252 25.6249C30.8697 26.4694 30.0252 27.1249 28.9947 27.4999V20.375C28.9947 20.1875 28.9947 20 28.9002 19.907C28.9002 19.907 28.8072 19.718 28.6197 19.625ZM31.1502 15.875C31.1502 15.875 31.0572 15.782 30.9627 15.782L24.9627 12.3126C24.7752 12.2196 24.6822 12.2196 24.4947 12.2196C24.3072 12.2196 24.1197 12.2196 24.0252 12.3126L16.7128 16.532V13.6251L22.8073 10.0626C23.7448 9.50009 24.7752 9.31259 25.9002 9.31259C26.9322 9.31259 27.9627 9.68759 28.9002 10.3446C29.7447 11.0001 30.4947 11.8446 30.8697 12.7821C31.2447 13.7196 31.3377 14.8445 31.1502 15.875ZM15.4003 21.125L12.8699 19.625V12.5946C12.8699 11.5626 13.1503 10.4376 13.7128 9.59459C14.2753 8.6571 15.1198 8.0001 16.0573 7.53211C17.0127 7.05249 18.0956 6.88812 19.1503 7.06261C20.1823 7.15711 21.2128 7.62511 22.0573 8.2821C22.0573 8.2821 21.9628 8.3751 21.8698 8.3751L15.8698 11.8446C15.7033 11.9197 15.57 12.0531 15.4948 12.2196C15.4003 12.4071 15.4003 12.5001 15.4003 12.6876V21.125ZM16.7128 18.125L19.9948 16.25L23.2753 18.125V21.875L19.9948 23.75L16.7128 21.875V18.125Z',
      },
      anthropic: { viewBox: '0 0 40 40', path: 'M26.9568 9.88184H22.1265L30.7753 31.7848H35.4917L26.9568 9.88184ZM13.028 9.88184L4.4917 31.7848H9.32203L11.2305 27.1793H20.2166L22.0126 31.6724H26.8444L18.0832 9.88184H13.028ZM12.5783 23.1361L15.4987 15.3853L18.5315 23.1361H12.5783Z' },
      google: { viewBox: '0 0 40 40', path: 'M37 20.034C27.8809 20.5837 20.5808 27.8809 20.0326 37H19.966C19.4163 27.8809 12.1177 20.5837 3 20.034V19.9674C12.1191 19.4163 19.4163 12.1191 19.966 3H20.0326C20.5822 12.1191 27.8809 19.4163 37 19.9674V20.034Z' },
      alibaba: { viewBox: '0 0 40 40', path: 'M37.9998 23.021C33.7998 25.2889 29.5698 27.3649 24.8614 28.3069C23.8114 28.5154 22.6474 28.5154 21.5809 28.3714C20.5639 28.2439 20.0554 27.3484 20.4169 26.4064C20.7619 25.5289 21.2209 24.635 21.8119 23.9C23.0899 22.3025 24.5329 20.849 25.8289 19.268C26.6203 18.2991 27.3335 17.2689 27.9618 16.187C28.4208 15.4205 28.2078 14.4935 27.4038 14.111C26.0584 13.4556 24.6154 12.9936 23.1889 12.4986C23.0239 12.4341 22.7779 12.6096 22.4509 12.7221C22.8604 13.0881 23.1559 13.3596 23.5654 13.727C19.3339 14.447 15.3305 15.467 11.4455 16.874C11.4275 16.9535 11.396 17.0165 11.411 17.0495C11.9855 17.927 11.723 18.5975 10.886 19.1405C10.5611 19.3531 10.2732 19.6176 10.034 19.9235C12.593 20.6735 14.873 20.243 17.0539 18.821C16.9234 18.6305 16.7914 18.455 16.6609 18.263C17.4799 18.407 17.9719 18.854 18.0379 19.556C18.0544 19.7165 17.9569 19.8755 17.9074 20.036C17.7919 19.907 17.6449 19.781 17.5474 19.6355C17.4799 19.5395 17.4634 19.4285 17.4154 19.268C14.8235 20.993 12.035 21.425 8.96751 20.531C8.96751 21.137 8.93451 21.6485 8.98401 22.1435C9.01701 22.574 8.83701 22.766 8.44401 22.9895C7.55752 23.5325 6.63803 24.092 5.90003 24.8105C5.01504 25.6879 5.34354 26.7589 6.54053 27.2059C7.90102 27.7159 9.329 27.7309 10.7555 27.5569C12.4445 27.3484 14.1005 27.0769 15.9394 26.8219C13.79 27.8269 11.6735 28.5319 9.4445 28.8169C7.88452 29.0269 6.32753 29.1379 4.78554 28.6909C2.57156 28.0684 1.58607 26.4394 2.16057 24.251C2.70206 22.2065 4.01455 20.5775 5.42454 19.076C10.133 14.078 16.0864 11.5401 22.9744 11.0286C24.5824 10.9176 26.2069 11.1246 27.7143 11.7951C29.8308 12.7536 30.7173 14.78 29.6838 16.826C29.0118 18.1835 28.0758 19.4285 27.1413 20.6585C26.2234 21.872 25.1899 22.9895 24.2224 24.155C23.9434 24.506 23.6809 24.875 23.4679 25.2724C23.0569 26.0224 23.3359 26.5174 24.2059 26.4394C26.0254 26.2624 27.8808 26.1199 29.6358 25.6729C32.2098 25.0174 34.7193 24.092 37.2618 23.2775C37.5243 23.213 37.7703 23.117 37.9998 23.0225V23.021Z' },
      zhipuai: { viewBox: '0 0 40 40', path: 'M20.1312 7.50002L17.4088 11.1913H5.81625L8.5375 7.50002H20.1325H20.1312ZM34.0675 28.81L31.3475 32.5H19.795L22.5125 28.81H34.0675ZM35 7.50002L16.58 32.5H5L23.42 7.50002H35Z' },
      kimi: { viewBox: '0 0 24 24', path: 'M3.51531 15.81L10.908 17.7878C10.8981 18.3134 10.9136 18.8392 10.9545 19.3633L15.5704 20.5979C14.2013 21.163 12.7171 21.3928 11.2413 21.2683C8.098 21.002 5.257 18.93 3.51531 15.81ZM2.72481 11.3196L11.5234 13.6733C11.3761 14.1864 11.2547 14.7065 11.1599 15.2318L19.543 17.4747C19.1266 18.0449 18.6469 18.5662 18.1132 19.0285L3.20918 15.0404C2.801 13.842 2.642 12.573 2.72481 11.3196ZM3.95938 7.32839L13.2191 9.80528C12.9339 10.2742 12.6727 10.7593 12.4363 11.2584L21.1899 13.6004C21.0799 14.2359 20.9047 14.8497 20.6722 15.4333L2.79611 10.6516C2.973 9.487 3.363 8.365 3.95938 7.32839ZM7.40192 3.9184L16.1478 6.25734C15.6862 6.67623 15.2494 7.12157 14.8396 7.59111L20.9024 9.21318C21.1093 9.87348 21.2449 10.5648 21.3 11.2785L4.33215 6.74016C5.19 5.542 6.223 4.594 7.40192 3.9184ZM12.0132 2.7001C14.394 2.7 16.66 3.746 18.0217 4.89334L8.29704 3.47045C9.432 2.976 10.7 2.7 12.0132 2.7001Z' },
      opencode: { viewBox: '0 0 24 24', path: 'M19.4004 21H5V3H19.4004V6.59961H8.59961V17.4004H15.7998V13.7998H12.2002V10.2002H19.4004V21Z' },
      mistral: { viewBox: '0 0 40 40', path: 'M8.92783 8.88101H13.357V13.3088H17.7861V17.738H17.7835H22.2152V13.3088H26.6418V8.88101H31.0722V26.5949H35.5V31.0241H22.2139V26.5962H17.7861V22.1671H13.3557V26.5949L17.7861 26.5962V31.0241H4.5V26.5949H8.92783V8.88101ZM22.2139 26.5962H26.6418V22.1671H22.2152V26.5962H22.2139Z' },
      openrouter: { viewBox: '0 0 24 24', path: 'M17.0634 5.48438C19.2029 5.48438 20.9371 7.23328 20.9371 9.39066C20.9371 11.548 19.2029 13.2969 17.0634 13.2969L20.9057 17.1716C21.3938 17.6638 21.0482 18.5053 20.358 18.5053H9.31575C5.75079 18.5053 2.86035 15.5907 2.86035 11.995C2.86035 8.39922 5.75079 5.48438 9.31575 5.48438H17.0634ZM9.31575 8.08855C7.17631 8.08855 5.44199 9.83747 5.44199 11.995C5.44199 14.1524 7.17631 15.9011 9.31575 15.9011C11.4552 15.9011 13.1895 14.1524 13.1895 11.995C13.1895 9.83747 11.4552 8.08855 9.31575 8.08855Z' },
      siliconflow: { viewBox: '0 0 40 40', path: 'M34.1033 12.3605H20.6227C19.8778 12.3605 19.2764 12.9839 19.2764 13.7501V17.9223C19.2764 18.2909 19.1346 18.6451 18.8823 18.9058C18.6292 19.1658 18.2869 19.3127 17.9293 19.3118H5.7933C5.04839 19.3118 4.44703 19.9353 4.44703 20.7014V26.2658C4.44618 26.6344 4.58887 26.9886 4.84114 27.2485C5.09341 27.5093 5.43656 27.6562 5.7933 27.6562H19.273C19.6306 27.6562 19.9729 27.5093 20.226 27.2485C20.4783 26.9886 20.6202 26.6344 20.6202 26.2658V22.0944C20.6193 21.7258 20.7612 21.3716 21.0143 21.1108C21.2665 20.8501 21.6097 20.704 21.9673 20.7048H34.0999C34.8457 20.7048 35.447 20.0805 35.447 19.3152V13.7501C35.447 12.9814 34.8423 12.3605 34.0999 12.3605H34.1033Z' },
      groq: { viewBox: '0 0 40 40', path: 'M20.056 4.50022C14.0839 4.44597 9.20616 9.15015 9.15036 15.0106C9.09611 20.8726 13.8855 25.6621 19.8576 25.7163H23.6085V21.7391H20.056C16.3252 21.7825 13.2671 18.8468 13.2237 15.1827C13.1787 11.5216 16.1702 8.52086 19.901 8.47746H20.056C23.7868 8.47746 26.8108 11.4457 26.8216 15.1083V24.8809C26.8216 28.5109 23.8085 31.4683 20.1211 31.5132C18.3617 31.5007 16.6759 30.8049 15.42 29.5726L12.551 32.3905C14.5529 34.3571 17.239 35.4715 20.0451 35.4998H20.1877C26.0823 35.413 30.8175 30.7212 30.85 24.9351V14.8603C30.7059 9.0928 25.9165 4.50022 20.056 4.50022Z' },
      custom: { viewBox: '0 0 24 24', path: 'M8.1 4.5 3.5 9.1v5.8l4.6 4.6h7.8l4.6-4.6V9.1l-4.6-4.6H8.1Zm.9 3h6l2.5 2.5v4L15 16.5H9L6.5 14v-4L9 7.5Zm1.5 2.25h3v4.5h-3v-4.5Z' },
    }

    function providerIconId(providerId, source, overrides = providerOverrides.getSnapshot()) {
      const id = String(providerId ?? '').trim().toLowerCase()
      const overrideIcon = overrides?.[id]?.icon
      if (PROVIDER_ICON_IDS.includes(overrideIcon)) return overrideIcon
      if (source === 'deepseek' || id.includes('deepseek')) return 'deepseek'
      if (/openai|chatgpt|codex/.test(id)) return 'openai'
      if (/anthropic|claude/.test(id)) return 'anthropic'
      if (/google|gemini/.test(id)) return 'google'
      if (/alibaba|qwen/.test(id)) return 'alibaba'
      if (/zhipu|zai|glm/.test(id)) return 'zhipuai'
      if (/kimi|moonshot/.test(id)) return 'kimi'
      if (/opencode/.test(id)) return 'opencode'
      if (/mistral/.test(id)) return 'mistral'
      if (/openrouter/.test(id)) return 'openrouter'
      if (/siliconflow/.test(id)) return 'siliconflow'
      if (/groq/.test(id)) return 'groq'
      return 'custom'
    }

    function ProviderMark({ providerId, source, size = 18, iconOverride = null }) {
      const overrides = useSyncExternalStore(fn => providerOverrides.subscribe(fn), () => providerOverrides.getSnapshot())
      const iconId = PROVIDER_ICON_IDS.includes(iconOverride) ? iconOverride : providerIconId(providerId, source, overrides)
      if (iconId === 'deepseek') {
        return el('span', { className: 'dsh-signal-provider-mark', style: { '--dsh-signal-mark-size': `${size}px` }, 'data-provider-icon': iconId, 'aria-hidden': 'true' }, el(FishLogo, { size }))
      }
      const icon = PROVIDER_ICONS[iconId]
      return el('span', { className: 'dsh-signal-provider-mark', style: { '--dsh-signal-mark-size': `${size}px` }, 'data-provider-icon': iconId, 'aria-hidden': 'true' },
        el('svg', { viewBox: icon.viewBox, fill: 'none', focusable: 'false' },
          el('path', { d: icon.path, fill: 'currentColor' })))
    }

    function Chevron({ open }) {
      return el('svg', { className: `dsh-signal-chevron${open ? ' open' : ''}`, viewBox: '0 0 12 12', fill: 'none', 'aria-hidden': 'true' },
        el('path', { d: 'm2.5 4.5 3.5 3 3.5-3', stroke: 'currentColor', strokeWidth: '1.25', strokeLinecap: 'round', strokeLinejoin: 'round' }))
    }

    function amount(value, currency) {
      const number = Number(value)
      if (!Number.isFinite(number)) return '—'
      const normalizedCurrency = String(currency ?? '').trim().toUpperCase()
      const symbol = normalizedCurrency === 'CNY' ? '¥' : normalizedCurrency === 'USD' ? '$' : normalizedCurrency.length > 0 ? `${currency} ` : ''
      return `${symbol}${new Intl.NumberFormat('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number)}`
    }

    function timeLabel(value) {
      const time = Number(value)
      if (!Number.isFinite(time) || time <= 0) return '尚未更新'
      return new Date(time).toLocaleString('zh-CN', { hour12: false })
    }

    function relativeAgeLabel(value, nowTime = Date.now()) {
      const time = Number(value)
      if (!Number.isFinite(time) || time <= 0) return '尚无成功记录'
      const minutes = Math.max(0, Math.floor((nowTime - time) / 60_000))
      if (minutes < 1) return '刚刚更新'
      if (minutes < 60) return `${minutes} 分钟前更新`
      const hours = Math.floor(minutes / 60)
      if (hours < 24) return `${hours} 小时前更新`
      return `${Math.floor(hours / 24)} 天前更新`
    }

    function resetExactLabel(value) {
      if (typeof value !== 'string' || value.length === 0) return '未提供重置时间'
      const parsed = Date.parse(value)
      return Number.isFinite(parsed)
        ? `重置：${new Date(parsed).toLocaleString('zh-CN', { hour12: false })}`
        : `重置：${value}`
    }

    function resetCountdown(value, nowTime = Date.now()) {
      if (typeof value !== 'string' || value.length === 0) return '未提供重置倒计时'
      const parsed = Date.parse(value)
      if (!Number.isFinite(parsed)) return '等待额度源提供时间'
      const minutes = Math.ceil((parsed - nowTime) / 60_000)
      if (minutes <= 0) return '等待额度源刷新'
      const days = Math.floor(minutes / 1440)
      const hours = Math.floor((minutes % 1440) / 60)
      const remainder = minutes % 60
      if (days > 0) return `${days} 天 ${hours} 小时后重置`
      if (hours > 0) return `${hours} 小时 ${remainder} 分后重置`
      return `${remainder} 分钟后重置`
    }

    function resourceFreshness(view, nowTime = Date.now()) {
      if (view.status === 'loading') return '正在读取真实数据'
      if (view.status === 'error') {
        return view.fetchedAt > 0
          ? `接口失败，保留上次结果 · ${relativeAgeLabel(view.fetchedAt, nowTime)}`
          : `接口失败 · ${relativeAgeLabel(view.attemptedAt, nowTime)}`
      }
      if (view.status === 'unavailable') {
        const unavailableLabel = view.connected === true ? '额度暂未返回' : '账户未连接'
        return view.fetchedAt > 0
          ? `${unavailableLabel}，保留上次结果 · ${relativeAgeLabel(view.fetchedAt, nowTime)}`
          : `${unavailableLabel} · ${relativeAgeLabel(view.attemptedAt, nowTime)}`
      }
      const ttl = view.resourceKind === 'balance' ? 5 * 60_000 : 15 * 60_000
      return nowTime - view.fetchedAt > ttl
        ? `数据已过期 · ${relativeAgeLabel(view.fetchedAt, nowTime)}`
        : relativeAgeLabel(view.fetchedAt, nowTime)
    }

    function resourceEntry(state, source) {
      if (source === 'deepseek') return state?.balance
      if (source === 'opencode') return state?.go
      if (source === 'codex') return state?.codex
      if (source === 'moonshot') return state?.moonshot
      if (source === 'moonshot-cn') return state?.moonshotCn
      if (source === 'siliconflow') return state?.siliconflow
      if (source === 'openrouter') return state?.openrouter
      return undefined
    }

    function resourceView(source, snapshot, modelId = '', providerId = '') {
      const resourceKind = ['deepseek', 'openrouter', 'moonshot', 'moonshot-cn', 'siliconflow'].includes(source)
        ? 'balance'
        : ['opencode', 'codex'].includes(source) ? 'quota' : 'none'
      if (source === null) return { kind: 'unavailable', status: 'unavailable', resourceKind, windowLabel: '', text: '本地用量', percent: null, fetchedAt: 0, attemptedAt: 0, message: providerCapability(providerId) }
      if (snapshot.status === 'loading' && snapshot.state === null) return { kind: 'loading', status: 'loading', resourceKind, windowLabel: '', text: '读取资源', percent: null, fetchedAt: 0, attemptedAt: 0, message: '' }
      if (snapshot.state === null) return { kind: 'error', status: 'error', resourceKind, windowLabel: '', text: '资源不可用', percent: null, fetchedAt: 0, attemptedAt: 0, message: snapshot.error ?? 'Host 资源服务未连接' }
      const entry = resourceEntry(snapshot.state, source)
      const meta = {
        status: entry?.status ?? 'unavailable',
        connected: entry?.connected === true,
        fetchedAt: entry?.fetchedAt ?? 0,
        attemptedAt: entry?.attemptedAt ?? 0,
      }
      const quota = source === 'opencode' ? primaryGoWindow(entry)
        : source === 'codex' ? primaryCodexWindow(entry, modelId)
          : null
      const quotaView = quota === null ? null : source === 'opencode'
        ? (() => {
          const used = clamp(Number(quota[1].percent), 0, 100)
          const remaining = 100 - used
          return { windowLabel: quota[0], text: `${quota[0]} · 剩余 ${Math.round(remaining)}%`, percent: remaining, percentKind: 'remaining' }
        })()
        : { windowLabel: quota[0], text: `${quota[0]} · 剩余 ${Math.round(Number(quota[1].remainingPercent))}%`, percent: clamp(Number(quota[1].remainingPercent), 0, 100), percentKind: 'remaining' }
      const codexCredits = source === 'codex' && entry?.credits !== null && entry?.credits !== undefined
        ? entry.credits.unlimited ? 'Credits · 无限' : Number.isFinite(Number(entry.credits.balance)) ? `Credits · ${new Intl.NumberFormat('zh-CN').format(Number(entry.credits.balance))}` : null
        : null
      const openRouterRailText = source === 'openrouter'
        ? entry?.limitRemaining !== null && entry?.limitRemaining !== undefined
          ? `上限剩余 ${amount(entry.limitRemaining, entry.currency)}`
          : '余额未提供'
        : null
      if (entry?.status === 'ok') {
        if (['deepseek', 'moonshot', 'moonshot-cn', 'siliconflow'].includes(source)) return { kind: 'ok', resourceKind, windowLabel: '', text: amount(entry.totalBalance, entry.currency), percent: null, message: '', ...meta }
        if (source === 'openrouter') return { kind: 'ok', resourceKind, windowLabel: '', text: openRouterRailText, percent: null, message: '', ...meta }
        if (quotaView !== null) return { kind: 'ok', resourceKind, message: '', ...quotaView, ...meta }
        if (codexCredits !== null) return { kind: 'ok', resourceKind, windowLabel: '', text: codexCredits, percent: null, percentKind: 'remaining', message: '', ...meta }
        return { kind: 'unavailable', resourceKind, windowLabel: '', text: '额度无数据', percent: null, message: '官方响应没有可显示的额度窗口。', ...meta }
      }
      if (entry?.fetchedAt > 0) {
        if (['deepseek', 'moonshot', 'moonshot-cn', 'siliconflow'].includes(source)) return { kind: entry.status, resourceKind, windowLabel: '', text: amount(entry.totalBalance, entry.currency), percent: null, message: entry.message, ...meta }
        if (source === 'openrouter') return { kind: entry.status, resourceKind, windowLabel: '', text: openRouterRailText, percent: null, message: entry.message, ...meta }
        if (quotaView !== null) return { kind: entry.status, resourceKind, message: entry.message, ...quotaView, ...meta }
        if (codexCredits !== null) return { kind: entry.status, resourceKind, windowLabel: '', text: codexCredits, percent: null, percentKind: 'remaining', message: entry.message, ...meta }
      }
      if (entry?.status === 'error') return { kind: 'error', resourceKind, windowLabel: '', text: resourceKind === 'balance' ? '资源不可用' : '额度不可用', percent: null, message: entry.message, ...meta }
      return { kind: 'unavailable', resourceKind, windowLabel: '', text: resourceKind === 'balance' ? '账户未连接' : entry?.connected === true ? '额度待返回' : '额度未连接', percent: null, message: entry?.message ?? '', ...meta }
    }

    function RailProgress({ view }) {
      if (view.resourceKind !== 'quota' || view.percent === null || view.percent === undefined) return null
      const percent = Number(view.percent)
      const verified = Number.isFinite(percent)
      if (!verified) return null
      const value = clamp(percent, 0, 100)
      const percentKind = view.percentKind === 'remaining' ? 'remaining' : 'used'
      const remaining = percentKind === 'used' ? 100 - value : value
      const used = percentKind === 'used' ? value : 100 - value
      const remainingLabel = Math.round(remaining)
      const usedLabel = Math.round(used)
      const label = `${view.windowLabel || '当前'}额度剩余 ${remainingLabel}%${percentKind === 'used' ? `（已用 ${usedLabel}%）` : ''}`
      return el('span', {
        className: 'dsh-signal-quota-track',
        role: 'progressbar',
        'aria-label': label,
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuenow': remaining,
        title: label,
      }, el('span', {
        className: 'dsh-signal-quota-fill',
        style: { '--dsh-signal-progress': remaining / 100 },
      }))
    }

    function GoWindow({ label, value, nowTime }) {
      if (value === null || value === undefined || !Number.isFinite(Number(value.percent))) return null
      const percent = Math.max(0, Math.min(100, Number(value.percent)))
      const remaining = 100 - percent
      const usedLabel = Math.round(percent)
      const remainingLabel = Math.round(remaining)
      const rowLabel = `${label}额度剩余 ${remainingLabel}%（已用 ${usedLabel}%）`
      return el('div', { className: 'dsh-signal-window-row', title: rowLabel, 'aria-label': rowLabel },
        el('span', { className: 'dsh-signal-window-label' }, label),
        el('span', { className: 'dsh-signal-track', 'aria-hidden': 'true' },
          el('span', { className: 'dsh-signal-fill', style: { '--dsh-signal-progress': remaining / 100 } })),
        el('span', { className: 'dsh-signal-window-value' }, `${remainingLabel}% 剩余`),
        el('span', { className: 'dsh-signal-reset' },
          el('strong', null, resetCountdown(value.resetsAt, nowTime)),
          el('small', null, resetExactLabel(value.resetsAt))))
    }

    function RemainingWindow({ label, value, nowTime }) {
      if (!isRecord(value) || !Number.isFinite(Number(value.remainingPercent))) return null
      const percent = clamp(Number(value.remainingPercent), 0, 100)
      return el('div', { className: 'dsh-signal-window-row' },
        el('span', { className: 'dsh-signal-window-label' }, label),
        el('span', { className: 'dsh-signal-track', 'aria-hidden': 'true' },
          el('span', { className: 'dsh-signal-fill', style: { '--dsh-signal-progress': percent / 100 } })),
        el('span', { className: 'dsh-signal-window-value' }, `${Math.round(percent)}% 剩余`),
        el('span', { className: 'dsh-signal-reset' },
          el('strong', null, resetCountdown(value.resetsAt, nowTime)),
          el('small', null, resetExactLabel(value.resetsAt))))
    }

    function PopoverBody({ source, snapshot, view, nowTime, modelId }) {
      if (source === null) return el('div', { className: 'dsh-signal-empty' }, view.message)
      if (snapshot.state === null) return el('div', { className: 'dsh-signal-empty dsh-signal-error' }, view.message)
      const entry = resourceEntry(snapshot.state, source)
      const hasCachedValue = Number(entry?.fetchedAt) > 0
      if (entry?.status !== 'ok' && !hasCachedValue) {
        return el('div', { className: `dsh-signal-empty${entry?.status === 'error' ? ' dsh-signal-error' : ''}` }, entry?.message || view.text)
      }
      const notice = entry?.status !== 'ok'
        ? el('div', { className: `dsh-signal-stale-notice${entry.status === 'error' ? ' error' : ''}`, role: 'status' }, resourceFreshness(view, nowTime))
        : null
      if (['deepseek', 'moonshot', 'moonshot-cn', 'siliconflow'].includes(source)) {
        const labels = source === 'deepseek'
          ? ['可用余额', '赠送余额', '充值余额']
          : source === 'siliconflow'
            ? ['账户总额', '赠送余额', '充值余额']
            : ['可用余额', '代金券余额', '现金余额']
        return el(React.Fragment, null,
          notice,
          el('div', { className: 'dsh-signal-balance' },
            el('span', null, labels[0]), el('strong', null, amount(entry.totalBalance, entry.currency)),
            el('span', null, labels[1]), el('span', null, amount(entry.grantedBalance, entry.currency)),
            el('span', null, labels[2]), el('span', null, amount(entry.toppedUpBalance, entry.currency))))
      }
      if (source === 'openrouter') {
        const resetLabels = { daily: '每日重置', weekly: '每周重置', monthly: '每月重置' }
        return el(React.Fragment, null,
          notice,
          el('div', { className: 'dsh-signal-balance' },
            el('span', null, '累计使用'), el('strong', null, amount(entry.usage, entry.currency)),
            el('span', null, '今日使用'), el('span', null, amount(entry.usageDaily, entry.currency)),
            el('span', null, '本周使用'), el('span', null, amount(entry.usageWeekly, entry.currency)),
            el('span', null, '本月使用'), el('span', null, amount(entry.usageMonthly, entry.currency)),
            entry.limit !== null ? el('span', null, `Key 上限${entry.limitReset ? ` · ${resetLabels[entry.limitReset] ?? entry.limitReset}` : ''}`) : null,
            entry.limit !== null ? el('span', null, amount(entry.limit, entry.currency)) : null,
            entry.limitRemaining !== null ? el('span', null, '上限剩余') : null,
            entry.limitRemaining !== null ? el('span', null, amount(entry.limitRemaining, entry.currency)) : null))
      }
      let rows
      let credits = null
      if (source === 'opencode') {
        rows = [
          el(GoWindow, { key: 'rolling', label: '5 小时', value: entry.rolling, nowTime }),
          el(GoWindow, { key: 'weekly', label: '本周', value: entry.weekly, nowTime }),
          el(GoWindow, { key: 'monthly', label: '本月', value: entry.monthly, nowTime }),
        ].filter(Boolean)
      } else if (source === 'codex') {
        const limit = codexLimitForModel(entry, modelId)
        const fiveHour = limit?.windows.find(windowValue => windowValue.windowSeconds === FIVE_HOURS_SECONDS)
        const weekly = limit?.windows.find(windowValue => windowValue.windowSeconds === WEEK_SECONDS)
        rows = [
          el(RemainingWindow, { key: 'rolling', label: '5 小时', value: fiveHour, nowTime }),
          el(RemainingWindow, { key: 'weekly', label: '本周', value: weekly, nowTime }),
        ].filter(Boolean)
        if (entry.credits !== null && entry.credits !== undefined) {
          credits = el('div', { className: 'dsh-signal-balance' },
            el('span', null, '附加 Credits'),
            el('strong', null, entry.credits.unlimited ? '无限' : new Intl.NumberFormat('zh-CN').format(Number(entry.credits.balance))))
        }
      } else {
        rows = []
      }
      return rows.length === 0
        ? credits ?? el('div', { className: 'dsh-signal-empty' }, '官方响应没有可显示的额度窗口。')
        : el(React.Fragment, null, notice, credits, el('div', { className: 'dsh-signal-window-list' }, rows))
    }

    function ResourceRail({ directory, resource, api, useSession }) {
      const models = useSyncExternalStore(fn => directory.subscribe(fn), () => directory.getSnapshot())
      const snapshot = useSyncExternalStore(fn => resource.subscribe(fn), () => resource.getSnapshot())
      const overrides = useSyncExternalStore(fn => providerOverrides.subscribe(fn), () => providerOverrides.getSnapshot())
      const sessionSnapshot = typeof useSession === 'function' ? useSession(value => value) : null
      const [open, setOpen] = useState(false)
      const nowTime = useMinuteClock(open)
      const rootRef = useRef(null)
      const buttonRef = useRef(null)
      const sessionStateRef = useRef(null)
      const popoverId = useId()
      const current = models.current
      const group = current === null ? undefined : models.groups.find(value => value.id === current.provider)
      const model = current === null ? undefined : group?.models.find(value => value.id === current.model)
      const providerName = group?.name ?? current?.provider ?? '正在读取路由'
      const modelName = model?.name ?? current?.model ?? '正在读取模型'
      const source = providerSource(current?.provider)
      const retired = isRetiredProvider(current?.provider)
      const identity = providerIdentity(current?.provider, providerName, source, overrides)
      const view = useMemo(() => resourceView(source, snapshot, current?.model, current?.provider), [source, snapshot, current?.model, current?.provider])

      useEffect(() => {
        api.setActiveSource?.(source)
        if (source === null) return () => api.setActiveSource?.(null)
        const scheduler = createRefreshScheduler({
          setTimeout: (callback, delay) => window.setTimeout(callback, delay),
          clearTimeout: timer => window.clearTimeout(timer),
          isVisible: () => document.visibilityState === 'visible',
          getDelay: () => api.getRefreshDelay?.(source) ?? 45_000,
          refresh: reason => api.refresh(source, { reason }),
        })
        const onVisibility = () => scheduler.onVisibility()
        const onFocus = () => scheduler.onFocus()
        document.addEventListener('visibilitychange', onVisibility)
        window.addEventListener('focus', onFocus)
        scheduler.start()
        return () => {
          scheduler.stop()
          document.removeEventListener('visibilitychange', onVisibility)
          window.removeEventListener('focus', onFocus)
          api.setActiveSource?.(null, source)
        }
      }, [source])

      useEffect(() => {
        if (source !== null && open && document.visibilityState === 'visible') void api.refresh(source, { reason: 'expand' })
      }, [source, open])

      useEffect(() => {
        if (source !== null) void api.refresh(source, { reason: 'model' })
      }, [source, current?.provider, current?.model])

      useEffect(() => {
        if (source === null || sessionSnapshot === null) return
        const running = sessionSnapshot?.running === true
        const completedAt = Number(sessionSnapshot?.finishedAt ?? sessionSnapshot?.completedAt ?? 0) || 0
        const previous = sessionStateRef.current
        sessionStateRef.current = { running, completedAt }
        const completed = previous?.running === true && !running
          || completedAt > 0 && completedAt > (previous?.completedAt ?? 0) && !running
        if (completed && document.visibilityState === 'visible') void api.refresh(source, { reason: 'session', force: true })
      }, [source, sessionSnapshot?.running, sessionSnapshot?.finishedAt, sessionSnapshot?.completedAt])

      useEffect(() => {
        if (source === null) return
        const entry = resourceEntry(snapshot.state, source)
        // Host state does not include external Codex Connect quota snapshots on
        // its first read. Treat a missing entry like an idle one so a
        // connected provider is probed as soon as its rail mounts.
        const canRetry = !entry?.attemptedAt || Date.now() - Number(entry.attemptedAt) >= 60_000
        if (canRetry && (entry === undefined || entry === null || entry?.status === 'idle' || Number(entry?.fetchedAt) === 0) && snapshot.refreshing !== source) void api.refresh(source, { reason: 'initial' })
      }, [source, snapshot.state, snapshot.refreshing])

      useEffect(() => {
        if (!open) return undefined
        const release = claimSignalOverlay('resource', () => setOpen(false))
        const onPointerDown = event => {
          const root = rootRef.current
          const target = event.target
          if (root && target instanceof Node && root.contains(target)) return
          setOpen(false)
        }
        const onKey = event => {
          if (event.key === 'Escape') {
            setOpen(false)
            buttonRef.current?.focus()
          }
        }
        // Resource details are a conventional dismissible popover: a click
        // outside closes it, while clicks anywhere inside the rail or panel
        // keep it open. Use capture so the panel closes before host handlers
        // can navigate or replace the conversation surface.
        document.addEventListener('pointerdown', onPointerDown, true)
        document.addEventListener('keydown', onKey)
        return () => {
          release()
          document.removeEventListener('pointerdown', onPointerDown, true)
          document.removeEventListener('keydown', onKey)
        }
      }, [open])

      if (retired) return null

      const refreshing = (source !== null && snapshot.refreshing === source) || snapshot.refreshing === 'all'
      const statusKind = view.kind
      const showsProgress = view.resourceKind === 'quota'
        && view.percent !== null && view.percent !== undefined && Number.isFinite(Number(view.percent))
      const aria = `${identity.brand}，${identity.plan}，当前模型 ${modelName}，${view.text}`
      return el('div', { ref: rootRef, className: 'dsh-signal-dock', 'data-dsh-signal-dock': '' },
        el('button', {
          ref: buttonRef,
          type: 'button',
          className: `dsh-signal-rail ${showsProgress ? 'has-quota' : 'amount-only'}`,
          'data-dsh-signal-rail': '',
          'aria-label': aria,
          'aria-expanded': open,
          'aria-controls': popoverId,
          'aria-haspopup': 'dialog',
          onClick: () => setOpen(value => !value),
        },
          el(ProviderMark, { providerId: current?.provider, source }),
          el('span', { key: `${identity.brand}/${identity.plan}`, className: 'dsh-signal-identity' },
            el('span', { className: 'dsh-signal-brand' }, identity.brand),
            el('span', { className: 'dsh-signal-identity-separator', 'aria-hidden': 'true' }, '·'),
            el('span', { className: 'dsh-signal-plan' }, identity.plan)),
          el(RailProgress, { view }),
          el('span', { className: 'dsh-signal-resource', role: 'status', 'aria-live': 'polite' },
            el('span', { className: `dsh-signal-status-dot ${statusKind}` }),
            el('span', { className: 'dsh-signal-resource-text' }, view.text)),
          el(Chevron, { open })),
        open ? el('div', { id: popoverId, className: 'dsh-signal-popover', role: 'dialog', 'aria-label': 'Provider 资源详情' },
          el('div', { className: 'dsh-signal-popover-head' },
            el(ProviderMark, { providerId: current?.provider, source }),
            el('div', { className: 'dsh-signal-popover-title' },
              el('strong', null, `${identity.brand} · ${identity.plan}`),
              el('span', null, `当前模型：${modelName} · ${current?.provider ?? '未选择'}/${current?.model ?? '未选择'}`)),
            source !== null ? el('span', { className: 'dsh-signal-source-tag' }, '直接来源') : null),
          el(PopoverBody, { source, snapshot, view, nowTime, modelId: current?.model }),
          el('div', { className: 'dsh-signal-popover-foot' },
            el('span', {
              className: 'dsh-signal-updated',
              title: `最近成功：${timeLabel(view.fetchedAt)} · 最近尝试：${timeLabel(view.attemptedAt)}`,
            }, resourceFreshness(view, nowTime)),
            source !== null ? el('button', {
              type: 'button',
              className: 'dsh-signal-refresh',
              disabled: refreshing,
              onClick: () => { void api.refresh(source) },
            }, refreshing ? '刷新中' : '刷新') : null))
          : null)
    }
