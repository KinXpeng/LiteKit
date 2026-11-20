/**
 * 启动前置检查：Vite 5 需要 Node 18+。
 * 版本不够时给一句人话，而不是让 Vite 抛 crypto$2.getRandomValues 这种看不懂的错。
 */
const REQUIRED_MAJOR = 18
const current = process.versions.node
const major = Number(current.split('.')[0])

if (major < REQUIRED_MAJOR) {
  console.error('')
  console.error(`✖ 当前 Node 版本是 ${current}，这个项目需要 Node ${REQUIRED_MAJOR} 或更高。`)
  console.error('')
  console.error('  解决办法（任选一个）：')
  console.error('    1. 用 nvm 切到已装好的新版本：  nvm use 22.23.2')
  console.error('    2. 安装一个新的 LTS：          nvm install 22 && nvm use 22')
  console.error('')
  console.error('  切完用 node -v 确认，再重新执行 npm run dev。')
  console.error('')
  process.exit(1)
}
