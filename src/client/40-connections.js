/*
 * DSH Signal intentionally exposes no account/login UI.
 * Codex Connect owns authentication, model settings, and quota credentials;
 * Signal only reads its redacted resource status through the resource rail.
 */

    function SignalAppearanceSettings() {
      return el('section', { className: 'dsh-signal-settings', 'data-dsh-signal-appearance': '' },
        el('header', { className: 'dsh-signal-settings-head' },
          el('div', { className: 'dsh-signal-settings-heading' },
            el('h2', null, 'Signal 外观'),
            el('p', null, '调整额度条中的品牌名、订阅名和 Logo。'))),
        el(ProviderBrandEditor, { state: null }),
        el('p', { className: 'dsh-signal-privacy-note' }, '显示名称只保存在本机，不影响模型选择、登录或真实额度。'))
    }
