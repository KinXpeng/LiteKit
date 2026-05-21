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
    { path: '/', label: '首页', en: 'Home' },
    { path: '/lab', label: '实验室', en: 'Lab' },
  ]

  const moreLinks = [
    { path: '/file-converter', label: '文件转换', en: 'Convert' },
    { path: '/image-processor', label: '图片处理', en: 'Image' },
  ]

  const allLinks = [...primaryLinks, ...moreLinks]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backdropFilter: isScrolled ? 'blur(24px) saturate(160%)' : 'blur(10px) saturate(140%)',
        WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(160%)' : 'blur(10px) saturate(140%)',
        backgroundColor: isScrolled ? 'var(--bg-glass)' : 'transparent',
        borderBottom: isScrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      {/* Top neon scan-line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, var(--cyan) 25%, var(--accent) 50%, var(--violet) 75%, transparent 100%)',
          opacity: isScrolled ? 0.6 : 0.85,
          boxShadow: '0 0 12px var(--accent-glow)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-3.5">
        <div className="flex items-center justify-between">
          {/* ── Logo : animated geometric mark + wordmark ── */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <svg className="w-9 h-9 transition-transform duration-700 group-hover:rotate-180" viewBox="0 0 40 40" fill="none">
                <defs>
                  <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--cyan)" />
                    <stop offset="50%" stopColor="var(--accent)" />
                    <stop offset="100%" stopColor="var(--violet)" />
                  </linearGradient>
                  <filter id="logoGlow">
                    <feGaussianBlur stdDeviation="2" />
                  </filter>
                </defs>
                {/* Outer rotating ring */}
                <circle cx="20" cy="20" r="17" stroke="url(#logoGrad)" strokeWidth="1" strokeDasharray="3 5" fill="none" className="animate-spin-slow" style={{ transformOrigin: 'center' }} />
                {/* Triangle */}
                <path d="M20 8L31 28H9L20 8Z" stroke="url(#logoGrad)" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
                {/* Center dot */}
                <circle cx="20" cy="22" r="2.5" fill="url(#logoGrad)" />
                <circle cx="20" cy="22" r="4.5" fill="url(#logoGrad)" opacity="0.3" filter="url(#logoGlow)" />
              </svg>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: '0 0 32px var(--accent-glow)', borderRadius: '50%' }} />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span
                className="text-base font-display font-bold tracking-tight"
                style={{ color: 'var(--text)' }}
              >
                Litekit
              </span>
              <span className="font-mono text-[9px] tracking-[0.22em] uppercase mt-0.5" style={{ color: 'var(--text-muted)' }}>
                轻 / 序
              </span>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-1">
            {primaryLinks.map(link => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm transition-all duration-300 group"
                  style={{ color: isActive ? 'var(--text)' : 'var(--text-secondary)' }}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        boxShadow: 'inset 0 0 12px var(--accent-glow)',
                      }}
                    />
                  )}
                  <span className="relative font-medium">{link.label}</span>
                  {isActive && (
                    <span
                      className="relative w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: 'var(--cyan)',
                        boxShadow: '0 0 8px var(--cyan)',
                      }}
                    />
                  )}
                </Link>
              )
            })}

            <div className="w-px h-4 mx-3" style={{ backgroundColor: 'var(--border)' }} />

            {/* Theme toggle */}
            <button
              onClick={handleThemeToggle}
              className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              style={{ color: 'var(--text-secondary)' }}
              title={isDarkMode ? '切换亮色主题' : '切换暗色主题'}
            >
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }} />
              {isDarkMode ? (
                <svg className="relative w-4 h-4 transition-transform duration-500 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="relative w-4 h-4 transition-transform duration-500 group-hover:-rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* More dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                style={{ color: isDropdownOpen ? 'var(--text)' : 'var(--text-secondary)' }}
                title="更多功能"
              >
                <div
                  className="absolute inset-0 rounded-full transition-opacity duration-300"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    opacity: isDropdownOpen ? 1 : 0,
                  }}
                />
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }} />
                <svg className={`relative w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <circle cx="12" cy="5" r="1.5" fill="currentColor" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="12" cy="19" r="1.5" fill="currentColor" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-3 w-56 py-1.5 rounded-xl animate-scaleIn origin-top-right overflow-hidden"
                  style={{
                    backgroundColor: 'var(--bg-glass)',
                    backdropFilter: 'blur(24px) saturate(160%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-lg), 0 0 24px var(--accent-glow)',
                  }}
                >
                  {/* Top gradient line */}
                  <div className="absolute top-0 left-3 right-3 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--cyan), var(--violet), transparent)' }} />
                  <div className="px-4 pt-3 pb-1.5 font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: 'var(--text-muted)' }}>
                    More · Tools
                  </div>
                  {moreLinks.map(link => {
                    const isActive = location.pathname === link.path
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center justify-between px-4 py-2.5 text-sm transition-all duration-200 hover:bg-[var(--bg-hover)] group/item"
                        style={{ color: isActive ? 'var(--text)' : 'var(--text-secondary)' }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{link.label}</span>
                          <span className="font-mono text-[10px] opacity-50">{link.en}</span>
                        </div>
                        {isActive ? (
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--cyan)', boxShadow: '0 0 6px var(--cyan)' }} />
                        ) : (
                          <svg className="w-3.5 h-3.5 opacity-30 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ── Mobile actions ── */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={handleThemeToggle}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
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
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
            >
              <svg className="w-4 h-4 transition-transform duration-300" style={{ transform: isMobileMenuOpen ? 'rotate(90deg)' : 'none' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h12M4 17h8" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 p-2 rounded-xl animate-slideDown"
            style={{
              backgroundColor: 'var(--bg-glass)',
              backdropFilter: 'blur(24px)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {allLinks.map(link => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all duration-200"
                  style={{
                    color: isActive ? 'var(--text)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'var(--bg-hover)' : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{link.label}</span>
                    <span className="font-mono text-[10px] opacity-50">{link.en}</span>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)' }} />
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
