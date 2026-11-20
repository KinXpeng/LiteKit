/**
 * 全站图案语言：整幅细网格 + 同心弧 + 十字点。
 * 只在首屏和深色页脚用，别扩散到内容区 —— 图案一多就变成装饰噪音。
 * 边缘用径向渐变「化掉」，左上留白区保持纯白，文字永远压在干净底上。
 */

const GRID = 80
const W = 1440
const H = 780

const verticals = Array.from({ length: Math.floor((W - 1) / GRID) }, (_, i) => (i + 1) * GRID)
const horizontals = Array.from({ length: Math.floor((H - 1) / GRID) }, (_, i) => (i + 1) * GRID)
const arcs = [160, 260, 360, 460]
const marks: Array<[number, number]> = [
  [560, 160],
  [880, 400],
  [1200, 240],
]

/** 首屏图案：满铺网格，从右上角向外扩散的弧线，向左下渐隐成纯白 */
export function HeroPattern() {
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden focusable="false">
      <defs>
        <radialGradient id="hero-fade" cx="0.84" cy="0.1" r="0.78">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="1" />
        </radialGradient>
      </defs>

      <g stroke="#EDF0F5" strokeWidth="1">
        {verticals.map((x) => (
          <line key={`v${x}`} x1={x} y1={0} x2={x} y2={H} />
        ))}
        {horizontals.map((y) => (
          <line key={`h${y}`} x1={0} y1={y} x2={W} y2={y} />
        ))}
      </g>

      <g stroke="#E2E8F2" strokeWidth="1">
        {arcs.map((r) => (
          <circle key={r} cx={1260} cy={0} r={r} />
        ))}
      </g>

      <g stroke="#C4CCD8" strokeWidth="1" strokeLinecap="round">
        {marks.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <line x1={x - 4} y1={y} x2={x + 4} y2={y} />
            <line x1={x} y1={y - 4} x2={x} y2={y + 4} />
          </g>
        ))}
      </g>

      <rect width={W} height={H} fill="url(#hero-fade)" />
    </svg>
  )
}

const footerArcs = [200, 300, 400]

/** 深色页脚顶部：更密的暗网格 + 右上角一段弧线，和首屏是同一套语言 */
export function FooterPattern() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[440px] overflow-hidden">
      <div className="grid-backdrop-dark absolute inset-0" />
      <svg
        width="560"
        height="440"
        viewBox="0 0 560 440"
        fill="none"
        className="absolute right-0 top-0"
        focusable="false"
      >
        <g stroke="#1B2029" strokeWidth="1">
          {footerArcs.map((r) => (
            <circle key={r} cx={560} cy={0} r={r} />
          ))}
        </g>
      </svg>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,11,13,0.12),rgba(10,11,13,0.55)_45%,#0A0B0D_88%)]" />
    </div>
  )
}
