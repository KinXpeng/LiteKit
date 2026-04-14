import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { appConfig } from '../../configs'

interface HeaderProps {
  theme?: 'dark' | 'light'
  onThemeChange?: (isDark: boolean) => void
}

const Header = ({ theme, onThemeChange }: HeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const defaultTheme = theme ?? appConfig.theme.defaultTheme
    return defaultTheme === 'dark'
  })
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
                {appConfig.logo.icon}
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
              {appConfig.logo.text}
            </span>
          </div>

          {/* 导航链接 */}
          <div className="hidden lg:flex items-center gap-2">
            {appConfig.navigation.links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-4 py-2 text-base font-medium transition-all duration-300 rounded-full"
                style={{
                  color: location.pathname === link.path ? 'var(--text-primary)' : 'var(--text-secondary)',
                  backgroundColor: location.pathname === link.path ? 'var(--background-tertiary)' : 'transparent'
                }}
              >
                {link.label}
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
          {appConfig.navigation.links.map(link => (
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
