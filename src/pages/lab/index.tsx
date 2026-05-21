import { useState, useEffect, useRef, MouseEvent } from 'react'

const Spotlight = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div ref={ref} onMouseMove={onMove} className={`spotlight-card ${className}`}>
      {children}
    </div>
  )
}

const Lab = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const technologies = [
    { name: 'React',      desc: 'UI framework',  v: '18', glow: 'var(--cyan)' },
    { name: 'TypeScript', desc: 'Type safety',   v: '5',  glow: 'var(--accent)' },
    { name: 'Vite',       desc: 'Build engine',  v: '4',  glow: 'var(--violet)' },
    { name: 'Tailwind',   desc: 'Atomic CSS',    v: '3',  glow: 'var(--pink)' },
  ]

  const features = [
    { num: '01', title: '本地处理', en: 'On-device',     desc: '所有数据仅在浏览器本地处理，不上传至任何服务器。', glow: 'var(--mint)' },
    { num: '02', title: '即开即用', en: 'Friction-free', desc: '无需注册、无需登录，打开即可使用全部功能。',           glow: 'var(--cyan)' },
    { num: '03', title: '轻量高效', en: 'Lightweight',   desc: '基于现代 Web 技术构建，快速响应，触手可得。',           glow: 'var(--violet)' },
    { num: '04', title: '简洁美观', en: 'Considered',    desc: '精心设计的界面，操作直观便捷，每一处都经得起细看。',  glow: 'var(--pink)' },
  ]

  const values = [
    { title: '隐私优先', en: 'Privacy', desc: '数据仅在本地处理', glow: 'var(--mint)' },
    { title: '极速响应', en: 'Speed',   desc: '无需等待即时使用', glow: 'var(--cyan)' },
    { title: '开源精神', en: 'Open',    desc: '免费使用持续迭代', glow: 'var(--violet)' },
  ]

  const ribbon = ['LiteKit', 'Open Source', '轻 / 序', 'Tools', 'Privacy First', 'Local Only', '简单才是对的', 'MMXXVI']

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 w-full max-w-[1180px] mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-16">

        {/* ═══ HERO ═══ */}
        <section className={`mb-20 ${isLoaded ? 'animate-slideUp' : 'opacity-0'}`}>
          <div className="flex items-baseline justify-between mb-4">
            <div className="section-marker">§ 02 · Laboratory</div>
            <span className="chip">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--mint)', boxShadow: '0 0 6px var(--mint)' }} />
              Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mt-10">
            {/* Title */}
            <div className="md:col-span-7">
              <h1 className="leading-[0.92] tracking-tight">
                <span className="block text-6xl sm:text-7xl font-chinese-display font-bold" style={{ fontFamily: 'AlimamaShuHeiTi-Bold', color: 'var(--text)' }}>
                  实验室。
                </span>
                <span className="block text-5xl sm:text-6xl font-chinese-display font-bold mt-1" style={{ fontFamily: 'AlimamaShuHeiTi-Bold' }}>
                  <span className="gradient-text">Tools are born here.</span>
                </span>
              </h1>

              <p className="mt-8 text-lg leading-relaxed max-w-xl" style={{ color: 'var(--text-secondary)' }}>
                我们相信工具应该简单、高效、触手可及。LiteKit 致力于打造轻盈而强大的在线工具集，
                让每一次操作都变得轻松愉悦。<span style={{ color: 'var(--text)' }}>无需注册，无需付费，</span>
                一切都在你的浏览器中安全完成。
              </p>

              {/* CTA chips */}
              <div className="mt-8 flex flex-wrap items-center gap-2.5">
                <span className="chip chip-accent">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                  Vol. MMXXVI
                </span>
                <span className="chip">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--cyan)' }} />
                  v1.0.0
                </span>
                <span className="chip">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--mint)' }} />
                  100% client-side
                </span>
              </div>
            </div>

            {/* Animated emblem */}
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="relative w-56 h-56 sm:w-72 sm:h-72">
                {/* Glow */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                />
                <svg viewBox="0 0 240 240" className="relative w-full h-full">
                  <defs>
                    <linearGradient id="labGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--cyan)" />
                      <stop offset="50%" stopColor="var(--accent)" />
                      <stop offset="100%" stopColor="var(--violet)" />
                    </linearGradient>
                    <filter id="labGlow">
                      <feGaussianBlur stdDeviation="3" />
                    </filter>
                  </defs>
                  {/* Outer slow ring */}
                  <circle cx="120" cy="120" r="116" stroke="url(#labGrad)" strokeWidth="0.75" strokeDasharray="3 8" fill="none" className="animate-spin-slow" style={{ transformOrigin: 'center' }} />
                  {/* Inner reverse ring */}
                  <circle cx="120" cy="120" r="92" stroke="url(#labGrad)" strokeWidth="1" strokeDasharray="2 6" fill="none" className="animate-spin-rev" style={{ transformOrigin: 'center' }} />
                  {/* Mid ring (static) */}
                  <circle cx="120" cy="120" r="74" stroke="url(#labGrad)" strokeWidth="0.5" opacity="0.4" fill="none" />
                  {/* Center hex */}
                  <polygon
                    points="120,52 178,90 178,158 120,196 62,158 62,90"
                    stroke="url(#labGrad)"
                    strokeWidth="1.5"
                    fill="rgba(110,107,255,0.08)"
                  />
                  {/* Flask */}
                  <path
                    d="M104 88 L104 116 L92 140 L92 170 L148 170 L148 140 L136 116 L136 88 Z"
                    stroke="url(#labGrad)"
                    strokeWidth="2"
                    fill="rgba(0,230,255,0.08)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line x1="100" y1="88" x2="140" y2="88" stroke="url(#labGrad)" strokeWidth="2" strokeLinecap="round" />
                  {/* Animated bubbles */}
                  <circle cx="110" cy="152" r="4" fill="var(--cyan)" opacity="0.7" className="animate-float" />
                  <circle cx="128" cy="146" r="3" fill="var(--violet)" opacity="0.6" className="animate-float" style={{ animationDelay: '0.4s' }} />
                  <circle cx="120" cy="138" r="3.5" fill="var(--accent)" opacity="0.65" className="animate-float" style={{ animationDelay: '0.8s' }} />
                  {/* Crosshair markers */}
                  <circle cx="120" cy="20" r="3" fill="var(--cyan)" filter="url(#labGlow)" className="animate-pulse" />
                  <circle cx="120" cy="220" r="3" fill="var(--violet)" filter="url(#labGlow)" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <circle cx="20" cy="120" r="3" fill="var(--accent)" filter="url(#labGlow)" className="animate-pulse" style={{ animationDelay: '1s' }} />
                  <circle cx="220" cy="120" r="3" fill="var(--pink)" filter="url(#labGlow)" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ RIBBON MARQUEE ═══ */}
        <section className={`mb-20 ${isLoaded ? 'animate-slideUp delay-100' : 'opacity-0'}`}>
          <div
            className="border-y py-5"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="marquee">
              <div className="marquee-track animate-marquee-slow">
                {[...ribbon, ...ribbon, ...ribbon].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 shrink-0">
                    <span className="font-display text-2xl font-medium" style={{ color: i % 4 === 0 ? 'var(--cyan)' : i % 4 === 1 ? 'var(--accent)' : i % 4 === 2 ? 'var(--violet)' : 'var(--text)' }}>
                      {item}
                    </span>
                    <span className="text-2xl opacity-30">★</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TECH STACK ═══ */}
        <section className={`mb-20 ${isLoaded ? 'animate-slideUp delay-200' : 'opacity-0'}`}>
          <div className="flex items-baseline justify-between mb-6">
            <div className="section-marker">· Stack</div>
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: 'var(--text-muted)' }}>{technologies.length} libraries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-chinese-display font-bold leading-[0.95] tracking-tight mb-8" style={{ fontFamily: 'AlimamaShuHeiTi-Bold', color: 'var(--text)' }}>
            Built with <span className="gradient-text">现代 Web 技术</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {technologies.map((tech, i) => (
              <Spotlight key={tech.name} className="group">
                <div className="p-6 transition-all duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="flex items-baseline justify-between mb-4">
                    <span
                      className="font-display font-bold leading-none"
                      style={{
                        fontSize: '2.6rem',
                        background: `linear-gradient(135deg, ${tech.glow}, var(--accent))`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: `drop-shadow(0 0 16px ${tech.glow})`,
                      }}
                    >
                      {tech.name[0]}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.22em] px-2 py-0.5 rounded-md" style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                      v{tech.v}
                    </span>
                  </div>
                  <p className="text-base font-medium mb-1" style={{ color: 'var(--text)' }}>{tech.name}</p>
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: 'var(--text-muted)' }}>{tech.desc}</p>

                  {/* Bottom hover line */}
                  <div
                    className="mt-4 h-px transition-all duration-500"
                    style={{ width: '0%', background: `linear-gradient(90deg, ${tech.glow}, transparent)` }}
                  />
                </div>
              </Spotlight>
            ))}
          </div>
        </section>

        {/* ═══ FEATURES ═══ */}
        <section className={`mb-20 ${isLoaded ? 'animate-slideUp delay-300' : 'opacity-0'}`}>
          <div className="flex items-baseline justify-between mb-6">
            <div className="section-marker">· Core Features</div>
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: 'var(--text-muted)' }}>04 items</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-chinese-display font-bold leading-[0.95] tracking-tight mb-8" style={{ fontFamily: 'AlimamaShuHeiTi-Bold', color: 'var(--text)' }}>
            为什么 <span className="gradient-text">选择 LiteKit</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            {features.map((feature) => (
              <Spotlight key={feature.title} className="group">
                <div className="p-7 relative">
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 h-px transition-all duration-500"
                    style={{
                      width: '50%',
                      background: `linear-gradient(90deg, ${feature.glow}, transparent)`,
                      boxShadow: `0 0 12px ${feature.glow}`,
                    }}
                  />
                  <div className="flex items-baseline justify-between mb-4">
                    <span
                      className="font-display font-bold leading-none"
                      style={{
                        fontSize: '2.4rem',
                        background: `linear-gradient(135deg, ${feature.glow}, var(--accent))`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: `drop-shadow(0 0 12px ${feature.glow})`,
                      }}
                    >
                      {feature.num}
                    </span>
                    <span className="chip">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: feature.glow, boxShadow: `0 0 6px ${feature.glow}` }} />
                      {feature.en}
                    </span>
                  </div>
                  <h3 className="text-2xl font-chinese-display font-bold mb-2" style={{ fontFamily: 'AlimamaShuHeiTi-Bold', color: 'var(--text)' }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                </div>
              </Spotlight>
            ))}
          </div>
        </section>

        {/* ═══ VALUES ═══ */}
        <section className={`${isLoaded ? 'animate-slideUp delay-400' : 'opacity-0'}`}>
          <div className="flex items-baseline justify-between mb-6">
            <div className="section-marker">· Values</div>
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: 'var(--text-muted)' }}>triad</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
            {values.map((v, idx) => (
              <div
                key={v.title}
                className="relative card group p-7 transition-all duration-700 overflow-hidden"
              >
                {/* Hover gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top right, ${v.glow}26, transparent 70%)` }}
                />
                {/* Top neon */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${v.glow}, transparent)`, boxShadow: `0 0 8px ${v.glow}`, opacity: 0.6 }}
                />

                <div className="relative">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="font-mono text-[10px] tracking-[0.22em]" style={{ color: 'var(--text-muted)' }}>
                      0{idx + 1} ·
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase font-medium" style={{ color: v.glow }}>
                      {v.en}
                    </span>
                  </div>
                  <h3 className="text-2xl font-chinese-display font-bold mb-2" style={{ fontFamily: 'AlimamaShuHeiTi-Bold', color: 'var(--text)' }}>
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{v.desc}</p>

                  <div
                    className="mt-5 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                    style={{
                      background: `${v.glow}26`,
                      color: v.glow,
                      boxShadow: `0 0 12px ${v.glow}40`,
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      {idx === 0 && <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />}
                      {idx === 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />}
                      {idx === 2 && <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />}
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-12">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="divider-gradient mb-6" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="dot-glow" />
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase" style={{ color: 'var(--text-secondary)' }}>
                made quietly · for what matters
              </p>
            </div>
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: 'var(--text-muted)' }}>
              © 2026 LiteKit. 保留所有权利。
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Lab
