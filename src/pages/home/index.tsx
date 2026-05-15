import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { appConfig } from '../../configs'

const Home = () => {
  const [heroIn, setHeroIn] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setHeroIn(true))
    })
  }, [])

  const tools = [
    {
      to: '/file-converter',
      num: '01',
      title: '文件转换',
      subtitle: 'PDF ↔ Word',
      desc: '云端引擎高速互转，完成后自动删除，安全高效。',
      accent: '#6899f0',
    },
    {
      to: '/image-processor',
      num: '02',
      title: '图片处理',
      subtitle: '裁剪 · 换底 · 排版 · 压缩',
      desc: '一站式图片工作台，所有处理均在浏览器本地完成。',
      accent: '#a78bfa',
    },
  ]

  return (
    <div className="min-h-screen relative">
      {/* ── Background Atmosphere ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {/* Large soft glow — top */}
        <div
          className="absolute w-[900px] h-[900px] rounded-full blur-[180px] transition-opacity duration-1000"
          style={{
            background: 'radial-gradient(circle, rgba(104,153,240,.09) 0%, transparent 70%)',
            top: '-20%',
            left: '-10%',
            opacity: heroIn ? 1 : 0,
          }}
        />
        {/* Warm glow — bottom right */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[160px] transition-opacity duration-1000 delay-300"
          style={{
            background: 'radial-gradient(circle, rgba(240,160,96,.06) 0%, transparent 70%)',
            bottom: '-15%',
            right: '-8%',
            opacity: heroIn ? 1 : 0,
          }}
        />
        {/* Subtle grain overlay */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10">
        {/* ═══ HERO ═══ */}
        <section className="pt-24 sm:pt-36 pb-12 sm:pb-20">
          <div className="max-w-6xl mx-auto px-6 sm:px-10">
            {/* Eyebrow */}
            <p
              className={`text-xs font-medium tracking-[0.2em] uppercase mb-8 transition-all duration-700 ${heroIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ color: 'var(--accent)' }}
            >
              Open Source Tool Suite
            </p>

            {/* Main Headline — BIG */}
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight max-w-4xl transition-all duration-700 delay-100"
              style={{
                fontFamily: 'AlimamaShuHeiTi-Bold',
                color: 'var(--text)',
                transform: heroIn ? 'translateY(0)' : 'translateY(24px)',
                opacity: heroIn ? 1 : 0,
              }}
            >
              简单
              <br />
              <span className="gradient-text">才是对的。</span>
            </h1>

            {/* Subtext */}
            <div
              className="mt-8 sm:mt-10 max-w-xl transition-all duration-700 delay-200"
              style={{
                transform: heroIn ? 'translateY(0)' : 'translateY(20px)',
                opacity: heroIn ? 1 : 0,
              }}
            >
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                轻量级在线工具集。不上传、不跟踪、不收费。
                <br />
                所有数据留在你的设备上，即开即用。
              </p>
            </div>

            {/* CTA */}
            <div
              className="mt-8 sm:mt-10 flex flex-wrap gap-3 transition-all duration-700 delay-300"
              style={{
                transform: heroIn ? 'translateY(0)' : 'translateY(16px)',
                opacity: heroIn ? 1 : 0,
              }}
            >
              <Link to="/file-converter">
                <button className="btn-gradient px-8 py-3.5 text-sm rounded-xl">开始使用</button>
              </Link>
              <Link to="/lab">
                <button className="btn-secondary px-8 py-3.5 text-sm rounded-xl">了解更多</button>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ SPACER ═══ */}
        <div className="h-16 sm:h-24" />

        {/* ═══ TOOLS SECTION ═══ */}
        <section className="pb-16 sm:pb-24">
          <div className="max-w-6xl mx-auto px-6 sm:px-10">
            {/* Section header */}
            <div
              className="flex items-center gap-5 mb-10 sm:mb-14 transition-all duration-700 delay-400"
              style={{
                transform: heroIn ? 'translateY(0)' : 'translateY(20px)',
                opacity: heroIn ? 1 : 0,
              }}
            >
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--border))' }} />
              <span className="text-xs font-medium tracking-[0.25em] uppercase shrink-0" style={{ color: 'var(--text-muted)' }}>核心工具</span>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--border), transparent)' }} />
            </div>

            {/* Tool cards — large, asymmetric */}
            <div className="space-y-6">
              {tools.map((tool, i) => (
                <Link
                  to={tool.to}
                  key={tool.title}
                  className={`group block transition-all duration-700 ${heroIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                  style={{ transitionDelay: `${500 + i * 150}ms` }}
                >
                  <div
                    className="relative overflow-hidden rounded-2xl transition-all duration-500"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {/* Hover state — subtle glow spread */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at 20% 50%, ${tool.accent}10 0%, transparent 60%)`,
                      }}
                    />

                    {/* Content */}
                    <div className="relative flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-10 p-6 sm:p-10">
                      {/* Left: Number + Title block */}
                      <div className="sm:w-72 shrink-0 flex items-start gap-5">
                        {/* Big number */}
                        <span
                          className="text-4xl sm:text-5xl font-bold leading-none transition-colors duration-400"
                          style={{
                            fontFamily: 'AlimamaShuHeiTi-Bold',
                            color: tool.accent,
                            opacity: 0.6,
                          }}
                        >
                          {tool.num}
                        </span>

                        <div className="pt-1">
                          <h2
                            className="text-2xl sm:text-3xl font-bold mb-1.5 transition-colors duration-300"
                            style={{ fontFamily: 'AlimamaShuHeiTi-Bold', color: 'var(--text)' }}
                          >
                            {tool.title}
                          </h2>
                          <p className="text-sm font-medium" style={{ color: tool.accent }}>
                            {tool.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Right: Description + arrow */}
                      <div className="flex-1 flex items-end justify-between gap-4">
                        <p className="text-sm leading-relaxed max-w-md" style={{ color: 'var(--text-muted)' }}>
                          {tool.desc}
                        </p>

                        {/* Arrow — shifts on hover */}
                        <div
                          className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-all duration-400 group-hover:translate-x-1 group-hover:scale-110"
                          style={{ backgroundColor: `${tool.accent}15`, color: tool.accent }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Bottom accent line — animates on hover */}
                    <div
                      className="absolute bottom-0 left-0 h-0.5 transition-all duration-500 group-hover:w-full"
                      style={{
                        width: '0%',
                        background: `linear-gradient(90deg, ${tool.accent}, ${i === 0 ? '#a78bfa' : '#6899f0'})`,
                      }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PRINCIPLES ═══ */}
        <section className="pb-20 sm:pb-28">
          <div className="max-w-6xl mx-auto px-6 sm:px-10">
            <div
              className="mb-10 transition-all duration-700 delay-600"
              style={{
                transform: heroIn ? 'translateY(0)' : 'translateY(16px)',
                opacity: heroIn ? 1 : 0,
              }}
            >
              <p className="text-xs font-medium tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--accent)' }}>Principles</p>
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'AlimamaShuHeiTi-Bold', color: 'var(--text)' }}>
                我们相信好工具
                <span className="gradient-text"> 应该简单</span>
              </h2>
            </div>

            {/* Three-column principles */}
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                {
                  title: '本地优先',
                  desc: '所有文件操作均在浏览器中完成，数据绝不离开你的设备。',
                  accent: '#34d399',
                },
                {
                  title: '即开即用',
                  desc: '无需注册、无需登录，打开浏览器即可使用全部功能。',
                  accent: '#6899f0',
                },
                {
                  title: '开源透明',
                  desc: '代码完全开放，无广告、无追踪、无隐藏付费。',
                  accent: '#a78bfa',
                },
              ].map((p, i) => (
                <div
                  key={p.title}
                  className="group p-6 rounded-2xl transition-all duration-700"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    transform: heroIn ? 'translateY(0)' : 'translateY(20px)',
                    opacity: heroIn ? 1 : 0,
                    transitionDelay: `${700 + i * 100}ms`,
                  }}
                >
                  {/* Dot + line accent */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-2.5 h-2.5 rounded-full transition-all duration-300 group-hover:scale-150"
                      style={{ backgroundColor: p.accent }}
                    />
                    <div className="flex-1 h-px" style={{ backgroundColor: `${p.accent}20` }} />
                  </div>
                  <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text)' }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="pb-10 text-center">
          <div className="max-w-6xl mx-auto px-6">
            <div className="divider-gradient" style={{ marginBottom: '28px' }} />
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {appConfig.copyright} · 保持简单
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home
