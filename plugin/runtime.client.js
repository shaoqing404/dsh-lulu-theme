// 水豚噜噜 · 运行时 Client 半边：帧经 host.call('lulu-frames') 加载。
// 分发请优先用 plugin/client.js（内嵌帧，单文件）；本变体用于本机快速安装。

const IDLE_DUR = [280, 110, 110, 140, 140, 320]
const WAVE_DUR = [140, 140, 140, 280]

const LULU_THEMES = [
  {
    id: 'lulu-cream',
    colorScheme: 'light',
    tokens: {
      '--dsw-alias-bg-base': '#FFF7E6',
      '--dsw-alias-bg-layer-1': '#FFFCF4',
      '--dsw-alias-bg-layer-2': '#F9EED6',
      '--dsw-alias-bg-overlay': '#FFFDF8',
      '--dsw-alias-border-l1': '#EFE0C4',
      '--dsw-alias-border-l2': '#DFC896',
      '--dsw-alias-brand-primary': '#E8820F',
      '--dsw-alias-label-primary': '#2B2118',
      '--dsw-alias-label-secondary': '#6E5D49',
      '--dsw-alias-state-error-primary': '#C94F3D',
      '--dsw-alias-state-success-primary': '#5FA82C',
      '--dsw-alias-state-warn-primary': '#D98E1F',
      '--dsw-specific-sidebar-fill': '#FAF0DC',
    },
  },
  {
    id: 'lulu-night',
    colorScheme: 'dark',
    tokens: {
      '--dsw-alias-bg-base': '#171310',
      '--dsw-alias-bg-layer-1': '#221C15',
      '--dsw-alias-bg-layer-2': '#2C241B',
      '--dsw-alias-bg-overlay': '#2A231A',
      '--dsw-alias-border-l1': '#3B3226',
      '--dsw-alias-border-l2': '#5A4C38',
      '--dsw-alias-brand-primary': '#F2B01E',
      '--dsw-alias-label-primary': '#FFF1D0',
      '--dsw-alias-label-secondary': '#B4A389',
      '--dsw-alias-state-error-primary': '#E26D5C',
      '--dsw-alias-state-success-primary': '#A8D34A',
      '--dsw-alias-state-warn-primary': '#E8A13A',
      '--dsw-specific-sidebar-fill': '#120F0B',
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
  '.lulu-hero { display: flex; gap: 14px; align-items: center; padding: 14px; border-radius: 14px; background: var(--dsw-alias-bg-layer-1); border: 1px solid var(--dsw-alias-border-l1); }',
  '.lulu-hero img { width: 76px; height: auto; animation: lulu-bob 3.6s ease-in-out infinite; }',
  '.lulu-hero-placeholder { font-size: 44px; animation: lulu-bob 3.6s ease-in-out infinite; }',
  '.lulu-hero-title { font-weight: 600; font-size: 14px; }',
  '.lulu-hero-desc { margin-top: 4px; color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 1.6; }',
  '.lulu-theme-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }',
  '.lulu-theme-card { border: 1px solid var(--dsw-alias-border-l1); border-radius: 10px; padding: 10px; background: var(--dsw-alias-bg-layer-1); cursor: pointer; text-align: left; transition: border-color 0.15s, box-shadow 0.15s; }',
  '.lulu-theme-card:hover { border-color: var(--dsw-alias-brand-primary); }',
  '.lulu-theme-card.active { border-color: var(--dsw-alias-brand-primary); box-shadow: 0 0 0 1px var(--dsw-alias-brand-primary); }',
  '.lulu-theme-swatch { width: 100%; height: 14px; border-radius: 6px; margin-bottom: 8px; border: 1px solid var(--dsw-alias-border-l1); }',
  '.lulu-theme-name { font-weight: 600; font-size: 13px; }',
  '.lulu-theme-desc { margin-top: 2px; color: var(--dsw-alias-label-secondary); font-size: 12px; }',
  '.lulu-row { display: flex; gap: 8px; flex-wrap: wrap; }',
  '.lulu-btn { border: 1px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); border-radius: 8px; padding: 7px 12px; font-size: 12px; cursor: pointer; transition: border-color 0.15s; }',
  '.lulu-btn:hover { border-color: var(--dsw-alias-brand-primary); }',
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
  const choices = [
    { id: 'lulu-cream', name: '噜噜 · 奶油咖啡', desc: '暖奶油底 + 橘子橙', swatch: 'linear-gradient(90deg, #FFF7E6 62%, #E8820F 38%)' },
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
      React.createElement('h3', null, '主题切换'),
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
      React.createElement('h3', null, '桌面宠物'),
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
