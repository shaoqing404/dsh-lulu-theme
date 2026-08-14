// 水豚噜噜 · 运行时 Host 半边：从本地帧目录读取 webp 帧，经 RPC 供 Client 使用。
// 分发请优先用 plugin/client.js（内嵌帧，单文件）；本变体用于本机快速安装。

const FRAME_DIRS = [
  '/Users/mac/Developer/element_workspace/dsh-lulu-theme/assets/frames/small',
  '/Users/mac/dsh-lulu-theme/assets/frames/small',
  '/Users/mac/.dsh/skins/lulu-theme/assets/frames/small',
]
const FRAME_NAMES = {
  idle: ['idle-0', 'idle-1', 'idle-2', 'idle-3', 'idle-4', 'idle-5'],
  wave: ['wave-0', 'wave-1', 'wave-2', 'wave-3'],
}
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

function bytesToBase64(bytes) {
  let out = ''
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i]
    const b1 = i + 1 < bytes.length ? bytes[i + 1] : -1
    const b2 = i + 2 < bytes.length ? bytes[i + 2] : -1
    out += ALPHA[b0 >> 2]
    out += ALPHA[((b0 & 3) << 4) | (b1 === -1 ? 0 : (b1 >> 4))]
    out += b1 === -1 ? '=' : ALPHA[((b1 & 15) << 2) | (b2 === -1 ? 0 : (b2 >> 6))]
    out += b2 === -1 ? '=' : ALPHA[b2 & 63]
  }
  return out
}

return {
  apply(ctx) {
    const fs = ctx.get('fs')
    if (fs === undefined) return
    harness.handle('lulu-frames', async function () {
      for (const dir of FRAME_DIRS) {
        try {
          const out = { idle: [], wave: [] }
          for (const kind of ['idle', 'wave']) {
            for (const name of FRAME_NAMES[kind]) {
              const target = await fs.resolve(dir + '/' + name + '.webp')
              const bytes = await fs.readBytes(target, undefined, 262144)
              out[kind].push('data:image/webp;base64,' + bytesToBase64(bytes))
            }
          }
          return { ok: true, dir: dir, frames: out }
        } catch (err) {
          // 尝试下一个候选目录
        }
      }
      return { ok: false, error: 'lulu frames not found in any candidate dir' }
    })
  },
}
