# 主题配色说明 · 水豚噜噜

## 取色来源

配色由 BlueAI 视觉模型（claude-opus-4-8）从真实 spritesheet 帧逐色取色校准，不是凭空捏造：

| 色值 | 角色里的位置 |
| --- | --- |
| `#F2B01E` | 身体主色（温暖橘黄） |
| `#E8820F` | 吻部/腹部深色（深橘） |
| `#FFD34D` | 受光面高光（浅黄） |
| `#F7941D` | 头顶橘子（饱和橘） |
| `#5FA82C` / `#A8D34A` | 橘子叶 / 待机手里的小风扇（绿） |
| `#2B2118` | 眼睛与轮廓阴影（近黑深棕） |

## 不是只换 13 个颜色：全量令牌换装

皮肤通过 `theme.register()` 注册主题，每套主题覆盖 **107 个 `--dsw-*` 令牌**（从 DSH `body` 样式表全量枚举），
包括 13 个官方可检查令牌之外的组件级令牌：

| 组件区域 | 覆盖的令牌 | 噜噜化处理 |
| --- | --- | --- |
| 按钮（五大家族） | `button-primary-fill/hover`、`button-info-*`、`button-ghost-active-*`、`button-floating-*`、`button-tool-bar-*`、`button-contrast-fill` | 主按钮=眼睛同款近黑深棕；信息按钮=橘子橙 `#C96A0B`；幽灵/浮动按钮=奶油底 |
| 链接/焦点/业务色 | `state-business-primary`（135 处引用） | DeepSeek 蓝 → 橘子橙（浅色 `#C96A0B` / 深色 `#F2B01E`） |
| 悬停/按下洗染 | `interactive-bg-hover/active/accent/solid/danger` | 全部换成橙色暖洗染 |
| 输入框/编写器 | `specific-input-major`、`login-input`、`select/selector` | 暖奶油内凹底 + 暖棕描边 |
| 消息气泡 | `specific-bubble/highlight` | 奶油气泡（浅色）/ 暖棕气泡（深色） |
| 侧栏 | `specific-sidebar-fill`、`nav-item-active/hover`、`active-accent` | 奶油侧栏 + 橘子橙选中条 |
| 菜单/弹层 | `specific-menu`、`bg-overlay`、`border-inverted` | 暖底 + 暖棕描边 |
| Markdown/代码块 | `markdown-code-block/banner/inline-code/citation/tag` | 奶油代码底（浅色）/ 暖棕（深色） |
| 滚动条 | `scrollbar-bg/hover-l1/l2` | 奶油/暖棕，hover 加深 |
| 阴影 | `shadow-lv1/2/3` | 黑阴影 → 暖棕阴影 |
| 字体 | `font-family` | SF Pro Rounded 圆体字优先（噜噜的圆润感） |
| 状态色 | `state-error/success/warn-*` | 成功=橘子叶绿，警告=琥珀橘 |
| 文本 | `label-primary/secondary/tertiary/caption/dimmed/…` | 纯黑 → 深棕 `#2B2118`，层级用暖灰棕 |

## 两套主题速览

| | 噜噜 · 奶油咖啡（light） | 噜噜 · 暖夜（dark） |
| --- | --- | --- |
| 底色 | `#FFF7E6` 暖奶油 | `#171310` 近黑暖棕 |
| 强调 | `#C96A0B` 橘子橙 | `#F2B01E` 亮橘 |
| 正文 | `#2B2118` 深棕 | `#FFF1D0` 暖奶油 |

## 怎么改

改 `scripts/build_plugin.py` 里的 `LULU_LIGHT` / `LULU_NIGHT` 两个字典（每个 107 个令牌），然后：

```bash
uv run --with pillow python scripts/build_plugin.py
```

重新生成 `plugin/` 下三个产物后，用新 Package（cordis_define 追加 + update）生效。
