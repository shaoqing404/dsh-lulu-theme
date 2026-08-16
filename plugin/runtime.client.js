// 水豚噜噜 · 运行时 Client 半边：帧经 host.call('lulu-frames') 加载。
// 分发请优先用 plugin/client.js（内嵌帧，单文件）；本变体用于本机快速安装。
// 主题覆盖 DSH 全量 --dsw-* 别名令牌。

const IDLE_DUR = [280, 110, 110, 140, 140, 320]
const WAVE_DUR = [140, 140, 140, 280]

const LULU_THEMES = [
  {
    id: 'lulu-cream',
    colorScheme: 'light',
    tokens: {
      "--dsw-alias-bg-base": "#FFF7E6",
      "--dsw-alias-bg-layer-1": "#FFFCF4",
      "--dsw-alias-bg-layer-2": "#F8EDD6",
      "--dsw-alias-bg-layer-3": "#F3E4C6",
      "--dsw-alias-bg-mask-1": "rgba(43, 33, 24, .26)",
      "--dsw-alias-bg-mask-2": "rgba(43, 33, 24, .12)",
      "--dsw-alias-bg-mask-3": "rgba(43, 33, 24, .48)",
      "--dsw-alias-bg-mask-drop": "rgba(255, 247, 230, .75)",
      "--dsw-alias-bg-mask-photo": "rgba(23, 17, 12, .88)",
      "--dsw-alias-bg-module-platform": "#FBEFD8",
      "--dsw-alias-bg-multi-select": "#FBEFD8",
      "--dsw-alias-bg-overlay": "#FFF8EA",
      "--dsw-alias-bg-primary": "#FFF7E6",
      "--dsw-alias-bg-skeleton": "rgba(43, 33, 24, .06)",
      "--dsw-alias-border-inverted": "rgba(122, 84, 36, .1)",
      "--dsw-alias-border-inverted2": "rgba(122, 84, 36, .12)",
      "--dsw-alias-border-l1": "rgba(122, 84, 36, .16)",
      "--dsw-alias-border-l2": "rgba(122, 84, 36, .26)",
      "--dsw-alias-border-l2-darkmode-thin": "rgba(122, 84, 36, .26)",
      "--dsw-alias-border-l3": "rgba(122, 84, 36, .34)",
      "--dsw-alias-border-l4": "rgba(122, 84, 36, .46)",
      "--dsw-alias-border-secondary": "rgba(122, 84, 36, .16)",
      "--dsw-alias-border-subtle": "rgba(122, 84, 36, .1)",
      "--dsw-alias-brand-primary": "#2B2118",
      "--dsw-alias-brand-primary-invert": "#FFF7E6",
      "--dsw-alias-brand-primary-new-colorprimary-new-color": "#C96A0B",
      "--dsw-alias-brand-text": "#2B2118",
      "--dsw-alias-button-contrast-fill": "#2B2118",
      "--dsw-alias-button-elevated-fill": "#FFFDF6",
      "--dsw-alias-button-floating-fill": "#FFFDF6",
      "--dsw-alias-button-floating-hover": "#FBEED9",
      "--dsw-alias-button-ghost-active-border": "#C98F3F",
      "--dsw-alias-button-ghost-active-fill": "#F7E3C2",
      "--dsw-alias-button-ghost-active-hover": "#F9E9CF",
      "--dsw-alias-button-info-fill": "#C96A0B",
      "--dsw-alias-button-info-hover": "#B85E05",
      "--dsw-alias-button-primary-dimmed": "#F3E4C6",
      "--dsw-alias-button-primary-fill": "#2B2118",
      "--dsw-alias-button-primary-hover": "#4A3A2A",
      "--dsw-alias-button-tool-bar-fill": "rgba(43, 33, 24, .5)",
      "--dsw-alias-button-tool-bar-fill-invisible": "rgba(43, 33, 24, .36)",
      "--dsw-alias-button-tool-bar-hover": "rgba(43, 33, 24, .6)",
      "--dsw-alias-interactive-bg-active": "rgba(201, 106, 11, .16)",
      "--dsw-alias-interactive-bg-hover": "rgba(201, 106, 11, .09)",
      "--dsw-alias-interactive-bg-hover-accent": "rgba(201, 106, 11, .18)",
      "--dsw-alias-interactive-bg-hover-danger": "rgba(201, 79, 61, .07)",
      "--dsw-alias-interactive-bg-hover-solid": "#F5E7C8",
      "--dsw-alias-interactive-bg-primary": "#FBEED9",
      "--dsw-alias-label-caption": "#A08A6A",
      "--dsw-alias-label-dimmed": "#C6B28F",
      "--dsw-alias-label-error": "#C94F3D",
      "--dsw-alias-label-inverse": "#FFF7E6",
      "--dsw-alias-label-primary": "#2B2118",
      "--dsw-alias-label-primary-bluish": "#3E2E1B",
      "--dsw-alias-label-primary-dimmed": "#241B10",
      "--dsw-alias-label-primary-foreground": "#FFF6E3",
      "--dsw-alias-label-primary-inverted": "#FFF6E3",
      "--dsw-alias-label-quaternary": "#A08A6A",
      "--dsw-alias-label-secondary": "#6E5D49",
      "--dsw-alias-label-tertiary": "#8F7A5E",
      "--dsw-alias-line-secondary": "rgba(122, 84, 36, .18)",
      "--dsw-alias-markdown-citation": "#F5E7C8",
      "--dsw-alias-markdown-code-block": "#FFF3DC",
      "--dsw-alias-markdown-code-block-banner": "#F9E9CF",
      "--dsw-alias-markdown-code-segment-selected": "#FFFDF6",
      "--dsw-alias-markdown-code-segment-unselected": "#F5E7C8",
      "--dsw-alias-markdown-inline-code": "#F9E9CF",
      "--dsw-alias-markdown-placeholder": "#F1E2C4",
      "--dsw-alias-markdown-tag": "#F5E7C8",
      "--dsw-alias-scrollbar-bg-l1": "#EAD9B8",
      "--dsw-alias-scrollbar-bg-l2": "#EAD9B8",
      "--dsw-alias-scrollbar-hover-l1": "#D9BE8E",
      "--dsw-alias-scrollbar-hover-l2": "#D9BE8E",
      "--dsw-alias-separator-primary": "rgba(122, 84, 36, .16)",
      "--dsw-alias-state-business-primary": "#C96A0B",
      "--dsw-alias-state-business-tertiary": "#F7E3C2",
      "--dsw-alias-state-error-primary": "#C94F3D",
      "--dsw-alias-state-error-secondary": "#D96A58",
      "--dsw-alias-state-success-primary": "#5FA82C",
      "--dsw-alias-state-success-secondary": "#7DBE4C",
      "--dsw-alias-state-success-tertiary": "#EAF3DA",
      "--dsw-alias-state-warn-label": "#B26A08",
      "--dsw-alias-state-warn-primary": "#D98E1F",
      "--dsw-alias-state-warn-secondary": "#E8A94E",
      "--dsw-alias-state-warn-tertiary": "#F9EBCF",
      "--dsw-alias-text-primary": "#2B2118",
      "--dsw-alias-text-tertiary": "#8F7A5E",
      "--dsw-alias-toast-bg": "#2B2118",
      "--dsw-alias-tooltip-bg": "#2B2118",
      "--dsw-font-family": "\"SF Pro Rounded\", \"PingFang SC\", \"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Arial, sans-serif",
      "--dsw-linear-gradient-think": "linear-gradient(180deg, #FFF3DC 20.19%, rgba(255, 243, 220, 0) 100%)",
      "--dsw-linear-think-select": "linear-gradient(180deg, #F5E7C8 20.19%, rgba(245, 231, 200, 0) 100%)",
      "--dsw-shadow-lv1": "0 2px 4px 0 rgba(43, 33, 24, .08)",
      "--dsw-shadow-lv1-blur": "0 4px 12px 0 rgba(43, 33, 24, .05)",
      "--dsw-shadow-lv2": "0 4px 12px 0 rgba(43, 33, 24, .06), 0 2px 8px 0 rgba(43, 33, 24, .08)",
      "--dsw-shadow-lv3": "0 0 1px 0 rgba(43, 33, 24, .22), 0 0 4px 0 rgba(43, 33, 24, .04), 0 12px 32px 0 rgba(43, 33, 24, .14)",
      "--dsw-specific-bubble": "#FFF3DC",
      "--dsw-specific-bubble-highlight": "#F7E3C2",
      "--dsw-specific-input-major": "#FFFDF6",
      "--dsw-specific-login-input": "#FFF9EC",
      "--dsw-specific-menu": "#FBF1DD",
      "--dsw-specific-selector": "#F9E9CF",
      "--dsw-specific-sidebar-fill": "#FAF0DC",
      "--dsw-specific-sidebar-nav-item-active": "#F5E7C8",
      "--dsw-specific-sidebar-nav-item-active-accent": "#F2B01E",
      "--dsw-specific-sidebar-nav-item-hover": "#F7EDDA",
      "--dsw-specific-tip": "#FCF3E0",
    },
  },
  {
    id: 'lulu-night',
    colorScheme: 'dark',
    tokens: {
      "--dsw-alias-bg-base": "#171310",
      "--dsw-alias-bg-layer-1": "#221C15",
      "--dsw-alias-bg-layer-2": "#2C241B",
      "--dsw-alias-bg-layer-3": "#362D21",
      "--dsw-alias-bg-mask-1": "rgba(8, 6, 4, .6)",
      "--dsw-alias-bg-mask-2": "rgba(8, 6, 4, .35)",
      "--dsw-alias-bg-mask-3": "rgba(8, 6, 4, .6)",
      "--dsw-alias-bg-mask-drop": "rgba(23, 17, 12, .75)",
      "--dsw-alias-bg-mask-photo": "rgba(8, 6, 4, .88)",
      "--dsw-alias-bg-module-platform": "#1D1813",
      "--dsw-alias-bg-multi-select": "#211B15",
      "--dsw-alias-bg-overlay": "#2A231A",
      "--dsw-alias-bg-primary": "#171310",
      "--dsw-alias-bg-skeleton": "rgba(255, 241, 208, .08)",
      "--dsw-alias-border-inverted": "rgba(255, 241, 208, .08)",
      "--dsw-alias-border-inverted2": "rgba(255, 241, 208, .1)",
      "--dsw-alias-border-l1": "rgba(255, 241, 208, .1)",
      "--dsw-alias-border-l2": "rgba(255, 241, 208, .16)",
      "--dsw-alias-border-l2-darkmode-thin": "rgba(255, 241, 208, .16)",
      "--dsw-alias-border-l3": "rgba(255, 241, 208, .22)",
      "--dsw-alias-border-l4": "rgba(255, 241, 208, .3)",
      "--dsw-alias-border-secondary": "rgba(255, 241, 208, .1)",
      "--dsw-alias-border-subtle": "rgba(255, 241, 208, .08)",
      "--dsw-alias-brand-primary": "#FFF1D0",
      "--dsw-alias-brand-primary-invert": "#171310",
      "--dsw-alias-brand-primary-new-colorprimary-new-color": "#F2B01E",
      "--dsw-alias-brand-text": "#FFF1D0",
      "--dsw-alias-button-contrast-fill": "#FFE7B3",
      "--dsw-alias-button-elevated-fill": "#362D21",
      "--dsw-alias-button-floating-fill": "#2A231A",
      "--dsw-alias-button-floating-hover": "#362D21",
      "--dsw-alias-button-ghost-active-border": "#8A764F",
      "--dsw-alias-button-ghost-active-fill": "#362D21",
      "--dsw-alias-button-ghost-active-hover": "#3E3325",
      "--dsw-alias-button-info-fill": "#F2B01E",
      "--dsw-alias-button-info-hover": "#F4BB38",
      "--dsw-alias-button-primary-dimmed": "#362D21",
      "--dsw-alias-button-primary-fill": "#FFF1D0",
      "--dsw-alias-button-primary-hover": "#FFE7B3",
      "--dsw-alias-button-tool-bar-fill": "rgba(23, 17, 12, .5)",
      "--dsw-alias-button-tool-bar-fill-invisible": "rgba(23, 17, 12, .36)",
      "--dsw-alias-button-tool-bar-hover": "rgba(23, 17, 12, .6)",
      "--dsw-alias-interactive-bg-active": "rgba(242, 176, 30, .18)",
      "--dsw-alias-interactive-bg-hover": "rgba(242, 176, 30, .1)",
      "--dsw-alias-interactive-bg-hover-accent": "rgba(242, 176, 30, .22)",
      "--dsw-alias-interactive-bg-hover-danger": "rgba(226, 109, 92, .14)",
      "--dsw-alias-interactive-bg-hover-solid": "#362D21",
      "--dsw-alias-interactive-bg-primary": "#2A231A",
      "--dsw-alias-label-caption": "#8F8068",
      "--dsw-alias-label-dimmed": "#5F5444",
      "--dsw-alias-label-error": "#E26D5C",
      "--dsw-alias-label-inverse": "#171310",
      "--dsw-alias-label-primary": "#FFF1D0",
      "--dsw-alias-label-primary-bluish": "#FFE7B3",
      "--dsw-alias-label-primary-dimmed": "#FFE7B3",
      "--dsw-alias-label-primary-foreground": "#171310",
      "--dsw-alias-label-primary-inverted": "#171310",
      "--dsw-alias-label-quaternary": "#6B5E4B",
      "--dsw-alias-label-secondary": "#B4A389",
      "--dsw-alias-label-tertiary": "#8F8068",
      "--dsw-alias-line-secondary": "rgba(255, 241, 208, .12)",
      "--dsw-alias-markdown-citation": "#2A231A",
      "--dsw-alias-markdown-code-block": "#1E1812",
      "--dsw-alias-markdown-code-block-banner": "#251E16",
      "--dsw-alias-markdown-code-segment-selected": "#2A231A",
      "--dsw-alias-markdown-code-segment-unselected": "#1E1812",
      "--dsw-alias-markdown-inline-code": "#2A231A",
      "--dsw-alias-markdown-placeholder": "#221C15",
      "--dsw-alias-markdown-tag": "#2A231A",
      "--dsw-alias-scrollbar-bg-l1": "#3B3123",
      "--dsw-alias-scrollbar-bg-l2": "#3B3123",
      "--dsw-alias-scrollbar-hover-l1": "#574830",
      "--dsw-alias-scrollbar-hover-l2": "#574830",
      "--dsw-alias-separator-primary": "rgba(255, 241, 208, .12)",
      "--dsw-alias-state-business-primary": "#F2B01E",
      "--dsw-alias-state-business-tertiary": "#3A2E14",
      "--dsw-alias-state-error-primary": "#E26D5C",
      "--dsw-alias-state-error-secondary": "#E26D5C",
      "--dsw-alias-state-success-primary": "#A8D34A",
      "--dsw-alias-state-success-secondary": "#7DBE4C",
      "--dsw-alias-state-success-tertiary": "#232B16",
      "--dsw-alias-state-warn-label": "#F0B44A",
      "--dsw-alias-state-warn-primary": "#E8A13A",
      "--dsw-alias-state-warn-secondary": "#E8A13A",
      "--dsw-alias-state-warn-tertiary": "#33280F",
      "--dsw-alias-text-primary": "#FFF1D0",
      "--dsw-alias-text-tertiary": "#8F8068",
      "--dsw-alias-toast-bg": "#FFE7B3",
      "--dsw-alias-tooltip-bg": "#3E3325",
      "--dsw-font-family": "\"SF Pro Rounded\", \"PingFang SC\", \"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Arial, sans-serif",
      "--dsw-linear-gradient-think": "linear-gradient(180deg, #1E1812 20.19%, rgba(30, 24, 18, 0) 100%)",
      "--dsw-linear-think-select": "linear-gradient(180deg, #251E16 20.19%, rgba(37, 30, 22, 0) 100%)",
      "--dsw-shadow-lv1": "0 2px 4px 0 rgba(8, 6, 4, .3)",
      "--dsw-shadow-lv1-blur": "0 4px 12px 0 rgba(8, 6, 4, .2)",
      "--dsw-shadow-lv2": "0 4px 12px 0 rgba(8, 6, 4, .25), 0 2px 8px 0 rgba(8, 6, 4, .3)",
      "--dsw-shadow-lv3": "0 0 1px 0 rgba(8, 6, 4, .5), 0 0 4px 0 rgba(8, 6, 4, .2), 0 12px 32px 0 rgba(8, 6, 4, .45)",
      "--dsw-specific-bubble": "#2A231A",
      "--dsw-specific-bubble-highlight": "#362D21",
      "--dsw-specific-input-major": "#1E1812",
      "--dsw-specific-login-input": "#1E1812",
      "--dsw-specific-menu": "#241D16",
      "--dsw-specific-selector": "#2A231A",
      "--dsw-specific-sidebar-fill": "#120F0B",
      "--dsw-specific-sidebar-nav-item-active": "#2A231A",
      "--dsw-specific-sidebar-nav-item-active-accent": "#F2B01E",
      "--dsw-specific-sidebar-nav-item-hover": "#1E1812",
      "--dsw-specific-tip": "#241E15",
    },
  },
]


const LULU_CSS = [
  '.lulu-pet { position: fixed; width: 108px; z-index: 2147483000; cursor: grab; user-select: none; -webkit-user-select: none; pointer-events: auto; filter: drop-shadow(0 6px 12px rgba(43, 33, 24, 0.28)); }',
  '.lulu-pet:active { cursor: grabbing; }',
  '.lulu-pet:hover { filter: drop-shadow(0 10px 18px rgba(43, 33, 24, 0.34)); }',
  '.lulu-pet-img { display: block; width: 100%; height: auto; animation: lulu-bob 3.6s ease-in-out infinite; }',
  '.lulu-pet-placeholder { display: flex; align-items: center; justify-content: center; width: 108px; height: 96px; font-size: 44px; animation: lulu-bob 3.6s ease-in-out infinite; }',
  '.lulu-pet-bubble { position: absolute; right: 6px; bottom: 100%; margin-bottom: 8px; padding: 6px 12px; border-radius: 12px; background: var(--dsw-alias-bg-overlay); color: var(--dsw-alias-label-primary); border: 1px solid var(--dsw-alias-border-l2); font-size: 12px; line-height: 1.4; white-space: nowrap; opacity: 0; transform: translateY(4px); transition: opacity 0.2s, transform 0.2s; pointer-events: none; }',
  '.lulu-pet:hover .lulu-pet-bubble { opacity: 1; transform: translateY(0); }',
  '@keyframes lulu-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }',
  '.lulu-settings { display: flex; flex-direction: column; gap: 18px; padding: 10px 6px; color: var(--dsw-alias-label-primary); font-size: 13px; }',
  '.lulu-settings h3 { margin: 0; font-size: 12px; font-weight: 600; letter-spacing: 0.04em; color: var(--dsw-alias-label-secondary); text-transform: uppercase; }',
  '.lulu-hero { display: flex; gap: 14px; align-items: center; padding: 14px; border-radius: 16px; background: var(--dsw-alias-bg-layer-1); border: 1px solid var(--dsw-alias-border-l1); box-shadow: var(--dsw-shadow-lv2); }',
  '.lulu-hero img { width: 76px; height: auto; animation: lulu-bob 3.6s ease-in-out infinite; }',
  '.lulu-hero-placeholder { font-size: 44px; animation: lulu-bob 3.6s ease-in-out infinite; }',
  '.lulu-hero-title { font-weight: 600; font-size: 14px; }',
  '.lulu-hero-desc { margin-top: 4px; color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 1.6; }',
  '.lulu-theme-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }',
  '.lulu-theme-card { border: 1px solid var(--dsw-alias-border-l1); border-radius: 14px; padding: 10px; background: var(--dsw-alias-bg-layer-1); cursor: pointer; text-align: left; transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s; }',
  '.lulu-theme-card:hover { border-color: var(--dsw-alias-brand-primary-new-colorprimary-new-color); transform: translateY(-1px); }',
  '.lulu-theme-card.active { border-color: var(--dsw-alias-brand-primary-new-colorprimary-new-color); box-shadow: 0 0 0 1px var(--dsw-alias-brand-primary-new-colorprimary-new-color); }',
  '.lulu-theme-swatch { width: 100%; height: 14px; border-radius: 7px; margin-bottom: 8px; border: 1px solid var(--dsw-alias-border-l1); }',
  '.lulu-theme-name { font-weight: 600; font-size: 13px; }',
  '.lulu-theme-desc { margin-top: 2px; color: var(--dsw-alias-label-secondary); font-size: 12px; }',
  '.lulu-row { display: flex; gap: 8px; flex-wrap: wrap; }',
  '.lulu-btn { border: 1px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); border-radius: 999px; padding: 7px 14px; font-size: 12px; cursor: pointer; transition: border-color 0.15s, background 0.15s, transform 0.15s; }',
  '.lulu-btn:hover { border-color: var(--dsw-alias-brand-primary-new-colorprimary-new-color); background: var(--dsw-alias-button-ghost-active-fill); transform: translateY(-1px); }',
  '.lulu-gallery-banner { display: block; width: 100%; height: auto; border-radius: 16px; border: 1px solid var(--dsw-alias-border-l1); box-shadow: var(--dsw-shadow-lv2); }',
  '.lulu-gallery-row { display: flex; gap: 12px; align-items: center; margin-top: 10px; }',
  '.lulu-gallery-portrait { width: 76px; height: 76px; object-fit: cover; border-radius: 50%; border: 2px solid var(--dsw-alias-brand-primary-new-colorprimary-new-color); box-shadow: var(--dsw-shadow-lv2); }',
  '.lulu-gallery-note { color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 1.6; }',
  '::selection { background: rgba(242, 176, 30, 0.35); }',
].join('\n')

function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v) }

function createPetStore() {
  let state = { visible: true, mode: 'idle', frame: 0, frames: null, pos: { right: 20, bottom: 16 }, drag: null }
  const subs = []
  return {
    get: function () { return state },
    set: function (patch) { state = Object.assign({}, state, patch); subs.forEach(function (fn) { fn(state) }) },
    subscribe: function (fn) { subs.push(fn); return function () { const i = subs.indexOf(fn); if (i >= 0) subs.splice(i, 1) } },
  }
}

function LuluPet(props) {
  const store = props.store
  const timer = props.timer
  const [s, setS] = React.useState(store.get())
  React.useEffect(function () { return store.subscribe(setS) }, [])
  const wave = s.mode === 'wave'
  const frames = s.frames ? (wave ? s.frames.wave : s.frames.idle) : null
  const durs = wave ? WAVE_DUR : IDLE_DUR
  const frame = frames === null ? 0 : s.frame % frames.length
  React.useEffect(function () {
    if (timer === undefined || frames === null) return
    return timer.timeout(function () {
      if (wave && frame === frames.length - 1) store.set({ mode: 'idle', frame: 0 })
      else store.set({ frame: (frame + 1) % frames.length })
    }, durs[frame] || 200)
  }, [s.mode, frame, s.frames])
  if (!s.visible) return null
  const onDown = function (e) {
    if (e.currentTarget && typeof e.currentTarget.setPointerCapture === 'function') {
      try { e.currentTarget.setPointerCapture(e.pointerId) } catch (err) {}
    }
    store.set({ drag: { x: e.clientX, y: e.clientY, right: s.pos.right, bottom: s.pos.bottom, moved: 0 } })
  }
  const onMove = function (e) {
    if (s.drag === null) return
    const dx = e.clientX - s.drag.x
    const dy = e.clientY - s.drag.y
    store.set({
      drag: { x: s.drag.x, y: s.drag.y, right: s.drag.right, bottom: s.drag.bottom, moved: Math.max(Math.abs(dx), Math.abs(dy)) },
      pos: { right: clamp(s.drag.right - dx, 0, 480), bottom: clamp(s.drag.bottom - dy, 0, 480) },
    })
  }
  const onUp = function () {
    const wasDrag = s.drag
    store.set({ drag: null })
    if (wasDrag !== null && wasDrag.moved < 6) store.set({ mode: 'wave', frame: 0 })
  }
  if (frames === null) {
    return React.createElement(
      'div',
      { className: 'lulu-pet', style: { right: s.pos.right, bottom: s.pos.bottom }, title: '噜噜马上来' },
      React.createElement('div', { className: 'lulu-pet-placeholder' }, '🍊'),
    )
  }
  return React.createElement(
    'div',
    {
      className: 'lulu-pet',
      style: { right: s.pos.right, bottom: s.pos.bottom },
      onPointerDown: onDown,
      onPointerMove: onMove,
      onPointerUp: onUp,
      role: 'button',
      'aria-label': '水豚噜噜',
      tabIndex: 0,
      title: '点击打招呼 · 拖动换位置',
    },
    React.createElement('div', { className: 'lulu-pet-bubble' }, '噜噜在陪你 🍊'),
    React.createElement('img', { className: 'lulu-pet-img', src: frames[frame], alt: '水豚噜噜', draggable: false }),
  )
}

function LuluSettings(props) {
  const theme = props.theme
  const store = props.store
  const [pref, setPref] = React.useState(theme.getTheme().preference)
  const [pet, setPet] = React.useState(store.get())
  React.useEffect(function () {
    const offTheme = props.onThemeChange(function (snap) { setPref(snap.preference) })
    const offPet = store.subscribe(setPet)
    return function () { offTheme(); offPet() }
  }, [])
  const hero = pet.frames !== null ? pet.frames.idle[0] : null
  const art = pet.art !== undefined && pet.art !== null ? pet.art : null
  const choices = [
    { id: 'lulu-cream', name: '噜噜 · 奶油咖啡', desc: '暖奶油底 + 橘子橙', swatch: 'linear-gradient(90deg, #FFF7E6 62%, #C96A0B 38%)' },
    { id: 'lulu-night', name: '噜噜 · 暖夜', desc: '近黑暖棕夜底 + 亮橘点缀', swatch: 'linear-gradient(90deg, #171310 62%, #F2B01E 38%)' },
    { id: 'light', name: '原版 · 浅色', desc: 'DSH 内置浅色', swatch: 'linear-gradient(90deg, #F7F7F8 62%, #4E6EF2 38%)' },
    { id: 'dark', name: '原版 · 深色', desc: 'DSH 内置深色', swatch: 'linear-gradient(90deg, #1F2023 62%, #4E6EF2 38%)' },
    { id: 'system', name: '跟随系统', desc: '由操作系统决定', swatch: 'linear-gradient(90deg, #F7F7F8 50%, #1F2023 50%)' },
  ]
  return React.createElement(
    'div',
    { className: 'lulu-settings' },
    React.createElement(
      'div',
      { className: 'lulu-hero' },
      hero !== null
        ? React.createElement('img', { src: hero, alt: '水豚噜噜' })
        : React.createElement('div', { className: 'lulu-hero-placeholder' }, '🍊'),
      React.createElement(
        'div',
        null,
        React.createElement('div', { className: 'lulu-hero-title' }, '水豚噜噜 · 皮肤'),
        React.createElement('div', { className: 'lulu-hero-desc' }, '一只头顶橘子的水豚陪你工作。待机摇摇，点击挥手，拖动换位置。'),
      ),
    ),
    React.createElement(
      'div',
      null,
      React.createElement('h3', null, '🍊 主题切换'),
      React.createElement(
        'div',
        { className: 'lulu-theme-grid' },
        choices.map(function (c) {
          return React.createElement(
            'button',
            {
              key: c.id,
              type: 'button',
              className: 'lulu-theme-card' + (pref === c.id ? ' active' : ''),
              'aria-pressed': pref === c.id,
              onClick: function () { theme.setTheme(c.id) },
            },
            React.createElement('div', { className: 'lulu-theme-swatch', style: { background: c.swatch } }),
            React.createElement('div', { className: 'lulu-theme-name' }, c.name),
            React.createElement('div', { className: 'lulu-theme-desc' }, c.desc),
          )
        }),
      ),
    ),
    React.createElement(
      'div',
      null,
    React.createElement(
      'div',
      null,
      React.createElement('h3', null, '🖼️ 噜噜画廊'),
      art !== null ? React.createElement(
        'div',
        null,
        React.createElement('img', { className: 'lulu-gallery-banner', src: art.banner, alt: '水豚噜噜插画' }),
        React.createElement(
          'div',
          { className: 'lulu-gallery-row' },
          React.createElement('img', { className: 'lulu-gallery-portrait', src: art.portrait, alt: '水豚噜噜头像' }),
          React.createElement('div', { className: 'lulu-gallery-note' }, 'BlueAI 原创噜噜插画 · 随皮肤仓库分发'),
        ),
      ) : React.createElement('div', { className: 'lulu-gallery-note' }, '高清插画需皮肤仓库素材（运行时变体）：构建后放入 assets/hd/'),
    ),
      React.createElement('h3', null, '🐾 桌面宠物'),
      React.createElement(
        'div',
        { className: 'lulu-row' },
        React.createElement('button', { type: 'button', className: 'lulu-btn', onClick: function () { store.set({ visible: !pet.visible }) } }, pet.visible ? '藏起噜噜' : '召唤噜噜'),
        React.createElement('button', { type: 'button', className: 'lulu-btn', onClick: function () { store.set({ pos: { right: 20, bottom: 16 } }) } }, '回到角落'),
        React.createElement('button', { type: 'button', className: 'lulu-btn', onClick: function () { store.set({ mode: 'wave', frame: 0 }) } }, '打个招呼'),
      ),
    ),
  )
}

return {
  apply(ctx) {
    const theme = ctx.get('theme')
    const slots = ctx.get('slots')
    const timer = ctx.get('timer')
    if (theme === undefined || slots === undefined) return

    for (const def of LULU_THEMES) {
      ctx.effect(function () { return theme.register(def) }, 'lulu-theme: register ' + def.id)
    }
    const pref = theme.getTheme().preference
    if (pref !== 'lulu-cream' && pref !== 'lulu-night') theme.setTheme('lulu-cream')

    ctx.effect(function () { return styles.insert(LULU_CSS) }, 'lulu-theme: styles')

    const store = createPetStore()
    host.call('lulu-frames', {}).then(function (res) {
      if (res !== null && res !== undefined && res.ok === true) store.set({ frames: res.frames })
    })
    host.call('lulu-art', {}).then(function (res) {
      if (res !== null && res !== undefined && res.ok === true) store.set({ art: res })
    })
    const onThemeChange = function (fn) { return ctx.on('theme/change', fn) }

    slots.inject('settings.section', function () {
      return slots.register(
        { name: 'settings.section', id: 'lulu-skin', order: 25, label: '噜噜水豚' },
        function () { return React.createElement(LuluSettings, { theme: theme, store: store, onThemeChange: onThemeChange }) },
      )
    })
    slots.inject('shell.overlay', function () {
      return slots.register(
        { name: 'shell.overlay', id: 'lulu-pet', order: 500, label: '水豚噜噜' },
        function () { return React.createElement(LuluPet, { store: store, timer: timer }) },
      )
    })
  },
}
