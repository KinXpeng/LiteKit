import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
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
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    if (onThemeChange) onThemeChange(isDarkMode)
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode, onThemeChange])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleThemeToggle = () => setIsDarkMode(!isDarkMode)

  const primaryLinks = [
    {
      path: '/', label: '首页',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      path: '/lab', label: '实验室',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
  ]

  const moreLinks = [
    {
      path: '/file-converter', label: '文件转换',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
    {
      path: '/image-processor', label: '图片处理',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ]

  const allLinks = [...primaryLinks, ...moreLinks]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'blur(12px) saturate(150%)',
        WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'blur(12px) saturate(150%)',
        backgroundColor: isScrolled ? 'var(--bg-glass)' : 'transparent',
        borderBottom: isScrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      {/* Top gradient accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--accent-light), var(--accent), var(--accent-light), transparent)',
          opacity: isScrolled ? 0 : 0.4,
        }}
      />

      <div className="max-w-[90%] mx-auto px-6 py-3.5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <svg className="w-9 h-9 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 40 40" fill="none">
                <defs>
                  <linearGradient id="logoGradH2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5b8def" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
                <path d="M20 6L34 34H6L20 6Z" stroke="url(#logoGradH2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 14L28 30H12L20 14Z" stroke="url(#logoGradH2)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                <circle cx="30" cy="10" r="3" fill="url(#logoGradH2)" className="animate-pulse-slow" />
              </svg>
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: '0 0 24px var(--accent-glow)' }} />
            </div>
            <span
              className="text-lg font-bold hidden sm:block"
              style={{
                fontFamily: 'AlimamaShuHeiTi-Bold',
                background: 'linear-gradient(135deg, #7baef8 0%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {appConfig.logo.text}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {/* Primary links */}
            {primaryLinks.map(link => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-250 hover:bg-[var(--bg-hover)]"
                  style={{ color: isActive ? 'var(--accent)' : 'var(--text-secondary)' }}
                >
                  {link.icon}
                  <span>{link.label}</span>
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                  )}
                </Link>
              )
            })}

            {/* Divider */}
            <div className="w-px h-5 mx-2" style={{ backgroundColor: 'var(--border)' }} />

            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-250 hover:scale-110 hover:bg-[var(--bg-hover)]"
              style={{ color: 'var(--text-secondary)' }}
              title={isDarkMode ? '切换亮色主题' : '切换暗色主题'}
            >
              {isDarkMode ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* More Menu Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-250 hover:scale-110"
                style={{
                  backgroundColor: isDropdownOpen ? 'var(--bg-hover)' : 'var(--bg-hover)',
                  color: 'var(--text-secondary)',
                }}
                title="更多功能"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="5" r="1.5" fill="currentColor" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="12" cy="19" r="1.5" fill="currentColor" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 py-2 rounded-xl animate-scaleIn origin-top-right"
                  style={{
                    backgroundColor: 'var(--bg-glass)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                >
                  {moreLinks.map(link => {
                    const isActive = location.pathname === link.path
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150"
                        style={{
                          color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                          backgroundColor: isActive ? 'var(--bg-hover)' : 'transparent',
                        }}
                      >
                        {link.icon}
                        <span>{link.label}</span>
                        {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                        )}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={handleThemeToggle}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-secondary)' }}
            >
              {isDarkMode ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-secondary)' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 p-3 rounded-2xl animate-slideDown"
            style={{
              backgroundColor: 'var(--bg-glass)',
              backdropFilter: 'blur(24px)',
              border: '1px solid var(--border)',
            }}
          >
            {allLinks.map(link => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'var(--bg-hover)' : 'transparent',
                  }}
                >
                  {link.icon}
                  <span>{link.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                  )}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Header
