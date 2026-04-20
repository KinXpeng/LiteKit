import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentTagline, setCurrentTagline] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline(prev => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const taglines = [
    { zh: '本地优先', en: 'Local First' },
    { zh: '极速响应', en: 'Lightning Fast' },
    { zh: '隐私守护', en: 'Privacy First' },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* High-Tech Background - Fixed fullscreen */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orb - top left */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-10"
          style={{
            background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
            top: '-10%',
            left: '-5%',
          }}
        />

        {/* Secondary orb - bottom right */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-8"
          style={{
            background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
            bottom: '-10%',
            right: '-5%',
          }}
        />

        {/* Accent orb - center */}
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-5"
          style={{
            background: 'radial-gradient(circle, #d946ef 0%, transparent 70%)',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-10">
        {/* Header Section */}
        <div className={`text-center ${isLoaded ? 'animate-slideUp' : 'opacity-0'}`}>

          {/* Main Title with Diagonal Split Animation */}
          <div className="mb-6 group">
            <h1 className="relative text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight flex items-center justify-center">
              {/* Left side - "简单" */}
              <span className="relative">
                <span
                  className="inline-block transition-all duration-500 ease-out group-hover:-translate-x-6 group-hover:-translate-y-4"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #d946ef 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  简单
                </span>
                {/* Left shadow trail */}
                <span
                  className="absolute inset-0 inline-block opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-md -translate-x-6 -translate-y-4"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #d946ef 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  简单
                </span>
              </span>

              {/* Diagonal slash divider */}
              <div className="relative mx-px">
                <div
                  className="w-6 md:w-8 h-px opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:w-14 group-hover:md:w-18"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #6366f1, #a855f7, transparent)',
                    transform: 'rotate(-60deg)',
                    boxShadow: '0 0 6px #a855f7, 0 0 12px #6366f1',
                  }}
                />
              </div>

              {/* Right side - "才是对的" */}
              <span className="relative">
                <span
                  className="inline-block transition-all duration-500 ease-out group-hover:translate-x-6 group-hover:translate-y-4"
                  style={{ color: 'var(--text)' }}
                >
                  才是对的
                </span>
                {/* Right shadow trail */}
                <span
                  className="absolute inset-0 inline-block opacity-0 group-hover:opacity-25 transition-opacity duration-500 blur-md translate-x-6 translate-y-4"
                  style={{ color: 'var(--text)' }}
                >
                  才是对的
                </span>
              </span>
            </h1>

            {/* Dynamic underline */}
            <div
              className="absolute -bottom-2 left-1/2 h-px transition-all duration-500"
              style={{
                width: '40%',
                background: 'linear-gradient(90deg, transparent, #3b82f6 30%, #8b5cf6 70%, transparent)',
                transform: 'translateX(-50%)',
              }}
            />
          </div>

          {/* Subtitle with animated transition */}
          <div className="h-12 flex items-center justify-center mb-8">
            <p
              key={currentTagline}
              className="text-lg md:text-xl transition-all duration-500"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {taglines[currentTagline].zh}
              </span>
              <span className="mx-3 opacity-40">·</span>
              <span className="text-sm tracking-widest uppercase">{taglines[currentTagline].en}</span>
            </p>
          </div>

          {/* Description */}
          <p className="text-base max-w-2xl mx-auto leading-relaxed mb-12" style={{ color: 'var(--text-muted)' }}>
            一款专注于效率与隐私的轻量级工具平台。所有功能均在浏览器本地运行，
            <br className="hidden md:block" />
            无需上传、无需等待、即开即用，让您的数据始终掌控在您手中。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/file-converter">
              <button className="btn-gradient px-8 py-3">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  立即使用
                </span>
              </button>
            </Link>
            <Link to="/lab">
              <button className="btn-secondary px-8 py-3">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  了解更多
                </span>
              </button>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className={`mt-20 grid md:grid-cols-3 gap-6 ${isLoaded ? 'animate-slideUp delay-150' : 'opacity-0'}`}>
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              ),
              title: '隐私安全',
              desc: '所有文件处理均在本地完成，不会上传至任何服务器',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: '极速体验',
              desc: '基于 WebAssembly 技术，无需等待，即开即用',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: '完全免费',
              desc: '开源项目，无广告、无追踪、无付费功能',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--accent)' }}
              >
                {item.icon}
              </div>
              <h3 className="text-base font-medium mb-2" style={{ color: 'var(--text)' }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats / Trust Badges */}
        <div className={`mt-12 ${isLoaded ? 'animate-slideUp delay-300' : 'opacity-0'}`}>
          <div className="flex justify-center gap-8">
            {[
              { value: '100%', label: '本地处理' },
              { value: '0KB', label: '上传大小' },
              { value: '∞', label: '无限使用' },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center px-4 py-2"
              >
                <span
                  className="text-2xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="block text-xs mt-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          © 2026 LiteKit · 保持简单
        </p>
      </footer>
    </div>
  )
}

export default Home
