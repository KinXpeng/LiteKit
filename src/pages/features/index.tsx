import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import descriptionIcon from '@iconify/icons-material-symbols/description'
import imageIcon from '@iconify/icons-material-symbols/image'

const Features = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const features = [
    {
      id: 1,
      title: '文件转换',
      description: '支持PDF和Word相互转换，快速便捷',
      icon: descriptionIcon,
      link: '/file-converter',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      id: 2,
      title: '图片裁剪',
      description: '支持1寸、2寸等预设尺寸和自定义尺寸',
      icon: imageIcon,
      link: '/image-cropper',
      gradient: 'from-purple-500 to-pink-500'
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--background-color)' }}>
      {/* 背景效果 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* 动态网格 */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(var(--border-color) 1px, transparent 1px),
              linear-gradient(90deg, var(--border-color) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
        
        {/* 渐变光晕 */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ background: 'linear-gradient(135deg, #0891b2, #5b21b6)', opacity: 0.12 }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', opacity: 0.1, animationDelay: '1.5s' }}
        ></div>
      </div>

      {/* 内容 */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-24">
        {/* 头部 */}
        <div 
          className={`mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div>
            <h1 
              className="font-bold mb-4"
              style={{ 
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                lineHeight: '1.1'
              }}
            >
              <span style={{ 
                background: 'var(--primary-gradient)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                backgroundClip: 'text'
              }}>
                功能列表
              </span>
            </h1>
            <p 
              className="text-xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              探索我们的核心功能，提升您的工作效率
            </p>
          </div>
        </div>

        {/* 功能网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <Link 
              to={feature.link} 
              key={feature.id}
              className={`group block transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div 
                className="relative p-8 md:p-10 rounded-3xl border-2 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                style={{ 
                  backgroundColor: 'var(--background-card)',
                  borderColor: 'var(--border-color)',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-color)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(8, 145, 178, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* 装饰性渐变 */}
                <div 
                  className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-40`}
                  style={{ 
                    background: `linear-gradient(135deg, ${feature.gradient.includes('cyan') ? '#0891b2' : '#8b5cf6'}, ${feature.gradient.includes('blue') ? '#3b82f6' : '#ec4899'})`,
                    transform: 'translate(30%, -30%)'
                  }}
                ></div>

                {/* 内容 */}
                <div className="relative z-10">
                  {/* 图标 */}
                  <div 
                    className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-8 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{ 
                      background: `linear-gradient(135deg, ${feature.gradient.includes('cyan') ? '#0891b2' : '#8b5cf6'}, ${feature.gradient.includes('blue') ? '#3b82f6' : '#ec4899'})`,
                      boxShadow: '0 12px 40px rgba(8, 145, 178, 0.35)'
                    }}
                  >
                    <Icon icon={feature.icon} className="text-5xl text-white" />
                  </div>

                  {/* 标题 */}
                  <h2 
                    className="font-bold mb-6"
                    style={{ 
                      color: 'var(--text-primary)',
                      fontSize: 'clamp(1.75rem, 4vw, 2.5rem)'
                    }}
                  >
                    {feature.title}
                  </h2>

                  {/* 描述 */}
                  <p 
                    className="text-xl mb-10 leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {feature.description}
                  </p>

                  {/* 按钮 */}
                  <div className="flex items-center gap-3">
                    <button 
                      className="group/btn px-8 py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${feature.gradient.includes('cyan') ? '#0891b2' : '#8b5cf6'}, ${feature.gradient.includes('blue') ? '#3b82f6' : '#ec4899'})`,
                        boxShadow: '0 8px 30px rgba(8, 145, 178, 0.35)'
                      }}
                    >
                      <span className="flex items-center gap-2">
                        立即使用
                        <span className="text-xl group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
                      </span>
                    </button>
                  </div>
                </div>

                {/* 装饰性边框光效 */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    padding: '2px',
                    background: `linear-gradient(135deg, ${feature.gradient.includes('cyan') ? '#0891b2' : '#8b5cf6'}, ${feature.gradient.includes('blue') ? '#3b82f6' : '#ec4899'})`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude'
                  }}
                ></div>
              </div>
            </Link>
          ))}
        </div>

        {/* 更多功能提示 */}
        <div 
          className={`mt-20 text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ animationDelay: '0.6s' }}
        >
          <div 
            className="inline-block p-10 rounded-3xl border-2"
            style={{ 
              backgroundColor: 'var(--background-card)',
              borderColor: 'var(--border-color)'
            }}
          >
            <p className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              更多功能正在开发中
            </p>
            <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
              敬请期待...
            </p>
          </div>
        </div>
      </div>

      {/* 底部 */}
      <div className="relative z-10 py-8 px-8 text-center">
        <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
          © 2026 LiteKit. 保留所有权利。
        </p>
      </div>
    </div>
  )
}

export default Features