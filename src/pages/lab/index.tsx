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
    { name: 'Vite', desc: '极速构建', color: '#646CFF' },
    { name: 'Tailwind', desc: '原子化CSS', color: '#38B2AC' },
  ]

  const features = [
    { icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ), title: '本地处理', desc: '所有数据仅在浏览器本地处理，不上传至任何服务器' },
    { icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ), title: '即开即用', desc: '无需注册、无需登录，打开即可使用' },
    { icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ), title: '轻量高效', desc: '基于现代 Web 技术构建，快速响应' },
    { icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ), title: '简洁美观', desc: '精心设计的界面，操作直观便捷' },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Background Effects */}
      <div className="bg-pattern" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-16 sm:pb-20">
        {/* Hero Section */}
        <div className={`text-center mb-16 ${isLoaded ? 'animate-slideUp' : 'opacity-0'}`}>
          {/* Animated Logo */}
          <div className="mb-8">
            <div className="relative inline-block">
              <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100" fill="none">
                <defs>
                  <linearGradient id="labGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#d946ef" />
                  </linearGradient>
                </defs>
                {/* Outer rotating ring */}
                <circle cx="50" cy="50" r="45" stroke="url(#labGradient)" strokeWidth="2" strokeDasharray="8 4" className="animate-spin" style={{ animationDuration: '20s' }} />
                {/* Inner ring */}
                <circle cx="50" cy="50" r="35" stroke="url(#labGradient)" strokeWidth="1.5" opacity="0.5" />
                {/* Center glow */}
                <circle cx="50" cy="50" r="25" fill="url(#labGradient)" opacity="0.1" />
                {/* Flask icon */}
                <path d="M40 30 L40 45 L35 55 L35 70 L65 70 L65 55 L60 45 L60 30 Z" stroke="url(#labGradient)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M38 30 L62 30" stroke="url(#labGradient)" strokeWidth="2" strokeLinecap="round" />
                {/* Bubbles */}
                <circle cx="45" cy="62" r="3" fill="url(#labGradient)" opacity="0.6" className="animate-bounce" style={{ animationDuration: '2s' }} />
                <circle cx="55" cy="58" r="2" fill="url(#labGradient)" opacity="0.4" className="animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
                <circle cx="48" cy="52" r="2.5" fill="url(#labGradient)" opacity="0.5" className="animate-bounce" style={{ animationDuration: '1.8s', animationDelay: '0.3s' }} />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">LiteKit 实验室</span>
          </h1>
          <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
            探索无限可能，打造高效工具
          </p>
        </div>

        {/* Vision Section */}
        <div className={`mb-12 ${isLoaded ? 'animate-slideUp delay-100' : 'opacity-0'}`}>
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)' }}>
                <svg className="w-5 h-5" style={{ color: '#3b82f6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>愿景</h2>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              我们相信，工具应该简单、高效、触手可及。LiteKit 致力于打造轻盈而强大的在线工具集，让每一次操作都变得轻松愉悦。无需注册，无需付费，一切都在你的浏览器中安全完成。
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className={`mb-12 ${isLoaded ? 'animate-slideUp delay-200' : 'opacity-0'}`}>
          <h2 className="text-lg font-semibold mb-5" style={{ color: 'var(--text)' }}>
            技术栈
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {technologies.map((tech, index) => (
              <div
                key={tech.name}
                className="card p-4 text-center"
                style={{ animationDelay: `${index * 50 + 200}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-lg font-bold"
                  style={{ backgroundColor: `${tech.color}20`, color: tech.color }}
                >
                  {tech.name[0]}
                </div>
                <p className="text-sm font-medium mb-0.5" style={{ color: 'var(--text)' }}>{tech.name}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Features */}
        <div className={`mb-12 ${isLoaded ? 'animate-slideUp delay-300' : 'opacity-0'}`}>
          <h2 className="text-lg font-semibold mb-5" style={{ color: 'var(--text)' }}>
            核心特点
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card p-4 flex items-start gap-4"
                style={{ animationDelay: `${index * 50 + 300}ms` }}
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--accent)' }}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-medium mb-1" style={{ color: 'var(--text)' }}>{feature.title}</h3>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className={`${isLoaded ? 'animate-slideUp delay-400' : 'opacity-0'}`}>
          <div className="card p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)' }}>
                  <svg className="w-6 h-6" style={{ color: '#10b981' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>隐私优先</h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>数据仅在本地处理</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)' }}>
                  <svg className="w-6 h-6" style={{ color: '#3b82f6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>极速响应</h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>无需等待即时使用</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)' }}>
                  <svg className="w-6 h-6" style={{ color: '#8b5cf6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>开源精神</h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>免费使用持续迭代</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          © 2026 LiteKit. 保留所有权利。
        </p>
      </footer>
    </div>
  )
}

export default Lab
