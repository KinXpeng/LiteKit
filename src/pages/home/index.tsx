import { useState, useEffect, useRef, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { appConfig } from '../../configs'

const useCountUp = (target: number, durationMs = 1600, start = true) => {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs)
      const eased = 1 - Math.pow(1 - p, 3)
      setV(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, durationMs, start])
  return v
}

const Spotlight = ({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div ref={ref} onMouseMove={onMove} className={`spotlight-card ${className}`} style={style}>
      {children}
    </div>
  )
}

const Home = () => {
  const [heroIn, setHeroIn] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setHeroIn(true)))
  }, [])

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      const hh = String(d.getHours()).padStart(2, '0')
      const mm = String(d.getMinutes()).padStart(2, '0')
      const ss = String(d.getSeconds()).padStart(2, '0')
      setTime(`${hh}:${mm}:${ss}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // Animated counters
  const c1 = useCountUp(4, 1400, heroIn)
  const c2 = useCountUp(100, 1800, heroIn)
  const c3 = useCountUp(0, 1200, heroIn) // placeholder if needed
  void c3

  const tools = [
    {
      to: '/file-converter',
      num: '01',
      title: '文件转换',
      titleEn: 'File Converter',
      subtitle: 'PDF ↔ Word',
      desc: '云端引擎高速互转，完成后自动删除，安全高效。',
      tags: ['CloudConvert', '< 100 MB', 'PDF', 'DOCX'],
      glow: 'var(--cyan)',
    },
    {
      to: '/image-processor',
      num: '02',
      title: '图片处理',
      titleEn: 'Image Atelier',
      subtitle: '裁剪 · 换底 · 排版 · 压缩',
      desc: '一站式图片工作台，所有处理均在浏览器本地完成。',
      tags: ['Local-only', 'Canvas API', 'WebP', 'No-upload'],
      glow: 'var(--violet)',
    },
  ]

  const principles = [
    { num: '01', title: '本地优先', titleEn: 'Local-first', desc: '所有文件操作均在浏览器中完成，数据绝不离开你的设备。', dot: 'var(--mint)' },
    { num: '02', title: '即开即用', titleEn: 'Friction-free', desc: '无需注册、无需登录，打开浏览器即可使用全部功能。', dot: 'var(--cyan)' },
    { num: '03', title: '开源透明', titleEn: 'Open & honest', desc: '代码完全开放，无广告、无追踪、无隐藏付费。', dot: 'var(--violet)' },
  ]

  const stack = ['React 18', 'TypeScript 5', 'Vite 4', 'Tailwind 3', 'Ant Design 6', 'CloudConvert API', 'Canvas API', 'WebAssembly']

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10">
        {/* ═══════════════ HERO ═══════════════ */}
        <section className="pt-20 sm:pt-28 pb-16 sm:pb-24 relative">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-10">

            {/* Top status bar */}
            <div
              className="flex flex-wrap items-center justify-between gap-3 mb-12 sm:mb-16 transition-all duration-700"
              style={{ opacity: heroIn ? 1 : 0, transform: heroIn ? 'translateY(0)' : 'translateY(-8px)' }}
            >
              <div className="flex items-center gap-3">
                <span className="dot-glow" />
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase" style={{ color: 'var(--text-secondary)' }}>
                  System · Online
                </span>
                <span className="hidden sm:inline-block w-px h-3" style={{ backgroundColor: 'var(--border)' }} />
                <span className="hidden sm:inline-flex font-mono text-[11px] tracking-[0.22em]" style={{ color: 'var(--text-muted)' }}>
                  v1.0.0
                </span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase" style={{ color: 'var(--text-muted)' }}>
                <span className="numeric" style={{ color: 'var(--cyan)' }}>{time}</span>
                <span>· UTC+8</span>
              </div>
            </div>

            {/* Eyebrow */}
            <div
              className="flex items-center gap-4 mb-8 transition-all duration-700 delay-100"
              style={{ opacity: heroIn ? 1 : 0, transform: heroIn ? 'translateY(0)' : 'translateY(8px)' }}
            >
              <span className="chip chip-accent">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Open Source · Toolkit
              </span>
            </div>

            {/* Mega headline */}
            <h1
              className="leading-[0.92] tracking-tight max-w-5xl transition-all duration-700 delay-200"
              style={{
                transform: heroIn ? 'translateY(0)' : 'translateY(24px)',
                opacity: heroIn ? 1 : 0,
              }}
            >
              <span
                className="block text-6xl sm:text-7xl md:text-8xl font-chinese-display font-bold"
                style={{ fontFamily: 'AlimamaShuHeiTi-Bold', color: 'var(--text)' }}
              >
                简单，
              </span>
              <span className="block text-6xl sm:text-7xl md:text-8xl font-chinese-display font-bold mt-1" style={{ fontFamily: 'AlimamaShuHeiTi-Bold' }}>
                <span className="gradient-text">才是对的。</span>
              </span>
            </h1>

            {/* Animated underline */}
            <div
              className="mt-6 h-px transition-all"
              style={{
                width: heroIn ? '180px' : '0px',
                background: 'linear-gradient(90deg, var(--cyan), var(--accent), var(--violet))',
                transitionDuration: '1200ms',
                transitionDelay: '600ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 0 12px var(--accent-glow)',
              }}
            />

            {/* Subtext */}
            <div
              className="mt-10 grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-10 transition-all duration-700 delay-300"
              style={{ transform: heroIn ? 'translateY(0)' : 'translateY(12px)', opacity: heroIn ? 1 : 0 }}
            >
              <p className="sm:col-span-7 text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                轻量级在线工具集 — <span style={{ color: 'var(--text)' }}>不上传、不跟踪、不收费</span>。
                所有数据留在你的设备上，即开即用。
              </p>
              <div className="sm:col-span-4 sm:col-start-9 grid grid-cols-2 gap-4">
                <div>
                  <div className="font-display text-3xl font-bold numeric" style={{ color: 'var(--text)' }}>
                    <span className="gradient-text">0{c1}</span>
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase mt-1" style={{ color: 'var(--text-muted)' }}>
                    Tools online
                  </div>
                </div>
                <div>
                  <div className="font-display text-3xl font-bold numeric" style={{ color: 'var(--text)' }}>
                    {c2}<span style={{ color: 'var(--mint)' }}>%</span>
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase mt-1" style={{ color: 'var(--text-muted)' }}>
                    Privacy · safe
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div
              className="mt-12 flex flex-wrap items-center gap-4 transition-all duration-700 delay-400"
              style={{ transform: heroIn ? 'translateY(0)' : 'translateY(8px)', opacity: heroIn ? 1 : 0 }}
            >
              <Link to="/file-converter">
                <button className="btn-gradient px-7 py-3.5 text-sm inline-flex items-center gap-2.5">
                  <span>立即开始</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Link>
              <Link to="/lab">
                <button className="btn-secondary px-7 py-3.5 text-sm inline-flex items-center gap-2">
                  <span>了解更多</span>
                  <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
              <div className="hidden sm:flex items-center gap-2 ml-2 font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: 'var(--text-muted)' }}>
                <span className="animate-blink">▮</span>
                <span>press to launch</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ TECH STACK MARQUEE ═══════════════ */}
        <section className="py-8 sm:py-10 relative overflow-hidden">
          <div
            className="border-y transition-all duration-700"
            style={{
              borderColor: 'var(--border)',
              opacity: heroIn ? 1 : 0,
              transitionDelay: '600ms',
            }}
          >
            <div className="marquee py-5">
              <div className="marquee-track animate-marquee">
                {[...stack, ...stack].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 shrink-0">
                    <span className="font-mono text-[11px] tracking-[0.22em] uppercase" style={{ color: 'var(--text-muted)' }}>
                      {item}
                    </span>
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ TOOLS ═══════════════ */}
        <section className="pt-20 sm:pt-28 pb-20 sm:pb-28 relative">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-10">

            {/* Section header */}
            <div
              className="mb-12 sm:mb-16 transition-all duration-700"
              style={{
                transform: heroIn ? 'translateY(0)' : 'translateY(16px)',
                opacity: heroIn ? 1 : 0,
                transitionDelay: '700ms',
              }}
            >
              <div className="flex items-baseline justify-between mb-4">
                <div className="section-marker">§ 核心工具 · Tools</div>
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: 'var(--text-muted)' }}>02 / 03</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-chinese-display font-bold leading-[0.95] tracking-tight max-w-3xl" style={{ fontFamily: 'AlimamaShuHeiTi-Bold', color: 'var(--text)' }}>
                所有工具，<br />
                <span className="gradient-text">为效率而生。</span>
              </h2>
            </div>

            {/* Tool spotlight cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {tools.map((tool, i) => (
                <Link
                  to={tool.to}
                  key={tool.title}
                  className={`block transition-all duration-700 ${heroIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${800 + i * 120}ms` }}
                >
                  <Spotlight className="group h-full" style={{ borderRadius: '20px' }}>
                    <div className="p-8 sm:p-10 h-full flex flex-col" style={{ minHeight: '340px' }}>
                      {/* Top row */}
                      <div className="flex items-start justify-between mb-8">
                        <span
                          className="font-display font-bold leading-none transition-all duration-500 group-hover:scale-105"
                          style={{
                            fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                            background: `linear-gradient(135deg, ${tool.glow}, var(--accent))`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            letterSpacing: '-0.04em',
                            filter: `drop-shadow(0 0 20px ${tool.glow})`,
                          }}
                        >
                          {tool.num}
                        </span>
                        <div className="flex flex-col items-end gap-3">
                          <div className="chip">
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: tool.glow, boxShadow: `0 0 6px ${tool.glow}` }} />
                            <span>{tool.titleEn}</span>
                          </div>
                          <div
                            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-400 group-hover:translate-x-1 group-hover:scale-110"
                            style={{
                              border: '1px solid var(--border-hover)',
                              background: 'var(--bg-card)',
                              color: 'var(--text)',
                            }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="flex-1">
                        <h3 className="text-3xl sm:text-4xl font-chinese-display font-bold mb-2" style={{ fontFamily: 'AlimamaShuHeiTi-Bold', color: 'var(--text)' }}>
                          {tool.title}
                        </h3>
                        <p
                          className="font-mono text-xs tracking-[0.18em] uppercase mb-5 transition-colors duration-300"
                          style={{ color: tool.glow }}
                        >
                          ▸ {tool.subtitle}
                        </p>
                        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                          {tool.desc}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {tool.tags.map(t => (
                          <span
                            key={t}
                            className="font-mono text-[10px] px-2 py-1 rounded-md tracking-[0.1em] uppercase"
                            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Spotlight>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ PRINCIPLES ═══════════════ */}
        <section className="pb-24 sm:pb-32 relative">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
            <div
              className="mb-14 transition-all duration-700"
              style={{ transform: heroIn ? 'translateY(0)' : 'translateY(12px)', opacity: heroIn ? 1 : 0, transitionDelay: '900ms' }}
            >
              <div className="flex items-baseline justify-between mb-4">
                <div className="section-marker">§ 主张 · Principles</div>
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: 'var(--text-muted)' }}>03 / 03</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-chinese-display font-bold leading-[0.95] tracking-tight max-w-3xl" style={{ fontFamily: 'AlimamaShuHeiTi-Bold', color: 'var(--text)' }}>
                我们相信好工具，<br />
                <span className="gradient-text">应该悄悄变好。</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-5 lg:gap-6">
              {principles.map((p, i) => (
                <div
                  key={p.title}
                  className="card relative overflow-hidden group p-7 transition-all duration-700"
                  style={{
                    transform: heroIn ? 'translateY(0)' : 'translateY(16px)',
                    opacity: heroIn ? 1 : 0,
                    transitionDelay: `${1000 + i * 100}ms`,
                  }}
                >
                  {/* Hover gradient wash */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at top right, ${p.dot}26, transparent 70%)` }}
                  />
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 h-px transition-all duration-500"
                    style={{
                      width: '40%',
                      background: `linear-gradient(90deg, ${p.dot}, transparent)`,
                      boxShadow: `0 0 12px ${p.dot}`,
                    }}
                  />

                  <div className="relative">
                    <div className="flex items-center justify-between mb-5">
                      <span
                        className="font-mono text-xs tracking-[0.22em] font-medium"
                        style={{ color: p.dot }}
                      >
                        / {p.num}
                      </span>
                      <span className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150" style={{ backgroundColor: p.dot, boxShadow: `0 0 8px ${p.dot}` }} />
                    </div>
                    <p className="font-mono text-[10px] tracking-[0.22em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>{p.titleEn}</p>
                    <h3 className="text-2xl font-chinese-display font-bold mb-3" style={{ fontFamily: 'AlimamaShuHeiTi-Bold', color: 'var(--text)' }}>{p.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ FOOTER ═══════════════ */}
        <footer className="pb-12 relative">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
            <div className="divider-gradient mb-8" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="dot-glow" />
                <p className="font-mono text-[11px] tracking-[0.22em] uppercase" style={{ color: 'var(--text-secondary)' }}>
                  stay simple · stay fast
                </p>
              </div>
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: 'var(--text-muted)' }}>
                {appConfig.copyright}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home
