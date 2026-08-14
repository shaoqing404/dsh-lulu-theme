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

## 两套主题的 token 映射

皮肤通过 `theme.register()` 注册主题，覆盖 DSH 的 13 个 `--dsw-alias-*` 令牌：

### 噜噜·奶油咖啡（light）

| Token | 值 | 含义 |
| --- | --- | --- |
| bg-base | `#FFF7E6` | 暖奶油底 |
| bg-layer-1/2 | `#FFFCF4` / `#F9EED6` | 层级表面 |
| bg-overlay | `#FFFDF8` | 浮层 |
| border-l1/l2 | `#EFE0C4` / `#DFC896` | 描边 |
| brand-primary | `#E8820F` | 品牌强调（深橘，保证对比度） |
| label-primary/secondary | `#2B2118` / `#6E5D49` | 正文 / 次级文字（深棕代替纯黑） |
| state-error/success/warn | `#C94F3D` / `#5FA82C` / `#D98E1F` | 状态色（叶绿=成功） |
| sidebar-fill | `#FAF0DC` | 侧栏底色 |

### 噜噜·暖夜（dark）

| Token | 值 | 含义 |
| --- | --- | --- |
| bg-base | `#171310` | 近黑暖棕夜底（沿用 spritesheet 底色体系） |
| bg-layer-1/2 | `#221C15` / `#2C241B` | 层级表面 |
| border-l1/l2 | `#3B3226` / `#5A4C38` | 描边 |
| brand-primary | `#F2B01E` | 亮橘强调 |
| label-primary/secondary | `#FFF1D0` / `#B4A389` | 暖奶油文字 |
| state-* | `#E26D5C` / `#A8D34A` / `#E8A13A` | 状态色 |
| sidebar-fill | `#120F0B` | 侧栏更深一档 |

## 怎么改

改 `scripts/build_plugin.py` 里 `LULU_THEMES` 的 tokens，然后：

```bash
uv run --with pillow python scripts/build_plugin.py
```

重新生成 `plugin/` 下三个产物后，用新 Package（cordis_define 追加 + update）生效。
