import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

interface HeaderProps {
  theme?: 'dark' | 'light'
  onThemeChange?: (isDark: boolean) => void
}

const Header = ({ theme = 'dark', onThemeChange }: HeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark')
  const location = useLocation()

  useEffect(() => {
    if (onThemeChange) {
      onThemeChange(isDarkMode)
    }
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [isDarkMode, onThemeChange])

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode)
  }

  const navLinks = [
    { path: '/', label: '首页' },
    { path: '/features', label: '功能' },
    { path: '/file-converter', label: '文件转换' },
    { path: '/image-cropper', label: '图片裁剪' }
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-300"
      style={{
        backgroundColor: 'var(--background-secondary)',
        borderColor: 'var(--border-color)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo区域 */}
          <div className="flex items-center gap-3">
            <div
              className="relative flex items-center justify-center w-10 h-10"
              style={{
                background: 'var(--primary-gradient)',
                borderRadius: '10px'
              }}
            >
              <span
                className="text-white font-bold text-xl italic"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                K
              </span>
            </div>
            <span
              className="text-2xl font-bold tracking-wide"
              style={{
                background: 'var(--primary-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              轻序 / LiteKit
            </span>
          </div>

          {/* 导航链接 */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-5 py-2.5 text-base font-medium transition-all duration-300"
                style={{
                  color: location.pathname === link.path ? 'var(--primary-color)' : 'var(--text-secondary)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--primary-color)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = location.pathname === link.path ? 'var(--primary-color)' : 'var(--text-secondary)';
                }}
              >
                {link.label}
                {location.pathname === link.path && (
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                    style={{
                      background: 'var(--primary-gradient)'
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* 主题切换 */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleThemeToggle}
              className="relative w-14 h-7 rounded-full transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: 'var(--background-tertiary)'
              }}
            >
              <div
                className="absolute top-1 w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center text-xs"
                style={{
                  left: isDarkMode ? 'calc(100% - 24px)' : '4px',
                  background: 'var(--primary-gradient)',
                  color: 'white',
                  boxShadow: '0 2px 6px rgba(8, 145, 178, 0.3)'
                }}
              >
                {isDarkMode ? '🌙' : '☀️'}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      <div className="lg:hidden border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="px-4 py-4 space-y-2">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className="block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200"
              style={{
                color: location.pathname === link.path ? 'var(--primary-color)' : 'var(--text-secondary)',
                backgroundColor: location.pathname === link.path ? 'var(--background-tertiary)' : 'transparent'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Header
