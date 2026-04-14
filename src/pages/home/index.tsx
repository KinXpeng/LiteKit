import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col" style={{ backgroundColor: 'var(--background-color)' }}>
      {/* 简洁背景 */}
      <div className="absolute inset-0 z-0">
        {/* 渐变光晕 */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[120px] animate-pulse"
          style={{ background: 'linear-gradient(180deg, #0891b2 0%, #5b21b6 50%, #8b5cf6 100%)', opacity: 0.08 }}
        ></div>
      </div>

      {/* 主内容 */}
      <div className="relative z-10 flex-grow flex flex-col justify-center items-center px-6 py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* 主标题区域 */}
          <div
            className={`mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h1
              className="font-bold tracking-tight mb-6"
              style={{
                fontSize: 'clamp(4rem, 12vw, 8rem)',
                lineHeight: '1',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em'
              }}
            >
              <span 
                className="italic"
                style={{
                  background: 'var(--primary-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: '800'
                }}
              >
                LiteKit
              </span>
            </h1>
            
            <p
              className="text-xl md:text-2xl font-medium"
              style={{
                color: 'var(--text-secondary)',
                letterSpacing: '0.05em'
              }}
            >
              智能工具集，让工作更高效
            </p>
          </div>

          {/* 按钮组 */}
          <div
            className={`flex flex-col sm:flex-row justify-center items-center gap-4 mb-20 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ animationDelay: '0.2s' }}
          >
            <Link to="/features">
              <button
                className="group px-10 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105"
                style={{
                  background: 'var(--primary-gradient)',
                  color: 'white',
                  letterSpacing: '0.03em'
                }}
              >
                <span className="flex items-center gap-2">
                  探索功能
                  <span className="text-lg group-hover:translate-x-1 transition-transform duration-200">→</span>
                </span>
              </button>
            </Link>
            <Link to="/file-converter">
              <button
                className="px-10 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105"
                style={{
                  color: 'var(--text-primary)',
                  backgroundColor: 'var(--background-secondary)',
                  letterSpacing: '0.03em'
                }}
              >
                立即使用
              </button>
            </Link>
          </div>

          {/* 功能卡片 */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ animationDelay: '0.4s' }}
          >
            {[
              { icon: '📄', title: '文件转换', desc: 'PDF 与 Word 互转', link: '/file-converter' },
              { icon: '🖼️', title: '图片裁剪', desc: '证件照尺寸一键裁剪', link: '/image-cropper' },
              { icon: '⚡', title: '更多功能', desc: '持续更新中', link: '/features' }
            ].map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group p-8 rounded-2xl text-left transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(8, 145, 178, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--text-tertiary)', fontSize: '0.95rem' }}>
                  {feature.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 底部 */}
      <div className="relative z-10 py-8 px-8 text-center">
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>
          © 2026 轻序 LiteKit. 保留所有权利。
        </p>
      </div>
    </div>
  )
}

export default Home