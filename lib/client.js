/** DSH Signal browser bundle. */

window.__ModuleLoader__.load({
  id: 'dsh-signal',
  factory: (require) => {
    var module = { exports: {} }
    var exports = module.exports
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })

    const React = require('react')
    const { FishLogo } = require('@deepseek-ai/dsh-client-ui-primitives')
    const {
      createElement: el,
      useEffect,
      useId,
      useLayoutEffect,
      useMemo,
      useRef,
      useState,
      useSyncExternalStore,
    } = React

    const CSS = `
      /* DSH Signal: incumbent DSH Hero extension and provider resource rail. */
      @property --dsh-signal-rail-angle {
        syntax: '<angle>';
        inherits: false;
        initial-value: 0deg;
      }
      .dsh-signal-hero {
        position: relative;
        isolation: isolate;
        --dsh-signal-origin-x: 50%;
        --dsh-signal-origin-y: 50%;
        --dsh-signal-refract-x: 0px;
        --dsh-signal-refract-y: 0px;
        --dsh-signal-caustic-x: 0px;
        --dsh-signal-caustic-y: 0px;
        --dsh-signal-wake-x: 0px;
        --dsh-signal-wake-y: 0px;
        --dsh-signal-water-tilt: 0deg;
        --dsh-signal-water-radius-x: 132px;
        --dsh-signal-water-radius-y: 46px;
        --dsh-signal-wake-radius-x: 176px;
        --dsh-signal-wake-radius-y: 66px;
        --dsh-signal-glow-x: 0px;
        --dsh-signal-glow-y: 0px;
        --dsh-signal-glow-radius-x: 150px;
        --dsh-signal-glow-radius-y: 62px;
        --dsh-signal-refract-opacity: 0;
        --dsh-signal-caustic-opacity: 0;
        --dsh-signal-meniscus-opacity: 0;
        --dsh-signal-wake-opacity: 0;
        --dsh-signal-lumen-opacity: 0;
        --dsh-signal-shadow-x: 0px;
        --dsh-signal-shadow-y: 0px;
        --dsh-signal-shadow-alpha: 0;
        --dsh-signal-glow-alpha: 0;
        grid-template-columns: 46px auto auto !important;
        column-gap: 12px !important;
        overflow: visible !important;
      }
      .dsh-signal-hero-mark,
      .dsh-signal-hero-title,
      .dsh-signal-hero-badge {
        position: relative;
        z-index: 2;
      }
      .dsh-signal-hero-mark {
        width: 46px !important;
        height: 46px !important;
        display: inline-flex !important;
        align-items: center;
        justify-content: center;
      }
      .dsh-signal-mark {
        display: inline-flex;
        width: 46px;
        height: 46px;
        align-items: center;
        justify-content: center;
      }
      .dsh-signal-whale {
        width: 46px !important;
        height: 46px !important;
        max-width: none !important;
      }
      .dsh-signal-hero-title {
        font-size: clamp(30px, 2.5vw, 36px) !important;
        line-height: 1.18 !important;
        letter-spacing: -0.025em !important;
        text-wrap: balance;
        cursor: default;
        isolation: isolate;
      }
      .dsh-signal-wordmark-fx {
        position: absolute;
        z-index: 4;
        pointer-events: none;
        user-select: none;
        color: var(--dsh-signal-title-color, currentColor);
        opacity: 0;
        overflow: visible;
        contain: layout style;
        backface-visibility: hidden;
      }
      .dsh-signal-wordmark-fx-mark,
      .dsh-signal-wordmark-fx-title {
        position: absolute;
        display: inline-flex;
        align-items: center;
        white-space: nowrap;
      }
      .dsh-signal-wordmark-fx-mark svg {
        color: inherit !important;
      }
      .dsh-signal-wordmark-fx.lumen {
        z-index: 4;
        color: light-dark(#356bff, #76a8ff);
        opacity: var(--dsh-signal-lumen-opacity);
        transform-origin: var(--dsh-signal-origin-x) var(--dsh-signal-origin-y);
        transform: translate3d(0, 0, 0);
        filter: brightness(1.08) saturate(1.2)
          drop-shadow(0 2px 4px light-dark(rgba(53, 107, 255, .66), rgba(118, 168, 255, .76)))
          drop-shadow(0 5px 15px light-dark(rgba(53, 107, 255, .42), rgba(79, 124, 255, .5)))
          drop-shadow(0 9px 28px light-dark(rgba(53, 107, 255, .24), rgba(118, 168, 255, .26)));
        mix-blend-mode: normal;
        -webkit-mask-image: radial-gradient(ellipse var(--dsh-signal-glow-radius-x) var(--dsh-signal-glow-radius-y) at var(--dsh-signal-origin-x) var(--dsh-signal-origin-y), #000 0 48%, rgba(0, 0, 0, .94) 58%, rgba(0, 0, 0, .54) 72%, rgba(0, 0, 0, .16) 84%, transparent 94%);
        mask-image: radial-gradient(ellipse var(--dsh-signal-glow-radius-x) var(--dsh-signal-glow-radius-y) at var(--dsh-signal-origin-x) var(--dsh-signal-origin-y), #000 0 48%, rgba(0, 0, 0, .94) 58%, rgba(0, 0, 0, .54) 72%, rgba(0, 0, 0, .16) 84%, transparent 94%);
      }
      .dsh-signal-wordmark-fx.refract {
        z-index: 5;
        color: light-dark(#2f62f2, #8eb8ff);
        opacity: var(--dsh-signal-refract-opacity);
        transform-origin: var(--dsh-signal-origin-x) var(--dsh-signal-origin-y);
        transform: translate3d(var(--dsh-signal-refract-x), var(--dsh-signal-refract-y), 0) skewX(var(--dsh-signal-water-tilt)) scaleX(1.012) scaleY(.992);
        filter: brightness(1.05) contrast(1.22) saturate(1.22)
          drop-shadow(0 2px 3px light-dark(rgba(79, 124, 255, .36), rgba(142, 184, 255, .44)));
        -webkit-mask-image: radial-gradient(ellipse var(--dsh-signal-water-radius-x) var(--dsh-signal-water-radius-y) at var(--dsh-signal-origin-x) var(--dsh-signal-origin-y), #000 0 30%, rgba(0, 0, 0, .9) 43%, rgba(0, 0, 0, .46) 62%, rgba(0, 0, 0, .16) 76%, transparent 90%);
        mask-image: radial-gradient(ellipse var(--dsh-signal-water-radius-x) var(--dsh-signal-water-radius-y) at var(--dsh-signal-origin-x) var(--dsh-signal-origin-y), #000 0 30%, rgba(0, 0, 0, .9) 43%, rgba(0, 0, 0, .46) 62%, rgba(0, 0, 0, .16) 76%, transparent 90%);
      }
      .dsh-signal-wordmark-fx.caustic {
        z-index: 6;
        color: light-dark(#4f7cff, #8eb8ff);
        opacity: var(--dsh-signal-caustic-opacity);
        transform-origin: var(--dsh-signal-origin-x) var(--dsh-signal-origin-y);
        transform: translate3d(var(--dsh-signal-caustic-x), var(--dsh-signal-caustic-y), 0) skewX(var(--dsh-signal-water-tilt)) scaleX(1.018) scaleY(.986);
        filter: brightness(1.2) contrast(1.34) saturate(1.34)
          drop-shadow(0 2px 3px light-dark(rgba(49, 95, 216, .58), rgba(118, 168, 255, .68)))
          drop-shadow(0 4px 12px light-dark(rgba(79, 124, 255, .24), rgba(79, 124, 255, .38)));
        mix-blend-mode: plus-lighter;
        -webkit-mask-image: radial-gradient(ellipse var(--dsh-signal-water-radius-x) var(--dsh-signal-water-radius-y) at var(--dsh-signal-origin-x) var(--dsh-signal-origin-y), transparent 0 12%, rgba(0, 0, 0, .98) 17%, rgba(0, 0, 0, .2) 23%, transparent 28%, rgba(0, 0, 0, .9) 35%, rgba(0, 0, 0, .18) 42%, transparent 48%, rgba(0, 0, 0, .68) 56%, rgba(0, 0, 0, .12) 65%, transparent 76%);
        mask-image: radial-gradient(ellipse var(--dsh-signal-water-radius-x) var(--dsh-signal-water-radius-y) at var(--dsh-signal-origin-x) var(--dsh-signal-origin-y), transparent 0 12%, rgba(0, 0, 0, .98) 17%, rgba(0, 0, 0, .2) 23%, transparent 28%, rgba(0, 0, 0, .9) 35%, rgba(0, 0, 0, .18) 42%, transparent 48%, rgba(0, 0, 0, .68) 56%, rgba(0, 0, 0, .12) 65%, transparent 76%);
      }
      .dsh-signal-wordmark-fx.meniscus {
        z-index: 7;
        color: light-dark(#2768ff, #9bc3ff);
        opacity: var(--dsh-signal-meniscus-opacity);
        transform-origin: var(--dsh-signal-origin-x) var(--dsh-signal-origin-y);
        transform: translate3d(var(--dsh-signal-caustic-x), var(--dsh-signal-caustic-y), 0) skewX(var(--dsh-signal-water-tilt)) scaleX(1.006) scaleY(.994);
        filter: brightness(1.22) contrast(1.42) saturate(1.28)
          drop-shadow(0 1px 2px light-dark(rgba(39, 104, 255, .76), rgba(155, 195, 255, .78)))
          drop-shadow(0 4px 10px light-dark(rgba(39, 104, 255, .3), rgba(79, 124, 255, .34)));
        mix-blend-mode: plus-lighter;
        -webkit-mask-image: radial-gradient(ellipse var(--dsh-signal-water-radius-x) var(--dsh-signal-water-radius-y) at var(--dsh-signal-origin-x) var(--dsh-signal-origin-y), transparent 0 39%, rgba(0, 0, 0, .98) 42%, rgba(0, 0, 0, .34) 45%, transparent 48%, rgba(0, 0, 0, .72) 55%, rgba(0, 0, 0, .16) 59%, transparent 64%);
        mask-image: radial-gradient(ellipse var(--dsh-signal-water-radius-x) var(--dsh-signal-water-radius-y) at var(--dsh-signal-origin-x) var(--dsh-signal-origin-y), transparent 0 39%, rgba(0, 0, 0, .98) 42%, rgba(0, 0, 0, .34) 45%, transparent 48%, rgba(0, 0, 0, .72) 55%, rgba(0, 0, 0, .16) 59%, transparent 64%);
      }
      .dsh-signal-wordmark-fx.wake {
        z-index: 3;
        color: light-dark(#315fd8, #4f7cff);
        opacity: var(--dsh-signal-wake-opacity);
        transform-origin: var(--dsh-signal-origin-x) var(--dsh-signal-origin-y);
        transform: translate3d(var(--dsh-signal-wake-x), var(--dsh-signal-wake-y), 0) skewX(var(--dsh-signal-water-tilt)) scaleX(1.026) scaleY(.982);
        filter: brightness(1.1) contrast(1.24) saturate(1.3)
          drop-shadow(0 3px 5px light-dark(rgba(49, 95, 216, .34), rgba(79, 124, 255, .5)));
        mix-blend-mode: plus-lighter;
        -webkit-mask-image: radial-gradient(ellipse var(--dsh-signal-wake-radius-x) var(--dsh-signal-wake-radius-y) at var(--dsh-signal-origin-x) var(--dsh-signal-origin-y), transparent 0 38%, rgba(0, 0, 0, .84) 46%, rgba(0, 0, 0, .34) 55%, rgba(0, 0, 0, .12) 65%, transparent 76%);
        mask-image: radial-gradient(ellipse var(--dsh-signal-wake-radius-x) var(--dsh-signal-wake-radius-y) at var(--dsh-signal-origin-x) var(--dsh-signal-origin-y), transparent 0 38%, rgba(0, 0, 0, .84) 46%, rgba(0, 0, 0, .34) 55%, rgba(0, 0, 0, .12) 65%, transparent 76%);
      }
      .dsh-signal-hero.dsh-signal-wordmark-live .dsh-signal-wordmark-fx {
        will-change: opacity, filter, transform;
      }
      .dsh-signal-hero.dsh-signal-wordmark-live .dsh-signal-hero-mark,
      .dsh-signal-hero.dsh-signal-wordmark-live .dsh-signal-hero-title {
        filter:
          drop-shadow(var(--dsh-signal-shadow-x) var(--dsh-signal-shadow-y) 2px rgba(79, 124, 255, var(--dsh-signal-shadow-alpha)))
          drop-shadow(0 3px 9px rgba(79, 124, 255, var(--dsh-signal-glow-alpha)));
      }
      .dsh-signal-hero-badge {
        transform: translateY(1px) scale(1.04);
        transform-origin: left center;
      }
      .dsh-signal-fx-host {
        display: contents;
      }
      .dsh-signal-field {
        position: absolute;
        z-index: 1;
        left: 50%;
        top: 50%;
        width: min(950px, calc(100vw - 330px));
        height: min(440px, calc(100vh - 300px));
        transform: translate(-50%, -24%);
        pointer-events: none;
        user-select: none;
        contain: layout style paint;
      }
      .dsh-signal-hero.dsh-signal-revealing .dsh-signal-hero-mark {
        animation: dsh-signal-acquire 1.18s cubic-bezier(.18,.72,.18,1) both;
      }
      .dsh-signal-hero.dsh-signal-revealing .dsh-signal-hero-title {
        animation: dsh-signal-acquire 1.34s .08s cubic-bezier(.18,.72,.18,1) both;
      }
      .dsh-signal-hero.dsh-signal-revealing .dsh-signal-hero-badge {
        animation: dsh-signal-badge 1.08s .30s cubic-bezier(.18,.72,.18,1) both;
      }
      @keyframes dsh-signal-acquire {
        0% { opacity: .72; filter: blur(1px); clip-path: inset(0 0 0 0); }
        34% { opacity: .9; filter: blur(.4px); }
        72% { opacity: 1; filter: blur(.7px); }
        100% { opacity: 1; filter: blur(0); clip-path: inset(0 0 0 0); }
      }
      @keyframes dsh-signal-badge {
        0% { opacity: 0; filter: blur(5px); transform: translateX(-5px) translateY(1px) scale(1.04); }
        100% { opacity: 1; filter: blur(0); transform: translateX(0) translateY(1px) scale(1.04); }
      }

      .dsh-signal-dock {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: var(--dsh-chat-content-width, 720px);
        height: 40px;
        margin: 0 auto;
        padding: 2px calc(var(--dsh-composer-side-clearance, 0px) + 16px) 4px;
        box-sizing: border-box;
        color: var(--dsw-alias-label-primary);
      }
      body.dsh-signal-settings-open [data-dsh-signal-composer-seat] {
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        transition: none !important;
      }
      .dsh-signal-rail {
        --dsh-signal-rail-angle: 0deg;
        --dsh-signal-rail-surface: light-dark(#fff, var(--dsw-alias-bg-layer-1));
        --dsh-signal-rail-highlight-a: light-dark(rgba(79, 124, 255, .58), rgba(142, 184, 255, .62));
        --dsh-signal-rail-highlight-b: light-dark(rgba(142, 184, 255, .22), rgba(79, 124, 255, .28));
        --dsh-signal-rail-highlight-c: light-dark(rgba(79, 124, 255, .08), rgba(79, 124, 255, .12));
        --dsh-signal-rail-highlight-d: light-dark(rgba(118, 168, 255, .48), rgba(118, 168, 255, .54));
        --dsh-signal-rail-shadow: 0 6px 16px light-dark(rgba(26, 45, 78, .11), rgba(0, 0, 0, .30)), 0 1px 3px light-dark(rgba(26, 45, 78, .06), rgba(0, 0, 0, .22));
        --dsh-signal-rail-shadow-emphasis: 0 8px 20px light-dark(rgba(26, 45, 78, .14), rgba(0, 0, 0, .36)), 0 2px 5px light-dark(rgba(26, 45, 78, .08), rgba(0, 0, 0, .26));
        width: min(480px, 100%);
        height: 36px;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 14px;
        box-sizing: border-box;
        border: 1px solid transparent;
        border-radius: 999px;
        background:
          linear-gradient(var(--dsh-signal-rail-surface), var(--dsh-signal-rail-surface)) padding-box,
          conic-gradient(from var(--dsh-signal-rail-angle), var(--dsh-signal-rail-highlight-c) 0deg, var(--dsh-signal-rail-highlight-a) 58deg, var(--dsh-signal-rail-highlight-b) 122deg, var(--dsh-signal-rail-highlight-c) 204deg, var(--dsh-signal-rail-highlight-d) 292deg, var(--dsh-signal-rail-highlight-c) 360deg) border-box;
        color: var(--dsw-alias-label-primary);
        font: inherit;
        font-size: 12px;
        line-height: 1;
        cursor: pointer;
        outline: none;
        box-shadow: var(--dsh-signal-rail-shadow);
        animation: dsh-signal-rail-flow 7.2s linear infinite;
        transition: box-shadow 180ms cubic-bezier(.16,1,.3,1);
      }
      @keyframes dsh-signal-rail-flow {
        to { --dsh-signal-rail-angle: 360deg; }
      }
      .dsh-signal-rail:hover {
        box-shadow: var(--dsh-signal-rail-shadow-emphasis);
      }
      .dsh-signal-rail[aria-expanded="true"] {
        box-shadow: var(--dsh-signal-rail-shadow-emphasis);
      }
      .dsh-signal-rail:focus-visible {
        box-shadow: var(--dsh-signal-rail-shadow-emphasis), 0 0 0 2px color-mix(in srgb, #4f7cff 28%, transparent);
      }
      .dsh-signal-provider-mark {
        flex: none;
        display: inline-flex;
        width: var(--dsh-signal-mark-size, 18px);
        height: var(--dsh-signal-mark-size, 18px);
        align-items: center;
        justify-content: center;
        color: currentColor;
      }
      .dsh-signal-provider-mark svg {
        width: var(--dsh-signal-mark-size, 18px) !important;
        height: var(--dsh-signal-mark-size, 18px) !important;
        display: block;
      }
      .dsh-signal-identity {
        flex: none;
        max-width: 154px;
        min-width: 0;
        display: inline-flex;
        align-items: baseline;
        gap: 4px;
        overflow: hidden;
        white-space: nowrap;
        animation: dsh-signal-rail-swap 240ms cubic-bezier(.16,1,.3,1) both;
      }
      .dsh-signal-brand,
      .dsh-signal-plan {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .dsh-signal-brand {
        font-weight: 590;
        letter-spacing: -0.01em;
      }
      .dsh-signal-plan { color: var(--dsw-alias-label-secondary); }
      .dsh-signal-identity-separator { color: var(--dsw-alias-label-tertiary); }
      @keyframes dsh-signal-rail-swap {
        from { opacity: .2; filter: blur(4px); transform: translateX(-4px); }
        to { opacity: 1; filter: blur(0); transform: translateX(0); }
      }
      .dsh-signal-quota-track {
        position: relative;
        flex: 1 1 112px;
        min-width: 58px;
        height: 4px;
        overflow: hidden;
        border-radius: 999px;
        background: color-mix(in srgb, var(--dsw-alias-label-primary) 10%, transparent);
      }
      .dsh-signal-quota-fill {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background: #4f7cff;
        transform-origin: left center;
        transform: scaleX(var(--dsh-signal-progress, 0));
        transition: transform 360ms cubic-bezier(.16,1,.3,1), background-color 180ms ease;
      }
      .dsh-signal-rail.amount-only .dsh-signal-resource { margin-left: auto; }
      .dsh-signal-resource {
        flex: none;
        min-width: 0;
        display: inline-flex;
        align-items: center;
        gap: 7px;
        color: var(--dsw-alias-label-secondary);
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      .dsh-signal-resource-text {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .dsh-signal-status-dot {
        flex: none;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--dsw-alias-label-tertiary);
      }
      .dsh-signal-status-dot.ok { background: #4f7cff; }
      .dsh-signal-status-dot.error { background: var(--dsw-alias-state-error-primary); }
      .dsh-signal-status-dot.loading { animation: dsh-signal-pulse 1.1s ease-in-out infinite; }
      .dsh-signal-chevron {
        flex: none;
        width: 12px;
        height: 12px;
        color: var(--dsw-alias-label-tertiary);
        transition: transform 160ms ease;
      }
      .dsh-signal-chevron.open { transform: rotate(180deg); }
      @keyframes dsh-signal-pulse { 50% { opacity: .28; transform: scale(.72); } }

      .dsh-signal-popover {
        position: absolute;
        z-index: 80;
        left: 50%;
        bottom: calc(100% + 8px);
        width: min(344px, calc(100vw - 32px));
        transform: translateX(-50%);
        box-sizing: border-box;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 14px;
        background: var(--dsw-alias-bg-layer-1);
        color: var(--dsw-alias-label-primary);
        box-shadow: 0 12px 30px rgba(17, 31, 56, .16);
        padding: 14px;
        font-size: 12px;
        line-height: 1.5;
        transform-origin: 50% 100%;
        animation: dsh-signal-popover-in 240ms cubic-bezier(.16,1,.3,1) both;
      }
      @keyframes dsh-signal-popover-in {
        from { opacity: .75; transform: translate(-50%, 7px) scale(.97); clip-path: inset(0 round 14px); filter: blur(0); }
        62% { opacity: 1; transform: translate(-50%, 0) scale(1); clip-path: inset(0 round 14px); filter: blur(0); }
        to { opacity: 1; transform: translate(-50%, 0) scale(1); clip-path: inset(0 round 14px); filter: blur(0); }
      }
      .dsh-signal-popover-head {
        display: flex;
        align-items: flex-start;
        gap: 9px;
        margin-bottom: 13px;
      }
      .dsh-signal-popover-title {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .dsh-signal-popover-title strong {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 13px;
        font-weight: 650;
      }
      .dsh-signal-popover-title span,
      .dsh-signal-note,
      .dsh-signal-updated {
        color: var(--dsw-alias-label-tertiary);
      }
      .dsh-signal-source-tag {
        flex: none;
        margin-left: auto;
        padding: 2px 7px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 999px;
        color: var(--dsw-alias-label-secondary);
        font-size: 10px;
        white-space: nowrap;
      }
      .dsh-signal-balance {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 7px 12px;
        align-items: baseline;
      }
      .dsh-signal-balance span { color: var(--dsw-alias-label-secondary); }
      .dsh-signal-balance strong {
        font-size: 14px;
        font-variant-numeric: tabular-nums;
      }
      .dsh-signal-window-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .dsh-signal-window-row {
        display: grid;
        grid-template-columns: 46px minmax(0, 1fr) 74px;
        gap: 8px;
        align-items: center;
        animation: dsh-signal-window-in 280ms cubic-bezier(.16,1,.3,1) both;
      }
      .dsh-signal-window-row:nth-child(2) { animation-delay: 28ms; }
      .dsh-signal-window-row:nth-child(3) { animation-delay: 56ms; }
      @keyframes dsh-signal-window-in {
        from { opacity: .2; transform: translateY(4px); filter: blur(2px); }
        to { opacity: 1; transform: translateY(0); filter: blur(0); }
      }
      .dsh-signal-window-label { color: var(--dsw-alias-label-secondary); }
      .dsh-signal-track {
        height: 4px;
        border-radius: 999px;
        overflow: hidden;
        background: var(--dsw-alias-border-l1);
      }
      .dsh-signal-fill {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background: #4f7cff;
        transform: scaleX(var(--dsh-signal-progress, 0));
        transform-origin: left center;
        transition: transform 360ms cubic-bezier(.16,1,.3,1), background-color 180ms ease;
      }
      .dsh-signal-window-value {
        min-width: 74px;
        text-align: right;
        white-space: nowrap;
        color: var(--dsw-alias-label-primary);
        font-variant-numeric: tabular-nums;
      }
      .dsh-signal-reset {
        grid-column: 2 / -1;
        margin-top: -5px;
        color: var(--dsw-alias-label-tertiary);
        font-size: 10px;
      }
      .dsh-signal-reset strong,
      .dsh-signal-reset small {
        display: block;
        font: inherit;
        line-height: 1.45;
      }
      .dsh-signal-reset strong {
        color: var(--dsw-alias-label-secondary);
        font-weight: 600;
      }
      .dsh-signal-reset small { margin-top: 1px; }
      .dsh-signal-stale-notice {
        margin-bottom: 10px;
        padding: 8px 10px;
        border: 1px solid color-mix(in srgb, #d39a3d 32%, var(--dsw-alias-border-l1));
        border-radius: 8px;
        background: color-mix(in srgb, #d39a3d 7%, transparent);
        color: var(--dsw-alias-label-secondary);
        font-size: 10px;
        line-height: 1.45;
      }
      .dsh-signal-stale-notice.error {
        border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 32%, var(--dsw-alias-border-l1));
        background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 6%, transparent);
      }
      .dsh-signal-empty {
        padding: 5px 0 3px;
        color: var(--dsw-alias-label-secondary);
      }
      .dsh-signal-error { color: var(--dsw-alias-state-error-primary); }
      .dsh-signal-popover-foot {
        display: flex;
        align-items: center;
        gap: 10px;
        min-height: 28px;
        margin-top: 13px;
        padding-top: 11px;
        border-top: 1px solid var(--dsw-alias-border-l1);
      }
      .dsh-signal-updated {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 10px;
      }
      .dsh-signal-refresh {
        margin-left: auto;
        height: 28px;
        padding: 0 11px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 8px;
        background: transparent;
        color: var(--dsw-alias-label-primary);
        font: inherit;
        font-size: 11px;
        cursor: pointer;
        outline: none;
      }
      .dsh-signal-refresh:hover { background: var(--dsw-alias-interactive-bg-hover); }
      .dsh-signal-refresh:focus-visible {
        border-color: #4f7cff;
        box-shadow: 0 0 0 2px color-mix(in srgb, #4f7cff 28%, transparent);
      }
      .dsh-signal-refresh:disabled { cursor: default; opacity: .48; }

      .dsh-signal-settings {
        width: 100%;
        max-width: 980px;
        padding: 10px 4px 36px;
        box-sizing: border-box;
        color: var(--dsw-alias-label-primary);
      }
      .dsh-signal-settings-head {
        display: flex;
        align-items: flex-start;
        gap: 20px;
        margin-bottom: 24px;
      }
      .dsh-signal-settings-heading { min-width: 0; }
      .dsh-signal-settings-heading h2 {
        margin: 0;
        font-size: 20px;
        line-height: 1.3;
        letter-spacing: -.02em;
      }
      .dsh-signal-settings-heading p {
        margin: 6px 0 0;
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
        line-height: 1.55;
      }
      .dsh-signal-settings-refresh {
        flex: none;
        margin-left: auto;
        min-width: 72px;
        height: 32px;
        padding: 0 12px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 8px;
        background: transparent;
        color: var(--dsw-alias-label-primary);
        font: inherit;
        font-size: 12px;
        cursor: pointer;
      }
      .dsh-signal-settings-refresh:hover { background: var(--dsw-alias-interactive-bg-hover); }
      .dsh-signal-settings-refresh:focus-visible {
        outline: none;
        border-color: #4f7cff;
        box-shadow: 0 0 0 2px color-mix(in srgb, #4f7cff 28%, transparent);
      }
      .dsh-signal-settings-refresh:disabled { opacity: .48; cursor: default; }
      .dsh-signal-sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }
      .dsh-signal-analytics-error {
        margin: 0 0 18px;
        padding: 11px 13px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 10px;
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
      }
      .dsh-signal-data-state {
        display: grid;
        grid-template-columns: 8px minmax(0, 1fr);
        gap: 10px;
        align-items: start;
        margin: 0 0 14px;
        padding: 10px 12px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 10px;
        background: color-mix(in srgb, var(--dsw-alias-bg-layer-1) 88%, transparent);
      }
      .dsh-signal-data-state-dot {
        width: 7px;
        height: 7px;
        margin-top: 4px;
        border-radius: 999px;
        background: #51a56a;
        box-shadow: 0 0 0 3px color-mix(in srgb, #51a56a 14%, transparent);
      }
      .dsh-signal-data-state.stale .dsh-signal-data-state-dot,
      .dsh-signal-data-state.unavailable .dsh-signal-data-state-dot {
        background: #d39a3d;
        box-shadow: 0 0 0 3px color-mix(in srgb, #d39a3d 14%, transparent);
      }
      .dsh-signal-data-state.error .dsh-signal-data-state-dot {
        background: var(--dsw-alias-state-error-primary);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-state-error-primary) 14%, transparent);
      }
      .dsh-signal-data-state strong,
      .dsh-signal-data-state span { display: block; }
      .dsh-signal-data-state strong { font-size: 11px; font-weight: 620; }
      .dsh-signal-data-state div > span {
        margin-top: 2px;
        overflow: hidden;
        color: var(--dsw-alias-label-tertiary);
        font-size: 10px;
        line-height: 1.45;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .dsh-signal-filters {
        display: flex;
        align-items: end;
        gap: 10px;
        margin: 0 0 14px;
        padding: 10px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 12px;
        background: var(--dsw-alias-bg-layer-1);
      }
      .dsh-signal-range-filter {
        display: inline-flex;
        flex: none;
        gap: 2px;
        padding: 2px;
        border-radius: 9px;
        background: color-mix(in srgb, var(--dsw-alias-label-primary) 6%, transparent);
      }
      .dsh-signal-range-filter button,
      .dsh-signal-filter-clear {
        height: 28px;
        border: 0;
        border-radius: 7px;
        background: transparent;
        color: var(--dsw-alias-label-tertiary);
        font: inherit;
        font-size: 10px;
        cursor: pointer;
      }
      .dsh-signal-range-filter button { min-width: 44px; padding: 0 8px; }
      .dsh-signal-range-filter button.active {
        background: var(--dsw-alias-bg-layer-1);
        color: var(--dsw-alias-label-primary);
        box-shadow: 0 1px 4px rgb(0 0 0 / 12%);
        font-weight: 620;
      }
      .dsh-signal-filter-select {
        display: grid;
        flex: 1 1 150px;
        gap: 4px;
        min-width: 120px;
      }
      .dsh-signal-filter-select > span {
        color: var(--dsw-alias-label-tertiary);
        font-size: 9px;
      }
      .dsh-signal-filter-select select,
      .dsh-signal-brand-form input,
      .dsh-signal-brand-form select {
        width: 100%;
        height: 30px;
        box-sizing: border-box;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 8px;
        background: var(--dsw-alias-bg-layer-1);
        color: var(--dsw-alias-label-primary);
        font: inherit;
        font-size: 10px;
        outline: none;
      }
      .dsh-signal-filter-select select { padding: 0 26px 0 9px; }
      .dsh-signal-filter-clear { flex: none; padding: 0 8px; }
      .dsh-signal-range-filter button:hover,
      .dsh-signal-filter-clear:hover { color: var(--dsw-alias-label-primary); }
      .dsh-signal-range-filter button:focus-visible,
      .dsh-signal-filter-clear:focus-visible,
      .dsh-signal-filter-select select:focus-visible,
      .dsh-signal-brand-form input:focus-visible,
      .dsh-signal-brand-form select:focus-visible {
        border-color: #4f7cff;
        outline: 2px solid color-mix(in srgb, #4f7cff 24%, transparent);
        outline-offset: 1px;
      }
      .dsh-signal-kpis {
        display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 14px;
        overflow: hidden;
        background: var(--dsw-alias-bg-layer-1);
      }
      .dsh-signal-kpi {
        min-width: 0;
        padding: 15px 14px 14px;
        border-right: 1px solid var(--dsw-alias-border-l1);
      }
      .dsh-signal-kpi:last-child { border-right: 0; }
      .dsh-signal-kpi-label {
        display: block;
        overflow: hidden;
        color: var(--dsw-alias-label-tertiary);
        font-size: 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .dsh-signal-kpi-value {
        display: block;
        margin-top: 7px;
        overflow: hidden;
        font-size: 19px;
        font-weight: 650;
        font-variant-numeric: tabular-nums;
        letter-spacing: -.02em;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .dsh-signal-analytics-section { margin-top: 28px; }
      .dsh-signal-section-head {
        display: flex;
        align-items: baseline;
        gap: 12px;
        margin-bottom: 12px;
      }
      .dsh-signal-section-head h3 {
        margin: 0;
        font-size: 13px;
        font-weight: 650;
      }
      .dsh-signal-section-meta {
        color: var(--dsw-alias-label-tertiary);
        font-size: 10px;
      }
      .dsh-signal-heatmap-wrap {
        overflow-x: auto;
        padding: 14px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 14px;
        background: var(--dsw-alias-bg-layer-1);
      }
      .dsh-signal-activity-tabs {
        margin-left: auto;
        display: inline-flex;
        align-items: center;
        gap: 2px;
      }
      .dsh-signal-activity-tab {
        min-width: 44px;
        height: 32px;
        padding: 0 10px;
        border: 0;
        border-radius: 8px;
        background: transparent;
        color: var(--dsw-alias-label-tertiary);
        font: inherit;
        font-size: 11px;
        cursor: pointer;
      }
      .dsh-signal-activity-tab:hover { color: var(--dsw-alias-label-secondary); }
      .dsh-signal-activity-tab.active {
        background: var(--dsw-alias-interactive-bg-hover);
        color: var(--dsw-alias-label-primary);
        font-weight: 590;
      }
      .dsh-signal-activity-tab:focus-visible {
        outline: 2px solid color-mix(in srgb, #4f7cff 60%, transparent);
        outline-offset: 1px;
      }
      .dsh-signal-activity-view {
        min-width: 690px;
        animation: dsh-signal-activity-in 280ms cubic-bezier(.16,1,.3,1) both;
      }
      @keyframes dsh-signal-activity-in {
        from { opacity: .2; filter: blur(3px); transform: translateY(3px); }
        to { opacity: 1; filter: blur(0); transform: translateY(0); }
      }
      .dsh-signal-heatmap {
        display: grid;
        grid-template-rows: repeat(7, 10px);
        grid-auto-flow: column;
        grid-auto-columns: 10px;
        gap: 3px;
        width: max-content;
        min-width: 100%;
      }
      .dsh-signal-heat-cell {
        width: 10px;
        height: 10px;
        border-radius: 2px;
        background: color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent);
      }
      .dsh-signal-heat-cell.interactive {
        position: relative;
        appearance: none;
        padding: 0;
        border: 0;
        outline: none;
        cursor: crosshair;
        transform-origin: center;
        transition: transform 120ms cubic-bezier(.16,1,.3,1), box-shadow 120ms ease;
      }
      .dsh-signal-heat-cell.interactive:hover,
      .dsh-signal-heat-cell.interactive:focus-visible {
        z-index: 2;
        transform: scale(1.34);
        box-shadow: 0 0 0 2px var(--dsw-alias-bg-layer-1), 0 0 0 3px #4f7cff;
      }
      .dsh-signal-heat-cell.interactive.pinned {
        box-shadow: 0 0 0 1px var(--dsw-alias-bg-layer-1), 0 0 0 2px #8eb8ff;
      }
      .dsh-signal-heat-cell[data-level="1"] { background: color-mix(in srgb, #4f7cff 26%, transparent); }
      .dsh-signal-heat-cell[data-level="2"] { background: color-mix(in srgb, #4f7cff 46%, transparent); }
      .dsh-signal-heat-cell[data-level="3"] { background: color-mix(in srgb, #4f7cff 68%, transparent); }
      .dsh-signal-heat-cell[data-level="4"] { background: #4f7cff; }
      .dsh-signal-heat-cell.blank { background: transparent; }
      .dsh-signal-heat-cell.unrecorded {
        box-sizing: border-box;
        border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 12%, transparent);
        background: color-mix(in srgb, var(--dsw-alias-label-primary) 2%, transparent);
        opacity: .92;
      }
      .dsh-signal-heat-cell.outside-range {
        opacity: .52;
      }
      .dsh-signal-heat-cell.unrecorded.outside-range {
        opacity: .72;
      }
      .dsh-signal-heat-cell.interactive[data-in-range="true"][data-level]:not([data-level="0"]) {
        animation: dsh-signal-heat-cell-in 320ms cubic-bezier(.16,1,.3,1) both;
        animation-delay: var(--dsh-signal-cell-delay, 0ms);
      }
      @keyframes dsh-signal-heat-cell-in {
        from { opacity: .12; scale: .55; }
        to { opacity: 1; scale: 1; }
      }
      .dsh-signal-heatmap-months {
        display: grid;
        grid-template-columns: repeat(var(--dsh-signal-weeks), 10px);
        column-gap: 3px;
        width: max-content;
        min-width: 100%;
        min-height: 16px;
        margin-top: 10px;
        color: var(--dsw-alias-label-tertiary);
        font-size: 10px;
        line-height: 16px;
      }
      .dsh-signal-heatmap-month {
        grid-row: 1;
        white-space: nowrap;
      }
      .dsh-signal-heatmap-legend {
        display: flex;
        align-items: center;
        gap: 13px;
        margin-top: 10px;
        color: var(--dsw-alias-label-tertiary);
        font-size: 10px;
        line-height: 16px;
      }
      .dsh-signal-heatmap-legend span {
        display: inline-flex;
        align-items: center;
        gap: 5px;
      }
      .dsh-signal-heatmap-legend i {
        width: 8px;
        height: 8px;
        border-radius: 2px;
        background: color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent);
      }
      .dsh-signal-heatmap-legend .unrecorded i {
        box-sizing: border-box;
        border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 12%, transparent);
        background: transparent;
      }
      .dsh-signal-heatmap-legend .used i { background: #4f7cff; }
      .dsh-signal-heatmap-legend .range i {
        background: color-mix(in srgb, #4f7cff 26%, transparent);
        opacity: .52;
      }
      .dsh-signal-day-detail {
        display: grid;
        grid-template-columns: minmax(126px, .75fr) minmax(190px, 1fr) minmax(230px, 1.25fr);
        gap: 14px;
        align-items: stretch;
        margin-top: 12px;
        padding: 12px;
        border: 1px solid color-mix(in srgb, #4f7cff 18%, var(--dsw-alias-border-l1));
        border-radius: 11px;
        background: color-mix(in srgb, #4f7cff 3%, var(--dsw-alias-bg-layer-1));
      }
      .dsh-signal-day-detail-head {
        display: grid;
        align-content: center;
        gap: 4px;
      }
      .dsh-signal-day-detail-head strong { font-size: 12px; font-weight: 650; }
      .dsh-signal-day-detail-head span,
      .dsh-signal-day-models span {
        color: var(--dsw-alias-label-tertiary);
        font-size: 9px;
      }
      .dsh-signal-day-detail-metrics {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
      }
      .dsh-signal-day-detail-metrics > span {
        display: grid;
        align-content: center;
        gap: 3px;
        color: var(--dsw-alias-label-tertiary);
        font-size: 9px;
      }
      .dsh-signal-day-detail-metrics strong {
        overflow: hidden;
        color: var(--dsw-alias-label-primary);
        font-size: 12px;
        font-variant-numeric: tabular-nums;
        text-overflow: ellipsis;
      }
      .dsh-signal-day-detail-split {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 7px;
      }
      .dsh-signal-day-detail-split > span {
        display: grid;
        grid-template-columns: 3px minmax(0, 1fr);
        grid-template-rows: auto auto;
        gap: 2px 6px;
        align-content: center;
        min-width: 0;
      }
      .dsh-signal-day-detail-split i {
        grid-row: 1 / 3;
        width: 3px;
        min-height: 28px;
        border-radius: 999px;
        background: linear-gradient(to top, #4f7cff var(--dsh-signal-split), color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent) var(--dsh-signal-split));
      }
      .dsh-signal-day-detail-split b,
      .dsh-signal-day-detail-split small {
        overflow: hidden;
        font: inherit;
        font-size: 9px;
        line-height: 1.35;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .dsh-signal-day-detail-split b { color: var(--dsw-alias-label-secondary); font-weight: 600; }
      .dsh-signal-day-detail-split small { color: var(--dsw-alias-label-tertiary); }
      .dsh-signal-day-models {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: 72px minmax(0, 1fr);
        gap: 8px;
        align-items: center;
        padding-top: 9px;
        border-top: 1px solid var(--dsw-alias-border-l1);
      }
      .dsh-signal-day-models strong {
        overflow: hidden;
        font-size: 10px;
        font-weight: 560;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .dsh-signal-weekly-months {
        display: grid;
        grid-template-columns: repeat(var(--dsh-signal-weeks), minmax(7px, 1fr));
        gap: 4px;
        min-height: 16px;
        margin-top: 10px;
        color: var(--dsw-alias-label-tertiary);
        font-size: 10px;
        line-height: 16px;
      }
      .dsh-signal-weekly-chart {
        display: grid;
        grid-template-columns: repeat(var(--dsh-signal-weeks), minmax(7px, 1fr));
        align-items: end;
        gap: 4px;
        height: 132px;
        padding: 8px 0 0;
        border-bottom: 1px solid var(--dsw-alias-border-l1);
      }
      .dsh-signal-weekly-sparse {
        display: grid;
        gap: 7px;
        align-content: center;
        min-height: 132px;
        padding: 0 14px;
        border-bottom: 1px solid var(--dsw-alias-border-l1);
        color: var(--dsw-alias-label-secondary);
      }
      .dsh-signal-weekly-sparse strong { color: var(--dsw-alias-label-primary); font-size: 12px; font-weight: 650; }
      .dsh-signal-weekly-sparse > span:not(.dsh-signal-weekly-sparse-meter) { font-size: 11px; line-height: 1.5; }
      .dsh-signal-weekly-sparse-meter { display: block; height: 5px; overflow: hidden; border-radius: 999px; background: var(--dsw-alias-border-l1); }
      .dsh-signal-weekly-sparse-meter i { display: block; width: 22%; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #4f7cff, #8eb8ff); }
      .dsh-signal-week-bar {
        min-height: 2px;
        height: var(--dsh-signal-bar-height, 0%);
        border-radius: 2px;
        background: #4f7cff;
        transform-origin: center bottom;
        animation: dsh-signal-week-in 420ms cubic-bezier(.16,1,.3,1) both;
        animation-delay: var(--dsh-signal-cell-delay, 0ms);
      }
      .dsh-signal-week-bar.unrecorded {
        height: 2px;
        background: color-mix(in srgb, var(--dsw-alias-label-primary) 6%, transparent);
        animation: none;
      }
      @keyframes dsh-signal-week-in {
        from { opacity: .18; transform: scaleY(.08); }
        to { opacity: 1; transform: scaleY(1); }
      }
      .dsh-signal-cumulative-chart {
        position: relative;
        height: 150px;
      }
      .dsh-signal-cumulative-chart svg {
        display: block;
        width: 100%;
        height: 126px;
        overflow: visible;
      }
      .dsh-signal-cumulative-axis {
        stroke: color-mix(in srgb, var(--dsw-alias-label-primary) 11%, transparent);
        stroke-width: 1;
        vector-effect: non-scaling-stroke;
      }
      .dsh-signal-cumulative-area {
        fill: color-mix(in srgb, #4f7cff 10%, transparent);
      }
      .dsh-signal-cumulative-line {
        fill: none;
        stroke: #4f7cff;
        stroke-width: 2;
        vector-effect: non-scaling-stroke;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 1200;
        stroke-dashoffset: 1200;
        animation: dsh-signal-line-in 700ms cubic-bezier(.16,1,.3,1) forwards;
      }
      .dsh-signal-cumulative-guide {
        stroke: color-mix(in srgb, #4f7cff 34%, transparent);
        stroke-width: 1;
        stroke-dasharray: 3 5;
        vector-effect: non-scaling-stroke;
      }
      .dsh-signal-cumulative-point {
        fill: #4f7cff;
        stroke: var(--dsw-alias-bg-layer-1);
        stroke-width: 3;
        vector-effect: non-scaling-stroke;
      }
      .dsh-signal-cumulative-sparse {
        position: absolute;
        top: 17px;
        left: 0;
        z-index: 1;
        display: grid;
        gap: 3px;
        max-width: min(58%, 320px);
        pointer-events: none;
      }
      .dsh-signal-cumulative-sparse strong {
        color: var(--dsw-alias-label-primary);
        font-size: 11px;
        font-weight: 650;
      }
      .dsh-signal-cumulative-sparse span {
        color: var(--dsw-alias-label-tertiary);
        font-size: 10px;
        line-height: 1.45;
      }
      .dsh-signal-cumulative-end {
        position: absolute;
        z-index: 1;
        padding: 3px 6px;
        border: 1px solid color-mix(in srgb, #4f7cff 28%, var(--dsw-alias-border-l1));
        border-radius: 8px;
        background: var(--dsw-alias-bg-layer-1);
        color: var(--dsw-alias-label-primary);
        font-size: 10px;
        font-weight: 650;
        font-variant-numeric: tabular-nums;
        line-height: 1;
        transform: translate(-100%, -50%);
        white-space: nowrap;
      }
      @keyframes dsh-signal-line-in { to { stroke-dashoffset: 0; } }
      .dsh-signal-cumulative-months {
        display: grid;
        grid-template-columns: repeat(var(--dsh-signal-months), minmax(0, 1fr));
        gap: 4px;
        color: var(--dsw-alias-label-tertiary);
        font-size: 10px;
      }
      .dsh-signal-cumulative-months span { text-align: left; }
      .dsh-signal-cumulative-months span.unrecorded { opacity: .38; }
      .dsh-signal-insights {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 18px;
      }
      .dsh-signal-insight {
        padding-top: 10px;
        border-top: 1px solid var(--dsw-alias-border-l1);
      }
      .dsh-signal-insight span {
        display: block;
        color: var(--dsw-alias-label-tertiary);
        font-size: 10px;
      }
      .dsh-signal-insight strong {
        display: block;
        margin-top: 5px;
        font-size: 14px;
        font-variant-numeric: tabular-nums;
      }
      .dsh-signal-breakdowns {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 28px;
      }
      .dsh-signal-breakdown-list {
        display: flex;
        flex-direction: column;
        gap: 0;
        border-top: 1px solid var(--dsw-alias-border-l1);
      }
      .dsh-signal-breakdown-row {
        display: grid;
        grid-template-columns: 22px minmax(0, 1fr) auto;
        gap: 10px;
        align-items: center;
        min-height: 42px;
        border-bottom: 1px solid var(--dsw-alias-border-l1);
        font-size: 12px;
      }
      .dsh-signal-breakdown-row .dsh-signal-provider-mark,
      .dsh-signal-breakdown-row .dsh-signal-provider-mark svg {
        width: 22px !important;
        height: 22px !important;
      }
      .dsh-signal-breakdown-name {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .dsh-signal-breakdown-value {
        color: var(--dsw-alias-label-secondary);
        font-variant-numeric: tabular-nums;
      }
      .dsh-signal-brand-editor {
        margin-top: 20px;
      }
      .dsh-signal-brand-editor-summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        min-height: 38px;
        padding: 0 2px;
        color: var(--dsw-alias-label-primary);
        cursor: pointer;
        list-style: none;
      }
      .dsh-signal-brand-editor-summary::-webkit-details-marker { display: none; }
      .dsh-signal-brand-editor-summary:focus-visible { outline: 2px solid color-mix(in srgb, #4f7cff 52%, transparent); outline-offset: 3px; border-radius: 7px; }
      .dsh-signal-brand-editor-summary > svg { flex: none; width: 15px; height: 15px; transition: transform 160ms ease; }
      .dsh-signal-brand-editor[open] > .dsh-signal-brand-editor-summary > svg { transform: rotate(180deg); }
      .dsh-signal-brand-editor-summary-copy { display: grid; gap: 3px; min-width: 0; }
      .dsh-signal-brand-editor-summary-copy strong { font-size: 14px; font-weight: 680; }
      .dsh-signal-brand-editor-summary-copy span { overflow: hidden; color: var(--dsw-alias-label-tertiary); font-size: 11px; text-overflow: ellipsis; white-space: nowrap; }
      .dsh-signal-brand-editor-card {
        margin-top: 10px;
        display: grid;
        grid-template-columns: minmax(170px, .72fr) minmax(0, 2fr);
        gap: 16px;
        padding: 14px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 14px;
        background: var(--dsw-alias-bg-layer-1);
      }
      .dsh-signal-brand-preview {
        display: flex;
        align-items: center;
        gap: 11px;
        min-width: 0;
        padding: 12px;
        border: 1px solid color-mix(in srgb, #4f7cff 18%, var(--dsw-alias-border-l1));
        border-radius: 11px;
        background: color-mix(in srgb, #4f7cff 4%, transparent);
      }
      .dsh-signal-brand-preview > div { min-width: 0; }
      .dsh-signal-brand-preview strong,
      .dsh-signal-brand-preview span {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .dsh-signal-brand-preview strong { font-size: 14px; font-weight: 650; }
      .dsh-signal-brand-preview span { margin-top: 4px; color: var(--dsw-alias-label-tertiary); font-size: 12px; }
      .dsh-signal-brand-form {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 10px;
      }
      .dsh-signal-brand-form label { display: grid; gap: 4px; min-width: 0; }
      .dsh-signal-brand-form label > span { color: var(--dsw-alias-label-tertiary); font-size: 12px; }
      .dsh-signal-brand-form input { padding: 0 9px; height: 36px; font-size: 13px; }
      .dsh-signal-brand-form select { padding: 0 25px 0 9px; height: 36px; font-size: 13px; }
      .dsh-signal-brand-actions {
        grid-column: 1 / -1;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        padding-top: 11px;
        border-top: 1px solid var(--dsw-alias-border-l1);
      }
      .dsh-signal-brand-actions > span {
        min-width: 0;
        overflow: hidden;
        color: var(--dsw-alias-label-tertiary);
        font-size: 12px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .dsh-signal-brand-actions button {
        flex: none;
        height: 34px;
        padding: 0 10px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 8px;
        background: transparent;
        color: var(--dsw-alias-label-secondary);
        font: inherit;
        font-size: 12px;
        cursor: pointer;
      }
      .dsh-signal-brand-actions button:first-of-type { margin-left: auto; }
      .dsh-signal-brand-actions button.primary {
        border-color: color-mix(in srgb, #4f7cff 48%, var(--dsw-alias-border-l1));
        background: #315fd8;
        color: #fff;
      }
      .dsh-signal-brand-actions button:not(.primary):hover { background: var(--dsw-alias-interactive-bg-hover); }
      .dsh-signal-brand-actions button:focus-visible {
        outline: 2px solid color-mix(in srgb, #4f7cff 28%, transparent);
        outline-offset: 1px;
      }
      .dsh-signal-brand-actions button:disabled { cursor: default; opacity: .45; }
      .dsh-signal-privacy-note {
        margin: 26px 0 0;
        color: var(--dsw-alias-label-tertiary);
        font-size: 10px;
        line-height: 1.6;
      }

      /* The host settings contract intentionally does not expose an icon
         field.  The small marker below lets Signal replace only its own nav
         rows, keeping the shell's spacing and theme colors intact. */
      button[data-dsh-signal-settings-nav] > svg:first-child,
      button[data-dsh-signal-settings-nav] > .VOzbGW_navIcon,
      button[data-dsh-signal-settings-nav] > svg {
        display: none !important;
      }
      button[data-dsh-signal-settings-nav]::before {
        content: '';
        flex: none;
        width: 16px;
        height: 16px;
        display: inline-block !important;
        background: currentColor;
        -webkit-mask-position: center;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: contain;
        mask-position: center;
        mask-repeat: no-repeat;
        mask-size: contain;
      }
      [data-dsh-signal-settings-nav="usage"]::before {
        -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 19V5'/%3E%3Cpath d='M4 19h16'/%3E%3Cpath d='m7 15 3-3 3 2 6-7'/%3E%3C/svg%3E");
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 19V5'/%3E%3Cpath d='M4 19h16'/%3E%3Cpath d='m7 15 3-3 3 2 6-7'/%3E%3C/svg%3E");
      }
      [data-dsh-signal-settings-nav="connections"]::before {
        -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.9' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='6' cy='6' r='2.5'/%3E%3Ccircle cx='18' cy='6' r='2.5'/%3E%3Ccircle cx='12' cy='18' r='2.5'/%3E%3Cpath d='m8.2 7.4 2.4 7.1M15.8 7.4l-2.4 7.1M8.5 6h7'/%3E%3C/svg%3E");
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.9' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='6' cy='6' r='2.5'/%3E%3Ccircle cx='18' cy='6' r='2.5'/%3E%3Ccircle cx='12' cy='18' r='2.5'/%3E%3Cpath d='m8.2 7.4 2.4 7.1M15.8 7.4l-2.4 7.1M8.5 6h7'/%3E%3C/svg%3E");
      }

      .dsh-signal-explainer {
        display: contents;
      }
      .dsh-signal-explainer-trigger {
        display: grid;
        width: 28px;
        height: 28px;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: 0;
        border-radius: 50%;
        background: transparent;
        color: var(--dsw-alias-label-secondary);
        font: inherit;
        cursor: pointer;
        transition: background-color 160ms ease, color 160ms ease;
      }
      .dsh-signal-explainer-trigger:hover,
      .dsh-signal-explainer-trigger[aria-expanded="true"] {
        background: var(--dsw-alias-interactive-bg-hover);
        color: var(--dsw-alias-label-primary);
      }
      .dsh-signal-explainer-trigger:focus-visible {
        outline: 2px solid color-mix(in srgb, #4f7cff 42%, transparent);
        outline-offset: 1px;
      }
      .dsh-signal-explainer-trigger svg { width: 14px; height: 14px; }
      .dsh-signal-explainer-panel {
        position: fixed;
        top: var(--dsh-signal-panel-top, 64px);
        right: var(--dsh-signal-panel-right, 12px);
        width: min(320px, calc(100vw - 24px));
        max-width: calc(100vw - var(--dsh-sidebar-width, 0px) - 24px);
        max-height: min(70vh, 460px);
        box-sizing: border-box;
        padding: 13px;
        border: 1px solid color-mix(in srgb, var(--dsw-alias-label-primary) 16%, var(--dsw-alias-border-l1));
        border-radius: 14px;
        /* Keep the expanded explainer above the conversation's own stacking
           layers.  The panel is rendered from the header utility slot, while
           the message stream can establish a later stacking context; without
           an explicit layer the chat text was painted over the card and made
           its opaque surface look transparent. */
        /* Keep this above the conversation stream but below the host Settings
           overlay (the host uses z-index: 1000 for that protected surface). */
        z-index: 900 !important;
        background: #fff !important;
        background-color: #fff !important;
        color: var(--dsw-alias-label-primary);
        box-shadow: 0 18px 44px rgba(17, 31, 56, .2), 0 4px 12px rgba(17, 31, 56, .1);
        isolation: isolate;
        opacity: 1 !important;
        filter: none !important;
        backdrop-filter: none !important;
        mix-blend-mode: normal !important;
        pointer-events: auto;
        transform-origin: 92% 0;
        animation: dsh-signal-explainer-in 220ms cubic-bezier(.16,1,.3,1) both;
        overflow: auto;
        overscroll-behavior: contain;
        scrollbar-gutter: stable;
        scrollbar-width: thin;
        scrollbar-color: color-mix(in srgb, var(--dsw-alias-label-tertiary) 72%, transparent) transparent;
      }
      body[data-ds-dark-theme] .dsh-signal-explainer-panel {
        background: #24262c !important;
        background-color: #24262c !important;
      }
      body.dsh-signal-settings-open .dsh-signal-explainer-panel {
        visibility: hidden !important;
        pointer-events: none !important;
      }
      .dsh-signal-explainer-panel::-webkit-scrollbar { width: 8px; }
      .dsh-signal-explainer-panel::-webkit-scrollbar-track { background: transparent; }
      .dsh-signal-explainer-panel::-webkit-scrollbar-thumb { border: 2px solid transparent; border-radius: 8px; background-clip: padding-box; background-color: color-mix(in srgb, var(--dsw-alias-label-tertiary) 72%, transparent); }
      @keyframes dsh-signal-explainer-in {
        from { opacity: .8; transform: translateY(-6px) scale(.98); clip-path: inset(0 round 13px); filter: blur(0); }
        70% { opacity: 1; transform: translateY(0) scale(1); clip-path: inset(0 round 13px); filter: blur(0); }
        to { opacity: 1; transform: translateY(0) scale(1); clip-path: inset(0 round 13px); filter: blur(0); }
      }
      .dsh-signal-explainer-head {
        display: flex;
        align-items: flex-start;
        gap: 9px;
        margin-bottom: 12px;
      }
      .dsh-signal-explainer-head > div { min-width: 0; }
      .dsh-signal-explainer-head strong,
      .dsh-signal-explainer-head span { display: block; }
      .dsh-signal-explainer-head strong { font-size: 14px; font-weight: 650; }
      .dsh-signal-explainer-head span { margin-top: 2px; color: var(--dsw-alias-label-tertiary); font-size: 11px; line-height: 1.45; }
      .dsh-signal-explainer-close {
        display: inline-flex;
        flex: none;
        width: 24px;
        height: 24px;
        align-items: center;
        justify-content: center;
        margin-left: auto;
        padding: 0;
        border: 0;
        border-radius: 7px;
        background: transparent;
        color: var(--dsw-alias-label-tertiary);
        cursor: pointer;
      }
      .dsh-signal-explainer-close:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
      .dsh-signal-explainer-close:focus-visible { outline: 2px solid color-mix(in srgb, #4f7cff 30%, transparent); outline-offset: 1px; }
      .dsh-signal-explainer-current {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;
        padding: 8px 9px;
        border: 1px solid color-mix(in srgb, #4f7cff 24%, var(--dsw-alias-border-l1));
        border-radius: 9px;
        background: color-mix(in srgb, #4f7cff 7%, transparent);
      }
      .dsh-signal-explainer-current > div { min-width: 0; }
      .dsh-signal-explainer-current strong,
      .dsh-signal-explainer-current span { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .dsh-signal-explainer-current strong { font-size: 12px; font-weight: 650; }
      .dsh-signal-explainer-current span { margin-top: 2px; color: var(--dsw-alias-label-secondary); font-size: 11px; }
      .dsh-signal-explainer-current .dsh-signal-explainer-tool { margin-top: 3px; color: var(--dsw-alias-label-tertiary); font-size: 10px; }
      .dsh-signal-explainer-dot {
        flex: none;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #4f7cff;
        box-shadow: 0 0 0 4px color-mix(in srgb, #4f7cff 14%, transparent);
      }
      .dsh-signal-explainer-dot.done { background: #51a56a; box-shadow: 0 0 0 4px color-mix(in srgb, #51a56a 14%, transparent); }
      .dsh-signal-explainer-dot.error { background: var(--dsw-alias-state-error-primary); box-shadow: 0 0 0 4px color-mix(in srgb, var(--dsw-alias-state-error-primary) 14%, transparent); }
      .dsh-signal-explainer-steps { display: flex; flex-direction: column; gap: 1px; }
      .dsh-signal-explainer-step {
        display: grid;
        grid-template-columns: 20px minmax(0, 1fr);
        gap: 8px;
        align-items: center;
        min-height: 39px;
        padding: 6px 7px;
        border-radius: 7px;
        color: var(--dsw-alias-label-tertiary);
        font-size: 12px;
      }
      .dsh-signal-explainer-step.active { background: color-mix(in srgb, #4f7cff 8%, transparent); color: var(--dsw-alias-label-primary); }
      .dsh-signal-explainer-step.done { color: var(--dsw-alias-label-secondary); }
      .dsh-signal-explainer-step-mark {
        display: inline-flex;
        width: 17px;
        height: 17px;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 50%;
        color: inherit;
        font-size: 9px;
        font-variant-numeric: tabular-nums;
      }
      .dsh-signal-explainer-step-copy { min-width: 0; }
      .dsh-signal-explainer-step-copy > span, .dsh-signal-explainer-step-copy > small { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .dsh-signal-explainer-step-copy > span { color: inherit; font-size: 12px; }
      .dsh-signal-explainer-step-copy > small { margin-top: 2px; color: var(--dsw-alias-label-tertiary); font-size: 10px; line-height: 1.4; }
      .dsh-signal-explainer-step.active .dsh-signal-explainer-step-copy > small { color: var(--dsw-alias-label-secondary); }
      .dsh-signal-explainer-step.active .dsh-signal-explainer-step-mark { border-color: color-mix(in srgb, #4f7cff 64%, var(--dsw-alias-border-l1)); color: #4f7cff; }
      .dsh-signal-explainer-step.done .dsh-signal-explainer-step-mark { border-color: color-mix(in srgb, #51a56a 48%, var(--dsw-alias-border-l1)); color: #51a56a; }
      .dsh-signal-explainer-meta { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; margin-top: 10px; }
      .dsh-signal-explainer-meta-item { min-width: 0; padding: 7px 8px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px; background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 72%, transparent); }
      .dsh-signal-explainer-meta-item span, .dsh-signal-explainer-meta-item strong { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .dsh-signal-explainer-meta-item span { color: var(--dsw-alias-label-tertiary); font-size: 10px; }
      .dsh-signal-explainer-meta-item strong { margin-top: 3px; color: var(--dsw-alias-label-secondary); font-size: 12px; font-weight: 650; }
      .dsh-signal-explainer-next { margin-top: 9px; padding: 8px 9px 8px 10px; border-radius: 0 8px 8px 0; background: color-mix(in srgb, #4f7cff 6%, transparent); box-shadow: inset 2px 0 0 #4f7cff; color: var(--dsw-alias-label-secondary); font-size: 11px; line-height: 1.45; }
      .dsh-signal-explainer-next strong { display: block; margin-bottom: 2px; color: var(--dsw-alias-label-primary); font-size: 11px; }
      .dsh-signal-explainer-foot { margin-top: 11px; padding-top: 9px; border-top: 1px solid var(--dsw-alias-border-l1); color: var(--dsw-alias-label-tertiary); font-size: 11px; }

      /* Edge light inspired by Border Beam and Glowing Effect. Original CSS,
         no copied component dependency; solid surfaces stay readable. */
      @property --signal-card-angle { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
      @keyframes signal-card-orbit { to { --signal-card-angle: 360deg; } }
      .dsh-signal-brand-editor-card, .dsh-signal-day-detail, .dsh-signal-kpis { position: relative; isolation: isolate; }
      :is(.dsh-signal-popover, .dsh-signal-explainer-panel, .dsh-signal-brand-editor-card, .dsh-signal-day-detail, .dsh-signal-kpis)::before {
        content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none; border-radius: inherit; padding: 1px;
        background: conic-gradient(from var(--signal-card-angle), transparent 0deg 240deg, #4f7cff 290deg, #8eb8ff 310deg, transparent 330deg), radial-gradient(190px circle at var(--signal-light-x, 50%) var(--signal-light-y, 0px), #8eb8ff, transparent 80%);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor; mask-composite: exclude;
        opacity: .24; transition: opacity 180ms ease; animation: signal-card-orbit 8s linear infinite; animation-play-state: paused;
      }
      :is(.dsh-signal-popover, .dsh-signal-explainer-panel, .dsh-signal-brand-editor-card, .dsh-signal-day-detail, .dsh-signal-kpis):is([data-signal-pointer], :focus-within)::before { opacity: .9; animation-play-state: running; }
      .dsh-signal-dock > .dsh-signal-rail {
        border: 1px solid transparent; border-radius: 999px;
        background: linear-gradient(var(--dsh-signal-rail-surface), var(--dsh-signal-rail-surface)) padding-box, conic-gradient(from var(--dsh-signal-rail-angle), rgba(79,124,255,.16) 0deg 220deg, #4f7cff 280deg, #8eb8ff 300deg, rgba(79,124,255,.16) 330deg) border-box;
      }
      .dsh-signal-popover { background: light-dark(#fff, #24262c); box-shadow: 0 16px 40px light-dark(rgba(17,31,56,.16), rgba(0,0,0,.4)); }
      .dsh-signal-brand-editor-card, .dsh-signal-day-detail { background: light-dark(#fff, #24262c); }
      .dsh-signal-popover-head { padding-bottom: 12px; border-bottom: 1px solid var(--dsw-alias-border-l1); }
      .dsh-signal-reset { font-size: 11px; line-height: 1.5; }
      .dsh-signal-window-row { row-gap: 10px; }
      .dsh-signal-track, .dsh-signal-quota-track { height: 5px; }
      .dsh-signal-explainer-step-copy > small { white-space: normal; font-size: 12px; line-height: 1.5; }
      .dsh-signal-explainer-current span, .dsh-signal-explainer-next, .dsh-signal-explainer-foot { font-size: 12px; line-height: 1.55; }
      .dsh-signal-kpi { transition: background-color 160ms ease; }
      .dsh-signal-kpi:hover { background: color-mix(in srgb, #4f7cff 5%, transparent); }
      body.dsh-signal-motion-paused .dsh-signal-rail,
      body.dsh-signal-motion-paused :is(.dsh-signal-popover, .dsh-signal-explainer-panel, .dsh-signal-brand-editor-card, .dsh-signal-day-detail, .dsh-signal-kpis)::before { animation-play-state: paused !important; }
      @media (prefers-reduced-motion: reduce) {
        :is(.dsh-signal-popover, .dsh-signal-explainer-panel, .dsh-signal-brand-editor-card, .dsh-signal-day-detail, .dsh-signal-kpis)::before { animation: none !important; transition: none; background: linear-gradient(120deg, transparent, #4f7cff, transparent); opacity: .3; }
      }

      @media (max-width: 720px) {
        .dsh-signal-field { width: calc(100vw - 32px); height: min(340px, calc(100vh - 240px)); transform: translate(-50%, -28%); }
        .dsh-signal-hero { grid-template-columns: 38px auto auto !important; column-gap: 9px !important; }
        .dsh-signal-hero-mark, .dsh-signal-mark { width: 38px !important; height: 38px !important; }
        .dsh-signal-whale { width: 38px !important; height: 38px !important; }
        .dsh-signal-hero-title { font-size: 29px !important; }
        .dsh-signal-identity { max-width: 128px; }
        .dsh-signal-plan, .dsh-signal-identity-separator { display: none; }
        .dsh-signal-quota-track { min-width: 44px; }
        .dsh-signal-resource { max-width: 36%; }
        .dsh-signal-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .dsh-signal-kpi { border-bottom: 1px solid var(--dsw-alias-border-l1); }
        .dsh-signal-kpi:nth-child(2n) { border-right: 0; }
        .dsh-signal-kpi:nth-last-child(-n + 2) { border-bottom: 0; }
        .dsh-signal-insights { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .dsh-signal-breakdowns { grid-template-columns: 1fr; gap: 20px; }
        .dsh-signal-filters { flex-wrap: wrap; align-items: stretch; }
        .dsh-signal-range-filter { width: 100%; }
        .dsh-signal-range-filter button { flex: 1; }
        .dsh-signal-day-detail { grid-template-columns: 1fr 1fr; }
        .dsh-signal-day-detail-split { grid-column: 1 / -1; }
        .dsh-signal-brand-editor-card { grid-template-columns: 1fr; }
        .dsh-signal-brand-form { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .dsh-signal-explainer-panel { right: 12px; max-width: calc(100vw - 24px); }
      }
      @media (prefers-reduced-motion: reduce) {
        .dsh-signal-hero.dsh-signal-revealing .dsh-signal-hero-mark,
        .dsh-signal-hero.dsh-signal-revealing .dsh-signal-hero-title,
        .dsh-signal-hero.dsh-signal-revealing .dsh-signal-hero-badge,
        .dsh-signal-status-dot.loading,
        .dsh-signal-popover {
          animation: none !important;
        }
        .dsh-signal-wordmark-fx { display: none !important; }
        .dsh-signal-rail { animation: none !important; }
        .dsh-signal-chevron,
        .dsh-signal-rail,
        .dsh-signal-quota-fill { transition: none !important; }
        .dsh-signal-identity,
        .dsh-signal-activity-view,
        .dsh-signal-heat-cell,
        .dsh-signal-week-bar,
        .dsh-signal-window-row,
        .dsh-signal-cumulative-line { animation: none !important; }
        .dsh-signal-explainer-panel { animation: none !important; }
        .dsh-signal-explainer-trigger { transition: none !important; }
      }
    `

    function installStyles() {
      // DSH may dispose a client context during theme changes before its registered slots unmount.
      // Keep one page-scoped stylesheet alive; a full page reload naturally clears it on uninstall.
      let style = document.querySelector('style[data-dsh-signal="styles"]')
      if (style === null) {
        style = document.createElement('style')
        style.dataset.dshSignal = 'styles'
        document.head.append(style)
      }
      style.textContent = CSS
    }

    function installSignalSettingsNavIcons(ctx) {
      installSignalCardMotion(ctx)
      let disposed = false
      let queued = false
      const labels = new Map([
        ['Signal 用量', 'usage'],
        ['Signal 外观', 'connections'],
      ])
      const update = () => {
        queued = false
        if (disposed) return
        for (const button of document.querySelectorAll('[role="dialog"] button')) {
          const label = button.textContent?.trim() ?? ''
          const kind = labels.get(label)
          if (kind === undefined) {
            if (button.hasAttribute('data-dsh-signal-settings-nav')) button.removeAttribute('data-dsh-signal-settings-nav')
          } else {
            button.setAttribute('data-dsh-signal-settings-nav', kind)
          }
        }
      }
      const schedule = () => {
        if (queued || disposed) return
        queued = true
        queueMicrotask(update)
      }
      const observer = new MutationObserver(schedule)
      observer.observe(document.body, { childList: true, subtree: true, characterData: true })
      update()
      ctx.effect(() => () => {
        disposed = true
        observer.disconnect()
        for (const button of document.querySelectorAll('[data-dsh-signal-settings-nav]')) button.removeAttribute('data-dsh-signal-settings-nav')
      }, 'dsh-signal: settings nav icons')
    }

    function installSettingsLayerGuard(ctx) {
      let disposed = false
      let queued = false
      let composerSeat = null
      let wasOpen = false
      let settingsTrigger = null

      const isSettingsDialog = dialog => {
        const labels = new Set([...dialog.querySelectorAll('button')]
          .map(button => button.textContent?.trim() ?? ''))
        return labels.has('通用设置') && labels.has('插件') && (labels.has('Signal 用量') || labels.has('Signal 外观'))
      }

      const findComposerSeat = () => {
        const dock = document.querySelector('[data-dsh-signal-dock]')
        let node = dock?.parentElement ?? null
        let semanticSeat = null
        while (node && node !== document.body) {
          const style = getComputedStyle(node)
          const rect = node.getBoundingClientRect()
          if (
            semanticSeat === null &&
            rect.width > 0 &&
            rect.height > 0 &&
            node.querySelector('textarea, input, [contenteditable="true"], [role="textbox"]')
          ) semanticSeat = node
          if (style.position === 'sticky' || style.position === 'fixed') return node
          node = node.parentElement
        }
        return semanticSeat
      }

      const findSettingsTrigger = () => [...document.querySelectorAll('button')].find(button =>
        button.textContent?.trim() === '设置' && button.closest('[role="dialog"]') === null) ?? null

      const update = () => {
        queued = false
        if (disposed) return
        const nextSeat = findComposerSeat()
        if (nextSeat !== composerSeat) {
          composerSeat?.removeAttribute('data-dsh-signal-composer-seat')
          composerSeat = nextSeat
          composerSeat?.setAttribute('data-dsh-signal-composer-seat', '')
        }
        const open = [...document.querySelectorAll('[role="dialog"]')].some(isSettingsDialog)
        if (open && !wasOpen) settingsTrigger = findSettingsTrigger()
        if (open) closeSignalOverlays()
        document.body.classList.toggle('dsh-signal-settings-open', open)
        if (!open && wasOpen) {
          const target = settingsTrigger
          settingsTrigger = null
          if (target?.isConnected) window.requestAnimationFrame(() => target.focus({ preventScroll: true }))
        }
        wasOpen = open
      }

      const schedule = () => {
        if (queued || disposed) return
        queued = true
        queueMicrotask(update)
      }

      const observer = new MutationObserver(schedule)
      observer.observe(document.body, { childList: true, subtree: true })
      update()
      ctx.effect(() => () => {
        disposed = true
        observer.disconnect()
        composerSeat?.removeAttribute('data-dsh-signal-composer-seat')
        document.body.classList.remove('dsh-signal-settings-open')
      }, 'dsh-signal: settings layer guard')
    }

    function installSignalCardMotion(ctx) {
      const selector = '.dsh-signal-popover, .dsh-signal-explainer-panel, .dsh-signal-brand-editor-card, .dsh-signal-day-detail, .dsh-signal-kpis'
      const reduced = matchMedia('(prefers-reduced-motion: reduce)')
      let active = null, rect = null, frame = 0, point = null
      const reset = () => {
        if (frame) cancelAnimationFrame(frame)
        frame = 0
        active?.removeAttribute('data-signal-pointer')
        active = null
        rect = null
      }
      const paint = () => {
        frame = 0
        if (!active?.isConnected || !point || !rect) return
        active.style.setProperty('--signal-light-x', `${point.x - rect.left}px`)
        active.style.setProperty('--signal-light-y', `${point.y - rect.top}px`)
      }
      const move = event => {
        if (reduced.matches || document.hidden || event.pointerType === 'touch') return
        const next = event.target instanceof Element ? event.target.closest(selector) : null
        if (next !== active) {
          reset()
          active = next
          if (active) { rect = active.getBoundingClientRect(); active.setAttribute('data-signal-pointer', '') }
        }
        if (!active) return
        point = { x: event.clientX, y: event.clientY }
        if (!frame) frame = requestAnimationFrame(paint)
      }
      const visibility = () => {
        document.body.classList.toggle('dsh-signal-motion-paused', document.hidden)
        if (document.hidden) reset()
      }
      document.addEventListener('pointermove', move, { passive: true })
      document.addEventListener('visibilitychange', visibility)
      document.addEventListener('scroll', reset, { passive: true, capture: true })
      window.addEventListener('resize', reset, { passive: true })
      window.addEventListener('blur', reset)
      reduced.addEventListener('change', reset)
      visibility()
      ctx.effect(() => () => {
        reset()
        document.removeEventListener('pointermove', move)
        document.removeEventListener('visibilitychange', visibility)
        document.removeEventListener('scroll', reset, true)
        window.removeEventListener('resize', reset)
        window.removeEventListener('blur', reset)
        reduced.removeEventListener('change', reset)
        document.body.classList.remove('dsh-signal-motion-paused')
      }, 'dsh-signal: bounded card light')
    }

    function makeStore(initial) {
      let snapshot = initial
      const listeners = new Set()
      return {
        getSnapshot: () => snapshot,
        subscribe(fn) {
          listeners.add(fn)
          return () => listeners.delete(fn)
        },
        set(next) {
          snapshot = next
          for (const listener of listeners) listener()
        },
      }
    }

    // All Signal-owned popovers share one active surface.  This keeps the
    // resource details, work explainer, and Settings dialog from competing for
    // focus or leaving two document-level Escape handlers active at once.
    const signalOverlayOwners = new Map()
    function claimSignalOverlay(kind, close) {
      for (const [otherKind, otherClose] of signalOverlayOwners) {
        if (otherKind === kind) continue
        signalOverlayOwners.delete(otherKind)
        try { otherClose() } catch { /* the owner is already unmounting */ }
      }
      signalOverlayOwners.set(kind, close)
      return () => {
        if (signalOverlayOwners.get(kind) === close) signalOverlayOwners.delete(kind)
      }
    }
    function closeSignalOverlays() {
      const owners = [...signalOverlayOwners.values()]
      signalOverlayOwners.clear()
      for (const close of owners) {
        try { close() } catch { /* the owner is already unmounting */ }
      }
    }

    const BRAND_OVERRIDES_KEY = 'dsh-signal.provider-overrides.v1'
    const PROVIDER_ICON_IDS = ['custom', 'deepseek', 'openai', 'anthropic', 'google', 'alibaba', 'zhipuai', 'kimi', 'opencode', 'mistral', 'openrouter', 'siliconflow', 'groq']

    function normalizeProviderOverride(value) {
      if (value === null || typeof value !== 'object' || Array.isArray(value)) return null
      const brand = typeof value.brand === 'string' ? value.brand.trim().slice(0, 48) : ''
      const plan = typeof value.plan === 'string' ? value.plan.trim().slice(0, 64) : ''
      const icon = PROVIDER_ICON_IDS.includes(value.icon) ? value.icon : 'custom'
      return brand.length > 0 || plan.length > 0 || icon !== 'custom' ? { brand, plan, icon } : null
    }

    function loadProviderOverrides() {
      try {
        const parsed = JSON.parse(window.localStorage.getItem(BRAND_OVERRIDES_KEY) ?? '{}')
        if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
        return Object.fromEntries(Object.entries(parsed).flatMap(([id, value]) => {
          const key = String(id).trim().toLowerCase()
          const normalized = normalizeProviderOverride(value)
          return key.length > 0 && normalized !== null ? [[key, normalized]] : []
        }))
      } catch {
        return {}
      }
    }

    const providerOverrides = makeStore(loadProviderOverrides())

    function persistProviderOverrides(next) {
      try {
        window.localStorage.setItem(BRAND_OVERRIDES_KEY, JSON.stringify(next))
      } catch {
        return false
      }
      providerOverrides.set(next)
      return true
    }

    function saveProviderOverride(providerId, value) {
      const id = String(providerId ?? '').trim().toLowerCase()
      if (id.length === 0) return false
      const normalized = normalizeProviderOverride(value)
      const next = { ...providerOverrides.getSnapshot() }
      if (normalized === null) delete next[id]
      else next[id] = normalized
      return persistProviderOverrides(next)
    }

    function removeProviderOverride(providerId) {
      const id = String(providerId ?? '').trim().toLowerCase()
      if (id.length === 0) return
      const next = { ...providerOverrides.getSnapshot() }
      delete next[id]
      return persistProviderOverrides(next)
    }

    function useMinuteClock(enabled = true) {
      const [value, setValue] = useState(() => Date.now())
      useEffect(() => {
        if (!enabled) return undefined
        setValue(Date.now())
        let interval = 0
        const tick = () => setValue(Date.now())
        const timeout = window.setTimeout(() => {
          tick()
          interval = window.setInterval(tick, 60_000)
        }, 60_000 - (Date.now() % 60_000) + 25)
        return () => {
          window.clearTimeout(timeout)
          if (interval !== 0) window.clearInterval(interval)
        }
      }, [enabled])
      return value
    }

    function parseObject(value, label) {
      if (value === null || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} 必须是对象`)
      return value
    }

    const stateCodec = { parse: value => parseObject(value, 'resource state') }
    const analyticsCodec = { parse: value => parseObject(value, 'usage analytics') }
    const sourceCodec = {
      parse(value) {
        if (!['deepseek', 'opencode', 'openrouter', 'moonshot', 'moonshot-cn', 'siliconflow', 'all'].includes(value)) throw new Error('未知资源源')
        return value
      },
    }
    const CONTRIBUTION = {
      package: 'dsh-signal',
      descriptors: [
        {
          id: 'dsh-signal#signalResource/getState',
          service: 'signalResource',
          namespace: 'signalResource',
          method: 'getState',
          invocation: { kind: 'direct' },
          parameters: [],
          result: { mode: 'strict', typeSymbol: 'dsh-signal#ResourceState', schema: stateCodec },
        },
        {
          id: 'dsh-signal#signalResource/refreshSource',
          service: 'signalResource',
          namespace: 'signalResource',
          method: 'refreshSource',
          invocation: { kind: 'direct' },
          parameters: [
            { name: 'source', wire: 'source', source: 'json', codec: { mode: 'strict', typeSymbol: 'dsh-signal#ResourceSource', schema: sourceCodec } },
          ],
          result: { mode: 'strict', typeSymbol: 'dsh-signal#ResourceState', schema: stateCodec },
        },
        {
          id: 'dsh-signal#signalResource/getAnalytics',
          service: 'signalResource',
          namespace: 'signalResource',
          method: 'getAnalytics',
          invocation: { kind: 'direct' },
          parameters: [],
          result: { mode: 'strict', typeSymbol: 'dsh-signal#UsageAnalytics', schema: analyticsCodec },
        },
        {
          id: 'dsh-signal#signalResource/refreshAnalytics',
          service: 'signalResource',
          namespace: 'signalResource',
          method: 'refreshAnalytics',
          invocation: { kind: 'direct' },
          parameters: [],
          result: { mode: 'strict', typeSymbol: 'dsh-signal#UsageAnalytics', schema: analyticsCodec },
        },
      ],
    }

    function parseRgb(value) {
      const match = /rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)/i.exec(value)
      return match === null ? [35, 42, 57] : [Number(match[1]), Number(match[2]), Number(match[3])]
    }

    function seeded(x, y) {
      const value = Math.sin(x * 91.173 + y * 47.713) * 43758.5453
      return value - Math.floor(value)
    }

    function clamp(value, minimum, maximum) {
      return Math.max(minimum, Math.min(maximum, value))
    }

    function setupSignalField(canvas, headline, wordmarkTarget, onFrame = () => {}) {
      const context = canvas.getContext('2d', { alpha: true })
      if (context === null) return { stop() {}, pulse() {}, resume() {} }
      canvas.setAttribute('aria-hidden', 'true')
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
      const fine = window.matchMedia('(pointer: fine)')
      const startedAt = performance.now()
      let frame = 0
      let width = 0
      let height = 0
      let points = []
      let neutral = [35, 42, 57]
      let lightTheme = false
      let targetX = 0
      let targetY = 0
      let offsetX = 0
      let offsetY = 0
      let velocityX = 0
      let velocityY = 0
      let pointerX = 0
      let pointerY = 0
      let localTarget = 0
      let localStrength = 0
      let pulseStartedAt = -Infinity
      let disposed = false
      let intersecting = true
      let scheduled = false
      let lastPaint = 0

      const refreshPalette = () => {
        const label = parseRgb(getComputedStyle(wordmarkTarget).color)
        lightTheme = (label[0] + label[1] + label[2]) / 3 < 128
        neutral = lightTheme ? [112, 121, 136] : label
      }

      const resize = () => {
        const rect = canvas.getBoundingClientRect()
        width = Math.max(1, rect.width)
        height = Math.max(1, rect.height)
        const dpr = Math.min(2, window.devicePixelRatio || 1)
        canvas.width = Math.round(width * dpr)
        canvas.height = Math.round(height * dpr)
        context.setTransform(dpr, 0, 0, dpr, 0, 0)
        refreshPalette()
        const pitch = width < 560 ? 14.2 : 14.8
        const next = []
        let row = 0
        for (let y = -pitch; y <= height + pitch; y += pitch) {
          let column = 0
          for (let x = -pitch; x <= width + pitch; x += pitch) {
            const noise = seeded(column, row)
            next.push({
              x: x + (row % 2) * .55,
              y,
              noise,
              phase: noise * Math.PI * 2,
              depth: .36 + seeded(column + 17, row + 31) * .64,
              residual: noise > .982,
            })
            column += 1
          }
          row += 1
        }
        points = next
      }

      const onPointer = event => {
        if (reduce.matches || !fine.matches || event.pointerType === 'touch') {
          targetX = 0
          targetY = 0
          localTarget = 0
          return
        }
        const rect = canvas.getBoundingClientRect()
        const near = event.clientX >= rect.left - 90 && event.clientX <= rect.right + 90
          && event.clientY >= rect.top - 80 && event.clientY <= rect.bottom + 80
        if (!near) {
          targetX = 0
          targetY = 0
          localTarget = 0
          return
        }
        const nx = Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)))
        const ny = Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)))
        targetX = nx * 6
        targetY = ny * 4.2
        pointerX = event.clientX - rect.left
        pointerY = event.clientY - rect.top
        const wordmarkRect = wordmarkTarget.getBoundingClientRect()
        const overWordmark = event.clientX >= wordmarkRect.left - 30 && event.clientX <= wordmarkRect.right + 30
          && event.clientY >= wordmarkRect.top - 28 && event.clientY <= wordmarkRect.bottom + 28
        const overField = event.clientX >= rect.left && event.clientX <= rect.right
          && event.clientY >= rect.top && event.clientY <= rect.bottom
        localTarget = overWordmark ? 1 : overField ? .42 : 0
      }

      const rest = () => {
        targetX = 0
        targetY = 0
        localTarget = 0
      }

      const pulse = (clientX, clientY) => {
        if (reduce.matches || !fine.matches) return
        const rect = canvas.getBoundingClientRect()
        pointerX = clientX - rect.left
        pointerY = clientY - rect.top
        localTarget = 1
        pulseStartedAt = performance.now()
        schedule()
      }

      const shouldAnimate = () => !disposed && !reduce.matches && intersecting && !document.hidden

      const schedule = () => {
        if (!shouldAnimate() || scheduled) return
        scheduled = true
        frame = requestAnimationFrame(draw)
      }

      const scheduleStatic = () => {
        if (disposed || scheduled) return
        scheduled = true
        frame = requestAnimationFrame(timestamp => draw(timestamp + 2000))
      }

      const draw = timestamp => {
        scheduled = false
        if (disposed) return
        onFrame(timestamp)
        const revealActive = timestamp - startedAt < 1_450
        const interactive = localTarget !== 0 || localStrength > .02 || pulseAliveAt(timestamp)
        if (!reduce.matches && !interactive && !revealActive && lastPaint > 0 && timestamp - lastPaint < 1_000 / 30) {
          schedule()
          return
        }
        lastPaint = timestamp
        context.clearRect(0, 0, width, height)
        const elapsed = timestamp - startedAt
        const reveal = reduce.matches ? 1 : Math.max(0, Math.min(1, (elapsed - 110) / 1220))
        const wave = -60 + reveal * (width + 120)
        const pulseProgress = Math.max(0, Math.min(1, (timestamp - pulseStartedAt) / 980))
        const pulseAlive = timestamp - pulseStartedAt >= 0 && timestamp - pulseStartedAt < 980

        if (reduce.matches || !fine.matches) {
          offsetX = 0
          offsetY = 0
          velocityX = 0
          velocityY = 0
        } else {
          velocityX = (velocityX + (targetX - offsetX) * .034) * .86
          velocityY = (velocityY + (targetY - offsetY) * .034) * .86
          offsetX += velocityX
          offsetY += velocityY
        }
        localStrength += (localTarget - localStrength) * (localTarget > localStrength ? .24 : .07)

        for (const point of points) {
          const nx = Math.abs((point.x - width / 2) / (width / 2))
          const ny = Math.abs((point.y - height / 2) / (height / 2))
          const edge = Math.max(0, 1 - Math.pow(nx, 1.7)) * Math.max(0, 1 - Math.pow(ny, 1.45))
          if (edge <= .015) continue
          const distance = Math.abs(point.x - wave)
          const acquisition = reveal < 1 ? Math.max(0, 1 - distance / 54) : 0
          const trail = reveal < 1 && point.x < wave ? Math.max(0, 1 - (wave - point.x) / 155) : 0
          const dx = point.x - pointerX
          const dy = point.y - pointerY
          const localDistance = Math.max(.01, Math.hypot(dx, dy))
          const proximity = Math.max(0, 1 - localDistance / 206) * localStrength
          const shockRadius = pulseProgress * 176
          const shock = pulseAlive ? Math.max(0, 1 - Math.abs(localDistance - shockRadius) / 36) * (1 - pulseProgress * .35) : 0
          const depthResponse = .72 + point.depth * .38
          const surfaceRipple = (Math.sin(localDistance / 15.5 - timestamp / 190 + point.phase * .14)
            + Math.sin(localDistance / 31 + timestamp / 430 - point.phase * .2) * .34) * proximity
          const pulseRipple = Math.sin((localDistance - shockRadius) / 10.5) * shock
          const displacement = (surfaceRipple * 8.1 + pulseRipple * 9.2) * depthResponse
          const jitter = (acquisition + shock * .45) * (point.noise - .5) * 4.2
          const crest = Math.max(0, surfaceRipple) + Math.max(0, pulseRipple)
          const alpha = Math.min(.92, edge * ((lightTheme ? .2 : .13) + point.noise * (lightTheme ? .13 : .11) + point.depth * .025 + acquisition * .34 + trail * .085 + Math.abs(surfaceRipple) * .48 + shock * .42))
          const blue = acquisition > .12 || crest > .12 || shock > .06 || (point.residual && edge > .24)
          const radius = .9 + point.noise * .62 + point.depth * .13 + acquisition * .56 + crest * .78 + shock * .46
          const currentX = reduce.matches ? 0 : (Math.sin(timestamp / (3500 - point.depth * 740) + point.phase) * .28 + Math.cos(timestamp / 5100 + point.phase * .7) * .12) * point.depth
          const currentY = reduce.matches ? 0 : (Math.cos(timestamp / (4100 - point.depth * 620) + point.phase * .8) * .22 + Math.sin(timestamp / 5700 - point.phase) * .09) * point.depth
          const x = point.x + offsetX * depthResponse + currentX + jitter + (dx / localDistance) * displacement * .78
          const y = point.y + offsetY * depthResponse + currentY + Math.sin(point.phase + timestamp / 680) * acquisition * 2.2
            + (dy / localDistance) * displacement * .46 + surfaceRipple * 1.45
          context.beginPath()
          context.arc(x, y, radius, 0, Math.PI * 2)
          context.fillStyle = blue
            ? `rgba(79,124,255,${Math.max(.08, alpha)})`
            : `rgba(${neutral[0]},${neutral[1]},${neutral[2]},${alpha})`
          context.fill()
        }
        schedule()
      }

      const pulseAliveAt = timestamp => timestamp - pulseStartedAt >= 0 && timestamp - pulseStartedAt < 980

      const paintNow = () => {
        if (disposed) return
        if (scheduled) cancelAnimationFrame(frame)
        scheduled = false
        draw(performance.now() + (reduce.matches ? 2000 : 0))
      }

      const observer = new ResizeObserver(() => {
        resize()
        if (reduce.matches) scheduleStatic()
        else schedule()
      })
      observer.observe(canvas)
      const themeObserver = new MutationObserver(refreshPalette)
      const themeWatch = { attributes: true, attributeFilter: ['style', 'class', 'data-theme'] }
      themeObserver.observe(document.documentElement, themeWatch)
      themeObserver.observe(document.body, themeWatch)
      // The field owns its pointer region.  Listening on window made every
      // mouse move in the application run geometry work even when the Hero was
      // nowhere near the pointer.
      headline.addEventListener('pointerenter', onPointer, { passive: true })
      headline.addEventListener('pointermove', onPointer, { passive: true })
      headline.addEventListener('pointerleave', rest)
      window.addEventListener('blur', rest)
      const onVisibility = () => {
        if (document.hidden) {
          rest()
          if (scheduled) cancelAnimationFrame(frame)
          scheduled = false
          return
        }
        if (reduce.matches) scheduleStatic()
        else schedule()
      }
      const intersectionObserver = typeof IntersectionObserver === 'function'
        ? new IntersectionObserver(entries => {
          intersecting = entries.some(entry => entry.isIntersecting)
          if (!intersecting && scheduled) cancelAnimationFrame(frame)
          scheduled = false
          if (intersecting) schedule()
        }, { rootMargin: '120px' })
        : null
      intersectionObserver?.observe(canvas)
      document.addEventListener('visibilitychange', onVisibility)
      resize()
      paintNow()

      return {
        pulse,
        resume() {
          if (disposed) return
          intersecting = true
          resize()
          paintNow()
        },
        stop() {
          disposed = true
          cancelAnimationFrame(frame)
          scheduled = false
          observer.disconnect()
          themeObserver.disconnect()
          intersectionObserver?.disconnect()
          headline.removeEventListener('pointerenter', onPointer)
          headline.removeEventListener('pointermove', onPointer)
          headline.removeEventListener('pointerleave', rest)
          window.removeEventListener('blur', rest)
          document.removeEventListener('visibilitychange', onVisibility)
        },
      }
    }

    function setupWordmarkTracker(headline, title, getFxRect, reduce) {
      const finePointer = window.matchMedia('(pointer: fine)').matches
      let disposed = false
      let hovering = false
      let initialized = false
      let lastFrame = 0
      let lastPointerAt = 0
      let lastPointerX = 0
      let lastPointerY = 0
      let targetX = 0
      let targetY = 0
      let currentX = 0
      let currentY = 0
      let targetVelocityX = 0
      let targetVelocityY = 0
      let velocityX = 0
      let velocityY = 0
      let intensity = 0

      const setVariable = (name, value) => headline.style.setProperty(name, value)
      const exposeState = state => {
        headline.classList.add('dsh-signal-wordmark-live')
        headline.dataset.dshSignalWordmarkLive = 'true'
        headline.dataset.dshSignalWordmarkState = state
        title.dataset.dshSignalTitleActive = 'true'
      }
      const clearState = () => {
        headline.classList.remove('dsh-signal-wordmark-live')
        delete headline.dataset.dshSignalWordmarkLive
        delete headline.dataset.dshSignalWordmarkState
        delete title.dataset.dshSignalTitleActive
        setVariable('--dsh-signal-refract-opacity', '0')
        setVariable('--dsh-signal-caustic-opacity', '0')
        setVariable('--dsh-signal-meniscus-opacity', '0')
        setVariable('--dsh-signal-wake-opacity', '0')
        setVariable('--dsh-signal-lumen-opacity', '0')
        setVariable('--dsh-signal-shadow-alpha', '0')
        setVariable('--dsh-signal-glow-alpha', '0')
      }

      const onPointer = event => {
        if (disposed || reduce || !finePointer || event.pointerType === 'touch') return
        const rect = getFxRect(true)
        if (rect === null || rect.width <= 0 || rect.height <= 0) return
        const samples = typeof event.getCoalescedEvents === 'function' ? event.getCoalescedEvents() : []
        const sample = samples.length > 0 ? samples[samples.length - 1] : event
        const x = clamp(sample.clientX - rect.left, 0, rect.width)
        const y = clamp(sample.clientY - rect.top, 0, rect.height)
        const now = performance.now()
        if (!initialized) {
          initialized = true
          currentX = x
          currentY = y
          targetX = x
          targetY = y
        } else if (lastPointerAt > 0) {
          const elapsed = clamp(now - lastPointerAt, 4, 64)
          const frameScale = 16.667 / elapsed
          targetVelocityX = clamp((x - lastPointerX) * frameScale, -28, 28)
          targetVelocityY = clamp((y - lastPointerY) * frameScale, -22, 22)
        }
        targetX = x
        targetY = y
        lastPointerX = x
        lastPointerY = y
        lastPointerAt = now
        hovering = true
        headline.classList.remove('dsh-signal-revealing')
        exposeState('tracking')
      }

      const rest = () => {
        if (!initialized) return
        hovering = false
        lastPointerAt = 0
        targetVelocityX *= .28
        targetVelocityY *= .28
        if (intensity > .01) exposeState('settling')
      }

      const onVisibility = () => {
        if (document.hidden) rest()
      }

      const tick = timestamp => {
        if (disposed || reduce || !finePointer || !initialized) return
        const rect = getFxRect(false)
        if (rect === null || rect.width <= 0 || rect.height <= 0) return
        const delta = clamp(lastFrame === 0 ? 16.667 : timestamp - lastFrame, 4, 48)
        lastFrame = timestamp
        const positionFollow = 1 - Math.exp(-delta / 26)
        const velocityFollow = 1 - Math.exp(-delta / 44)
        const intensityFollow = 1 - Math.exp(-delta / (hovering ? 38 : 220))
        currentX += (targetX - currentX) * positionFollow
        currentY += (targetY - currentY) * positionFollow
        velocityX += (targetVelocityX - velocityX) * velocityFollow
        velocityY += (targetVelocityY - velocityY) * velocityFollow
        targetVelocityX *= Math.exp(-delta / 54)
        targetVelocityY *= Math.exp(-delta / 54)
        intensity += ((hovering ? 1 : 0) - intensity) * intensityFollow

        const speed = clamp(Math.hypot(velocityX, velocityY) / 14, 0, 1)
        const breathe = .5 + Math.sin(timestamp / 430) * .5
        const active = hovering || intensity > .012 || speed > .012
          || Math.abs(targetX - currentX) > .18 || Math.abs(targetY - currentY) > .18
        if (!active) {
          intensity = 0
          velocityX = 0
          velocityY = 0
          clearState()
          return
        }

        exposeState(hovering ? 'tracking' : 'settling')
        const surfacePhase = timestamp / 205 + currentX * .022 + currentY * .011
        const crossPhase = timestamp / 360 - currentY * .017
        const refractX = clamp(velocityX * .28 + (Math.sin(surfacePhase) * 2.15 + Math.cos(crossPhase) * .62) * intensity, -7.8, 7.8)
        const refractY = clamp(velocityY * .18 + (Math.cos(surfacePhase * 1.24) * 1.5 + Math.sin(crossPhase) * .48) * intensity, -5.6, 5.6)
        const causticX = clamp(-velocityX * .16 + Math.sin(surfacePhase + 1.72) * intensity * 1.72, -5.6, 5.6)
        const causticY = clamp(-velocityY * .13 + Math.cos(surfacePhase * 1.13 + .74) * intensity * 2.05, -5.4, 5.4)
        const wakeX = clamp(-velocityX * .52 + Math.sin(crossPhase) * intensity * .8, -12.5, 12.5)
        const wakeY = clamp(-velocityY * .4 + Math.sin(surfacePhase * .78) * intensity * .88, -8.5, 8.5)
        const radiusX = 126 + speed * 46 + breathe * 12
        const radiusY = 42 + speed * 16 + breathe * 8
        const refractOpacity = clamp(intensity * (.42 + breathe * .18 + speed * .24), 0, .84)
        const causticOpacity = clamp(intensity * (.27 + breathe * .19 + speed * .28), 0, .74)
        const meniscusOpacity = clamp(intensity * (.38 + breathe * .22 + speed * .24), 0, .84)
        const wakeOpacity = clamp(intensity * (.1 + breathe * .07 + speed * .42), 0, .59)
        const shadowAlpha = clamp(intensity * (.08 + breathe * .07 + speed * .12), 0, .27)
        const lumenOpacity = clamp(intensity * (.86 + breathe * .1 + speed * .04), 0, 1)
        const glowAlpha = clamp(intensity * (.24 + breathe * .15 + speed * .12), 0, .51)

        setVariable('--dsh-signal-origin-x', `${currentX.toFixed(2)}px`)
        setVariable('--dsh-signal-origin-y', `${currentY.toFixed(2)}px`)
        setVariable('--dsh-signal-refract-x', `${refractX.toFixed(2)}px`)
        setVariable('--dsh-signal-refract-y', `${refractY.toFixed(2)}px`)
        setVariable('--dsh-signal-caustic-x', `${causticX.toFixed(2)}px`)
        setVariable('--dsh-signal-caustic-y', `${causticY.toFixed(2)}px`)
        setVariable('--dsh-signal-wake-x', `${wakeX.toFixed(2)}px`)
        setVariable('--dsh-signal-wake-y', `${wakeY.toFixed(2)}px`)
        setVariable('--dsh-signal-water-tilt', `${clamp(-velocityX * .12, -2.8, 2.8).toFixed(2)}deg`)
        setVariable('--dsh-signal-water-radius-x', `${radiusX.toFixed(2)}px`)
        setVariable('--dsh-signal-water-radius-y', `${radiusY.toFixed(2)}px`)
        setVariable('--dsh-signal-wake-radius-x', `${(radiusX * 1.28).toFixed(2)}px`)
        setVariable('--dsh-signal-wake-radius-y', `${(radiusY * 1.42).toFixed(2)}px`)
        setVariable('--dsh-signal-glow-x', `${(refractX * .38 + causticX * .12).toFixed(2)}px`)
        setVariable('--dsh-signal-glow-y', `${(refractY * .34 + causticY * .1).toFixed(2)}px`)
        setVariable('--dsh-signal-glow-radius-x', `${(radiusX * 1.13).toFixed(2)}px`)
        setVariable('--dsh-signal-glow-radius-y', `${(radiusY * 1.36).toFixed(2)}px`)
        setVariable('--dsh-signal-refract-opacity', refractOpacity.toFixed(3))
        setVariable('--dsh-signal-caustic-opacity', causticOpacity.toFixed(3))
        setVariable('--dsh-signal-meniscus-opacity', meniscusOpacity.toFixed(3))
        setVariable('--dsh-signal-wake-opacity', wakeOpacity.toFixed(3))
        setVariable('--dsh-signal-lumen-opacity', lumenOpacity.toFixed(3))
        setVariable('--dsh-signal-shadow-x', `${clamp(velocityX * .14, -3, 3).toFixed(2)}px`)
        setVariable('--dsh-signal-shadow-y', `${clamp(velocityY * .11, -2.2, 2.2).toFixed(2)}px`)
        setVariable('--dsh-signal-shadow-alpha', shadowAlpha.toFixed(3))
        setVariable('--dsh-signal-glow-alpha', glowAlpha.toFixed(3))
      }

      headline.addEventListener('pointerenter', onPointer)
      headline.addEventListener('pointermove', onPointer, { passive: true })
      headline.addEventListener('pointerleave', rest)
      headline.addEventListener('pointercancel', rest)
      window.addEventListener('blur', rest)
      document.addEventListener('visibilitychange', onVisibility)

      return {
        tick,
        stop() {
          disposed = true
          headline.removeEventListener('pointerenter', onPointer)
          headline.removeEventListener('pointermove', onPointer)
          headline.removeEventListener('pointerleave', rest)
          headline.removeEventListener('pointercancel', rest)
          window.removeEventListener('blur', rest)
          document.removeEventListener('visibilitychange', onVisibility)
          clearState()
        },
      }
    }

    function SignalMark({ className }) {
      const rootRef = useRef(null)
      useLayoutEffect(() => {
        const root = rootRef.current
        if (!(root instanceof HTMLElement)) return undefined
        let disposed = false
        let reconcileFrame = 0 // DSH_DESKTOP_BOUNDED_BRAND_RECONCILE
        let mount = null

        const resolveBrandNodes = () => {
          const slot = root.closest('[data-slot="conversation.hero.brand.mark"]')
          const markOwner = slot?.parentElement
          const headline = markOwner?.parentElement
          if (!(headline instanceof HTMLElement) || !(markOwner instanceof HTMLElement)) return null
          const children = [...headline.children].filter(value => !value.matches?.('[data-dsh-signal-fx-host]'))
          const title = children.find(value => value !== markOwner && value instanceof HTMLElement)
          const badge = title === undefined
            ? undefined
            : children.find(value => value !== markOwner && value !== title && value instanceof HTMLElement)
          return title instanceof HTMLElement ? { markOwner, headline, title, badge } : null
        }

        const createBrandFxMount = ({ markOwner, headline, title, badge }) => {
          headline.classList.add('dsh-signal-hero')
          markOwner.classList.add('dsh-signal-hero-mark')
          title.classList.add('dsh-signal-hero-title')
          title.dataset.dshSignalTitle = ''
          badge?.classList.add('dsh-signal-hero-badge')
          const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          if (!reduce) headline.classList.add('dsh-signal-revealing')

          const fxHost = document.createElement('span')
          fxHost.className = 'dsh-signal-fx-host'
          fxHost.dataset.dshSignalFxHost = ''
          fxHost.setAttribute('aria-hidden', 'true')
          const layers = ['lumen', 'refract', 'caustic', 'meniscus', 'wake'].map(kind => {
            const layer = document.createElement('span')
            layer.className = `dsh-signal-wordmark-fx ${kind}`
            layer.setAttribute('aria-hidden', 'true')
            const markCopy = root.cloneNode(true)
            markCopy.classList.add('dsh-signal-wordmark-fx-mark')
            markCopy.setAttribute('aria-hidden', 'true')
            const titleCopy = document.createElement('span')
            titleCopy.className = 'dsh-signal-wordmark-fx-title'
            titleCopy.setAttribute('aria-hidden', 'true')
            layer.append(markCopy, titleCopy)
            fxHost.append(layer)
            return { layer, markCopy, titleCopy }
          })
          const canvas = document.createElement('canvas')
          canvas.className = 'dsh-signal-field'
          fxHost.prepend(canvas)
          headline.append(fxHost)

          let fxRect = null
          let visualText = null
          let titleColor = null
          const refreshVisuals = () => {
            const nextText = title.textContent?.trim() ?? ''
            const nextColor = getComputedStyle(title).color
            if (nextText === visualText && nextColor === titleColor) return
            visualText = nextText
            titleColor = nextColor
            title.style.setProperty('--dsh-signal-title-color', titleColor)
            for (const { layer, titleCopy } of layers) {
              layer.style.setProperty('--dsh-signal-title-color', titleColor)
              titleCopy.textContent = visualText
            }
          }
          const updateFxGeometry = () => {
            refreshVisuals()
            const headlineRect = headline.getBoundingClientRect()
            const markRect = markOwner.getBoundingClientRect()
            const titleRect = title.getBoundingClientRect()
            if (headlineRect.width <= 0 || markRect.width <= 0 || titleRect.width <= 0) return
            const pad = 28
            const left = Math.min(markRect.left, titleRect.left) - pad
            const top = Math.min(markRect.top, titleRect.top) - pad
            const right = Math.max(markRect.right, titleRect.right) + pad
            const bottom = Math.max(markRect.bottom, titleRect.bottom) + pad
            fxRect = { left, top, width: right - left, height: bottom - top }
            const titleStyle = getComputedStyle(title)
            for (const { layer, markCopy, titleCopy } of layers) {
              layer.style.left = `${left - headlineRect.left}px`
              layer.style.top = `${top - headlineRect.top}px`
              layer.style.width = `${right - left}px`
              layer.style.height = `${bottom - top}px`
              markCopy.style.left = `${markRect.left - left}px`
              markCopy.style.top = `${markRect.top - top}px`
              titleCopy.style.left = `${titleRect.left - left}px`
              titleCopy.style.top = `${titleRect.top - top}px`
              titleCopy.style.width = `${titleRect.width}px`
              titleCopy.style.height = `${titleRect.height}px`
              titleCopy.style.fontFamily = titleStyle.fontFamily
              titleCopy.style.fontSize = titleStyle.fontSize
              titleCopy.style.fontWeight = titleStyle.fontWeight
              titleCopy.style.lineHeight = titleStyle.lineHeight
              titleCopy.style.letterSpacing = titleStyle.letterSpacing
            }
          }

          const geometryObserver = new ResizeObserver(updateFxGeometry)
          geometryObserver.observe(headline)
          geometryObserver.observe(markOwner)
          geometryObserver.observe(title)
          updateFxGeometry()
          const tracker = setupWordmarkTracker(headline, title, refresh => {
            if (refresh) updateFxGeometry()
            return fxRect
          }, reduce)
          const field = setupSignalField(canvas, headline, headline, tracker.tick)
          const timer = reduce ? 0 : window.setTimeout(() => headline.classList.remove('dsh-signal-revealing'), 1550)
          const visualNodes = [canvas, ...layers.map(({ layer }) => layer)]

          return {
            headline,
            markOwner,
            title,
            badge,
            fxHost,
            healthy() {
              return fxHost.parentElement === headline
                && visualNodes.every((node, index) => fxHost.children[index] === node)
            },
            refresh: updateFxGeometry,
            resume() {
              if (fxHost.parentElement !== headline) headline.append(fxHost)
              if (!visualNodes.every((node, index) => fxHost.children[index] === node)) {
                fxHost.replaceChildren(...visualNodes)
              }
              updateFxGeometry()
              field.resume()
            },
            stop() {
              if (timer !== 0) clearTimeout(timer)
              tracker.stop()
              geometryObserver.disconnect()
              field.stop()
              fxHost.remove()
              headline.classList.remove('dsh-signal-hero', 'dsh-signal-revealing', 'dsh-signal-wordmark-live')
              markOwner.classList.remove('dsh-signal-hero-mark')
              title.classList.remove('dsh-signal-hero-title')
              delete title.dataset.dshSignalTitle
              delete title.dataset.dshSignalTitleActive
              delete headline.dataset.dshSignalWordmarkLive
              delete headline.dataset.dshSignalWordmarkState
              title.style.removeProperty('--dsh-signal-title-color')
              badge?.classList.remove('dsh-signal-hero-badge')
            },
          }
        }

        const reconcileBrandFx = () => {
          reconcileFrame = 0
          if (disposed) return
          const nodes = resolveBrandNodes()
          if (nodes === null) {
            mount?.stop()
            mount = null
            return
          }
          const sameMount = mount !== null
            && mount.headline === nodes.headline
            && mount.markOwner === nodes.markOwner
            && mount.title === nodes.title
          if (!sameMount) {
            mount?.stop()
            mount = createBrandFxMount(nodes)
            return
          }
          if (mount.healthy()) mount.refresh()
          else mount.resume()
        }
        const mutationAffectsBrand = record => {
          const fxHost = mount?.fxHost
          if (fxHost instanceof Node && (record.target === fxHost || fxHost.contains(record.target))) return false
          const headline = mount?.headline
          if (headline instanceof Node && (record.target === headline || headline.contains(record.target))) return true
          const affectedNodes = [...record.addedNodes, ...record.removedNodes]
          return affectedNodes.some(node => {
            if (!(node instanceof Node)) return false
            if (fxHost instanceof Node && (node === fxHost || fxHost.contains(node))) return false
            return node === root
              || node.contains(root)
              || root.contains(node)
              || (headline instanceof Node && (
                node === headline
                || node.contains(headline)
                || headline.contains(node)
              ))
          })
        }
        const scheduleReconcile = () => {
          if (disposed || reconcileFrame !== 0) return
          reconcileFrame = window.requestAnimationFrame(reconcileBrandFx)
        }

        reconcileBrandFx()
        const integrityObserver = new MutationObserver(records => {
          if (records.some(mutationAffectsBrand)) scheduleReconcile()
        })
        const integrityScope = root.closest('[data-slot="conversation.hero.brand.mark"]')?.parentElement?.parentElement?.parentElement ?? document.body
        integrityObserver.observe(integrityScope, { childList: true, subtree: true, characterData: true })

        return () => {
          disposed = true
          integrityObserver.disconnect()
          if (reconcileFrame !== 0) window.cancelAnimationFrame(reconcileFrame)
          mount?.stop()
          mount = null
        }
      }, [])
      return el('span', { ref: rootRef, className: 'dsh-signal-mark', 'aria-hidden': 'true' },
        el(FishLogo, { size: 46, className: `${className ?? ''} dsh-signal-whale`.trim() }))
    }

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

    

const inject = ['remote']

const RESOURCE_REFRESH_INTERVAL = 45_000
const RESOURCE_REFRESH_THROTTLE = 8_000
const RESOURCE_REFRESH_BACKOFF = [60_000, 120_000, 240_000, 300_000]

function createRefreshPolicy({ now = () => Date.now(), interval = RESOURCE_REFRESH_INTERVAL, throttle = RESOURCE_REFRESH_THROTTLE, backoff = RESOURCE_REFRESH_BACKOFF } = {}) {
  const startedAt = new Map()
  const failures = new Map()
  return {
    shouldStart(source, automatic) {
      if (!automatic) return true
      const current = now()
      const failure = failures.get(source)
      if (failure !== undefined && failure.backoffUntil > current) return false
      const last = startedAt.get(source)
      return last === undefined || current - last >= throttle
    },
    markStarted(source) {
      startedAt.set(source, now())
    },
    markSuccess(source) {
      failures.delete(source)
    },
    markFailure(source) {
      const attempts = (failures.get(source)?.attempts ?? 0) + 1
      const wait = backoff[Math.min(attempts - 1, backoff.length - 1)]
      failures.set(source, { attempts, backoffUntil: now() + wait })
    },
    delay(source) {
      const failure = failures.get(source)
      return failure === undefined ? interval : Math.max(interval, failure.backoffUntil - now())
    },
  }
}

function createRefreshScheduler({ setTimeout: scheduleTimer, clearTimeout: cancelTimer, isVisible, getDelay, refresh }) {
  let timer = null
  let disposed = false
  const clear = () => {
    if (timer !== null) cancelTimer(timer)
    timer = null
  }
  const schedule = () => {
    clear()
    if (disposed || !isVisible()) return
    timer = scheduleTimer(() => {
      timer = null
      if (!isVisible()) return
      Promise.resolve(refresh('interval')).finally(schedule)
    }, getDelay())
  }
  return {
    start: schedule,
    stop() {
      disposed = true
      clear()
    },
    onVisibility() {
      clear()
      if (isVisible()) Promise.resolve(refresh('visibility')).finally(schedule)
    },
    onFocus() {
      if (isVisible()) {
        clear()
        Promise.resolve(refresh('focus')).finally(schedule)
      }
    },
  }
}

function resourceStateKey(source) {
  if (source === 'deepseek') return 'balance'
  if (source === 'opencode') return 'go'
  if (source === 'moonshot-cn') return 'moonshotCn'
  return source
}

function mergeResourceState(currentState, incomingState, source) {
  const current = currentState !== null && typeof currentState === 'object' ? currentState : {}
  const incoming = incomingState !== null && typeof incomingState === 'object' ? incomingState : {}
  const key = resourceStateKey(source)
  if (key === null || !Object.prototype.hasOwnProperty.call(incoming, key)) return { ...current }
  return {
    ...current,
    [key]: incoming[key],
    updatedAt: Math.max(Number(current.updatedAt) || 0, Number(incoming.updatedAt) || 0, Number(incoming[key]?.attemptedAt) || 0),
  }
}

function mergeHostState(currentState, incomingState) {
  const current = currentState !== null && typeof currentState === 'object' ? currentState : {}
  const incoming = incomingState !== null && typeof incomingState === 'object' ? incomingState : {}
  const next = { ...current }
  for (const key of Object.keys(incoming)) {
    if (key === 'updatedAt') continue
    const oldEntry = current[key]
    const newEntry = incoming[key]
    const oldAttemptedAt = Number(oldEntry?.attemptedAt) || 0
    const newAttemptedAt = Number(newEntry?.attemptedAt) || 0
    if (oldEntry === undefined || newAttemptedAt >= oldAttemptedAt) next[key] = newEntry
  }
  next.updatedAt = Math.max(Number(current.updatedAt) || 0, Number(incoming.updatedAt) || 0)
  return next
}


    async function apply(ctx) {
      installStyles()
      installSignalSettingsNavIcons(ctx)
      installSettingsLayerGuard(ctx)
      const resource = makeStore({ status: 'loading', error: null, state: null, refreshing: null })
      const analytics = makeStore({ status: 'loading', error: null, state: null, refreshing: false })
      let service

      if (ctx.remote !== undefined && typeof ctx.remote.$mount === 'function') {
        try {
          const unmount = await ctx.remote.$mount(CONTRIBUTION)
          ctx.effect(() => () => unmount(), 'dsh-signal: remote contribution')
          service = ctx.get('remote.signalResource')
        } catch (error) {
          resource.set({ status: 'error', error: error?.message ?? String(error), state: null, refreshing: null })
          analytics.set({ status: 'error', error: error?.message ?? String(error), state: null, refreshing: false })
        }
      }

      const call = async (method, args = []) => {
        if (service === undefined) throw new Error('Host 资源服务未连接')
        const result = await service[method](...args)
        if (result === null || typeof result !== 'object' || result.ok !== true) {
          throw new Error(result?.error?.message ?? `${method} RPC 失败`)
        }
        return result.value
      }

      let loading = false
      let loadingAnalytics = false
      let activeSource = null
      const refreshPolicy = createRefreshPolicy()
      const refreshingSources = new Set()
      const refreshingValue = () => refreshingSources.size === 0
        ? null
        : refreshingSources.size === 1 ? refreshingSources.values().next().value : 'all'
      const setRefreshing = (source, active) => {
        if (active) refreshingSources.add(source)
        else refreshingSources.delete(source)
        const latest = resource.getSnapshot()
        resource.set({ ...latest, refreshing: refreshingValue() })
      }
      const refreshDelay = source => {
        return refreshPolicy.delay(source)
      }
      const reload = async () => {
        if (loading || service === undefined) return
        loading = true
        const previous = resource.getSnapshot()
        if (previous.state === null) resource.set({ ...previous, status: 'loading', error: null })
        try {
          const [hostState, codex] = await Promise.all([
            call('getState'),
            activeSource === 'codex' ? readCodexResource(previous.state?.codex) : Promise.resolve(previous.state?.codex),
          ])
          const latest = resource.getSnapshot()
          const state = mergeHostState(latest.state, hostState)
          const latestCodex = latest.state?.codex
          state.codex = Number(latestCodex?.attemptedAt) > Number(codex?.attemptedAt ?? 0)
            ? latestCodex : codex ?? latestCodex ?? previous.state?.codex
          state.updatedAt = Math.max(Number(state.updatedAt) || 0, Number(state.codex?.attemptedAt) || 0)
          resource.set({ ...latest, status: 'ready', error: null, state, refreshing: refreshingValue() })
        } catch (error) {
          const latest = resource.getSnapshot()
          resource.set({ ...latest, status: 'error', error: error?.message ?? String(error), refreshing: refreshingValue() })
        } finally {
          loading = false
        }
      }

      const reloadAnalytics = async force => {
        if (loadingAnalytics || service === undefined) return
        loadingAnalytics = true
        const previous = analytics.getSnapshot()
        analytics.set({ ...previous, status: previous.state === null ? 'loading' : previous.status, error: null, refreshing: force })
        try {
          const state = await call(force ? 'refreshAnalytics' : 'getAnalytics')
          analytics.set({ status: 'ready', error: null, state, refreshing: false })
        } catch (error) {
          analytics.set({ status: 'error', error: error?.message ?? String(error), state: previous.state, refreshing: false })
        } finally {
          loadingAnalytics = false
        }
      }

      const resourceInFlight = new Map()
      const api = {
        setActiveSource(source, expected = undefined) {
          if (source === null && expected !== undefined && activeSource !== expected) return
          activeSource = source
        },
        getRefreshDelay(source) {
          return refreshDelay(source)
        },
        async refresh(source, options = undefined) {
          if (typeof source !== 'string' || source.length === 0) return
          const reason = typeof options === 'string' ? options : options?.reason ?? 'manual'
          const automatic = reason !== 'manual' && options?.force !== true
          if (resourceInFlight.has(source)) return resourceInFlight.get(source)
          if (automatic && document.visibilityState !== 'visible') return
          if (!refreshPolicy.shouldStart(source, automatic)) return
          refreshPolicy.markStarted(source)
          const task = (async () => {
            setRefreshing(source, true)
            const previous = resource.getSnapshot()
            resource.set({ ...previous, error: null, refreshing: refreshingValue() })
            try {
              if (source === 'codex') {
                try {
                  const entry = await readCodexResource(previous.state?.codex)
                  const latest = resource.getSnapshot()
                  const state = {
                    ...(latest.state ?? {}),
                    [source]: entry,
                    updatedAt: Math.max(Number(latest.state?.updatedAt) || 0, Number(entry.attemptedAt) || 0),
                  }
                  if (entry.status === 'error') refreshPolicy.markFailure(source)
                  else refreshPolicy.markSuccess(source)
                  resource.set({ ...latest, status: 'ready', error: null, state, refreshing: refreshingValue() })
                } catch (error) {
                  const latest = resource.getSnapshot()
                  refreshPolicy.markFailure(source)
                  resource.set({ ...latest, status: 'error', error: error?.message ?? String(error), refreshing: refreshingValue() })
                }
                return
              }
              if (service === undefined) return
              try {
                const hostState = await call('refreshSource', [source])
                const latest = resource.getSnapshot()
                const state = mergeResourceState(latest.state, hostState, source)
                state.codex = latest.state?.codex
                refreshPolicy.markSuccess(source)
                resource.set({ ...latest, status: 'ready', error: null, state, refreshing: refreshingValue() })
              } catch (error) {
                const latest = resource.getSnapshot()
                refreshPolicy.markFailure(source)
                resource.set({ ...latest, status: 'error', error: error?.message ?? String(error), refreshing: refreshingValue() })
              }
            } finally {
              setRefreshing(source, false)
            }
          })()
          resourceInFlight.set(source, task)
          try {
            return await task
          } finally {
            if (resourceInFlight.get(source) === task) resourceInFlight.delete(source)
          }
        },
        async refreshAnalytics() {
          await reloadAnalytics(true)
        },
        async ensureAnalytics() {
          await reloadAnalytics(false)
        },
      }

      ctx.inject(['slots', 'modelDirectories'], scope => {
        scope.slots.inject('conversation.hero.brand.mark', () => scope.slots.register({
          name: 'conversation.hero.brand.mark',
          id: 'dsh-signal-hero-mark',
        }, SignalMark))
        scope.slots.inject('settings.section', () => scope.slots.register({
          name: 'settings.section',
          id: 'dsh-signal-usage',
          order: 42,
          label: () => 'Signal 用量',
          inject: () => ({ analytics, api }),
        }, SignalUsageSettings))
        scope.slots.inject('settings.section', () => scope.slots.register({
          name: 'settings.section',
          id: 'dsh-signal-appearance',
          order: 41,
          label: () => 'Signal 外观',
          inject: () => ({}),
        }, SignalAppearanceSettings))
        scope.slots.inject('conversation.session.header.utilities', () => scope.slots.register({
          name: 'conversation.session.header.utilities',
          id: 'dsh-signal-work-explainer',
          order: 35,
          label: '模型工作说明',
          inject: sessionId => {
            const directory = scope.modelDirectories.directoryFor(sessionId)
            directory.load().catch(() => {})
            return { directory: directory.store }
          },
        }, WorkExplainer))
      })

      ctx.inject(['slots', 'modelDirectories'], scope => {
        const directories = scope.modelDirectories
        scope.slots.inject('conversation.input.dock', () => scope.slots.register({
          name: 'conversation.input.dock',
          id: 'dsh-signal-resource-rail',
          order: 1,
          inject: sessionId => {
            const directory = directories.directoryFor(sessionId)
            directory.load().catch(() => {})
            return { directory: directory.store, resource, api }
          },
        }, ResourceRail))
      })

      if (service !== undefined) {
        void reload()
        ctx.effect(() => ctx.on('connection/reset', () => {
          if (activeSource !== null) void api.refresh(activeSource)
          else void reload()
        }), 'dsh-signal: reconnect reload')
      }
    }

    exports.apply = apply
    exports.inject = inject
    return module.exports
  },
})
