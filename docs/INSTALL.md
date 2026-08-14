# 安装与使用 · 水豚噜噜 DSH 皮肤

## 这是什么

水豚噜噜皮肤是一个 DSH（DeepSeek Harness）**动态 Cordis 插件**，包含：

- 两套可选主题：`噜噜·奶油咖啡`（浅色）、`噜噜·暖夜`（深色）
- 设置面板「噜噜水豚」：随时切换主题、藏起/召唤宠物
- 桌面宠物：角落里的动画水豚噜噜（待机摇摇、点击挥手、拖动换位置）

## 安装方式（二选一）

### 方式 A：单文件版（推荐分发）

`plugin/client.js` 是自包含单文件（噜噜帧已内嵌 base64），任何机器都能直接用：

1. 克隆仓库：`git clone https://github.com/shaoqing404/dsh-lulu-theme.git`
2. 打开你的 DSH 会话，说：**"用 cordis_define 定义插件：把 /Users/.../dsh-lulu-theme/plugin/client.js 的完整内容作为 code.client，然后 cordis_run"**
3. 在界面里批准该插件（会话级授权）。

> DSH 的动态插件由模型通过 cordis_define/cordis_run 工具定义，这是当前用户级皮肤的唯一入口。

### 方式 B：运行时变体（本机快速安装）

仓库里还有一对 `plugin/runtime.host.js` + `plugin/runtime.client.js`：Host 半边从本地帧目录读文件、经 RPC 传给 Client，代码体积小、方便会话里快速激活。候选帧目录（按序尝试）：

```
<仓库>/assets/frames/small
~/dsh-lulu-theme/assets/frames/small
~/.dsh/skins/lulu-theme/assets/frames/small
```

## 切换与恢复

- 打开设置 →「噜噜水豚」→ 主题切换：奶油咖啡 / 暖夜 / 原版浅色 / 原版深色 / 跟随系统。
- 宠物：点击 = 挥手；拖动 = 换位置；「藏起噜噜」= 隐藏。
- 卸载：让模型 `cordis_stop`（保留版本）或 `cordis_undefine`（彻底删除）该插件，主题即恢复原版。

## 生命周期（如实说明）

- 动态插件属于**当前会话与当前 DSH 进程**：进程重启后需要重新定义一次（仓库保证源码可复用）。
- 会话内刷新页面不丢插件（Host 持有定义，Client 重新激活）。
- 想长期默认生效：让模型在每次新会话开头按方式 A 安装，或把本仓库固定为一个安装提示词放进你的会话模板。

## 维护

- 改帧/改配色后重新构建：`uv run --with pillow python scripts/build_plugin.py`
- 帧素材来自 Codex 宠物 `~/.codex/pets/lulu-wiggle/spritesheet.webp`（8×9 图集），提取脚本 `scripts/extract_frames.py`。
