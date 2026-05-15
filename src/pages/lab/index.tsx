import { useState, useEffect } from 'react'

const Lab = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const technologies = [
    { name: 'React', desc: '前端框架', color: '#61DAFB' },
    { name: 'TypeScript', desc: '类型安全', color: '#3178C6' },
    { name: 'Vite', desc: '极速构建', color: '#BD34FE' },
    { name: 'Tailwind', desc: '原子化CSS', color: '#38BDF8' },
  ]

  const features = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: '本地处理',
      desc: '所有数据仅在浏览器本地处理，不上传至任何服务器',
      accent: '#10b981',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: '即开即用',
      desc: '无需注册、无需登录，打开即可使用',
      accent: '#3b82f6',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: '轻量高效',
      desc: '基于现代 Web 技术构建，快速响应',
      accent: '#8b5cf6',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: '简洁美观',
      desc: '精心设计的界面，操作直观便捷',
      accent: '#f59e0b',
    },
  ]

  const values = [
    { color: '#10b981', title: '隐私优先', desc: '数据仅在本地处理' },
    { color: '#3b82f6', title: '极速响应', desc: '无需等待即时使用' },
    { color: '#8b5cf6', title: '开源精神', desc: '免费使用持续迭代' },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-12">
        {/* Hero */}
        <div className={`text-center mb-14 ${isLoaded ? 'animate-slideUp' : 'opacity-0'}`}>
          {/* Animated Logo */}
          <div className="mb-8 inline-block">
            <div className="relative">
              <svg className="w-20 h-20 md:w-24 md:h-24 mx-auto" viewBox="0 0 100 100" fill="none">
                <defs>
                  <linearGradient id="labGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5b8def" />
                    <stop offset="50%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#d946ef" />
                  </linearGradient>
                </defs>
                {/* Outer ring */}
                <circle cx="50" cy="50" r="44" stroke="url(#labGrad)" strokeWidth="1.5" strokeDasharray="6 6" className="animate-spin" style={{ animationDuration: '25s' }} />
                <circle cx="50" cy="50" r="34" stroke="url(#labGrad)" strokeWidth="1" opacity="0.4" />
                <circle cx="50" cy="50" r="22" fill="url(#labGrad)" opacity="0.08" />
                {/* Flask */}
                <path d="M42 32 L42 47 L37 57 L37 70 L63 70 L63 57 L58 47 L58 32 Z" stroke="url(#labGrad)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M40 32 L60 32" stroke="url(#labGrad)" strokeWidth="1.8" strokeLinecap="round" />
                {/* Animated bubbles */}
                <circle cx="46" cy="62" r="3" fill="url(#labGrad)" opacity="0.5" className="animate-float" style={{ animationDuration: '2.2s' }} />
                <circle cx="54" cy="57" r="2" fill="url(#labGrad)" opacity="0.35" className="animate-float" style={{ animationDuration: '2.8s', animationDelay: '0.5s' }} />
                <circle cx="49" cy="53" r="2.5" fill="url(#labGrad)" opacity="0.45" className="animate-float" style={{ animationDuration: '1.9s', animationDelay: '0.3s' }} />
              </svg>
              {/* Glow */}
              <div className="absolute inset-0 rounded-full animate-breathe pointer-events-none"
                style={{ boxShadow: '0 0 60px var(--accent-glow)' }} />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'AlimamaShuHeiTi-Bold' }}>
            <span className="gradient-text">LiteKit 实验室</span>
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            探索无限可能，打造高效工具
          </p>
        </div>

        {/* Vision Card */}
        <div className={`mb-10 ${isLoaded ? 'animate-slideUp delay-100' : 'opacity-0'}`}>
          <div className="card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(91, 141, 239, 0.12)' }}>
                <svg className="w-4.5 h-4.5" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-base font-semibold" style={{ color: 'var(--text)' }}>愿景</h2>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              我们相信，工具应该简单、高效、触手可及。LiteKit 致力于打造轻盈而强大的在线工具集，让每一次操作都变得轻松愉悦。无需注册，无需付费，一切都在你的浏览器中安全完成。
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className={`mb-10 ${isLoaded ? 'animate-slideUp delay-200' : 'opacity-0'}`}>
          <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>
            <span className="inline-block w-1 h-4 rounded-full align-middle mr-2" style={{ backgroundColor: 'var(--accent)' }} />
            技术栈
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {technologies.map((tech, i) => (
              <div
                key={tech.name}
                className="card p-4 text-center group cursor-default"
                style={{ animationDelay: `${i * 60 + 200}ms` }}
              >
                <div
                  className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center text-sm font-bold transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${tech.color}18`, color: tech.color }}
                >
                  {tech.name[0]}
                </div>
                <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text)' }}>{tech.name}</p>
                <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className={`mb-10 ${isLoaded ? 'animate-slideUp delay-300' : 'opacity-0'}`}>
          <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>
            <span className="inline-block w-1 h-4 rounded-full align-middle mr-2" style={{ backgroundColor: 'var(--accent)' }} />
            核心特点
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="card p-4 flex items-start gap-4 group"
                style={{ animationDelay: `${i * 60 + 300}ms` }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${feature.accent}15`, color: feature.accent }}
                >
                  {feature.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>{feature.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className={`${isLoaded ? 'animate-slideUp delay-400' : 'opacity-0'}`}>
          <div className="card p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {values.map((v) => (
                <div key={v.title} className="text-center group">
                  <div
                    className="w-10 h-10 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${v.color}15` }}
                  >
                    <svg className="w-5 h-5" style={{ color: v.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={v.title === '隐私优先' ? 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' : v.title === '极速响应' ? 'M13 10V3L4 14h7v7l9-11h-7z' : 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'} />
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>{v.title}</h3>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center">
        <div className="divider-gradient" style={{ width: '50%', margin: '0 auto 24px' }} />
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          © 2026 LiteKit. 保留所有权利。
        </p>
      </footer>
    </div>
  )
}

export default Lab
