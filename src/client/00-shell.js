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
