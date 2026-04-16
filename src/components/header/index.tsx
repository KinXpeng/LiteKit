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
    if (onThemeChange) {
      onThemeChange(isDarkMode)
    }
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [isDarkMode, onThemeChange])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={isScrolled ? {
        backgroundColor: 'var(--bg-secondary)',
        backdropFilter: 'blur(16px) saturate(150%)',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
      } : {}}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with Title - Click to go home */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Creative Logo - Abstract Mountain/Arrow */}
            <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none">
              {/* Main mountain peak */}
              <path d="M20 6L34 34H6L20 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]" />
              {/* Inner peak accent */}
              <path d="M20 14L28 30H12L20 14Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]" opacity="0.5" />
              {/* Sun/rising dot */}
              <circle cx="30" cy="10" r="3" fill="currentColor" className="text-[var(--accent)]" />
            </svg>
            {/* Title */}
            <span 
              className="text-xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {appConfig.logo.text}
            </span>
          </Link>

          {/* Mobile Right Actions */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{
                backgroundColor: 'var(--bg-hover)',
                color: 'var(--text-secondary)'
              }}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: 'var(--bg-hover)',
                color: 'var(--text-secondary)'
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2" ref={dropdownRef}>

            {/* Lab Button - Beaker Icon */}
            <Link
              to="/lab"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                backgroundColor: location.pathname === '/lab' ? 'var(--bg-hover)' : 'var(--bg-hover)',
                color: location.pathname === '/lab' ? 'var(--accent)' : 'var(--text-secondary)'
              }}
              title="实验室"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3h8M9 3v4.5L4 19h16l-5-11.5V3" />
                <path d="M7 15h10" />
              </svg>
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                backgroundColor: 'var(--bg-hover)',
                color: 'var(--text-secondary)'
              }}
              title={isDarkMode ? '切换亮色' : '切换暗色'}
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

            {/* More Menu Button */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: isDropdownOpen ? 'var(--bg-hover)' : 'transparent',
                  color: 'var(--text-secondary)'
                }}
                title="更多功能"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="5" r="1.5" fill="currentColor" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="12" cy="19" r="1.5" fill="currentColor" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 py-2 rounded-xl animate-scaleIn"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                  }}
                >
                  {appConfig.navigation.links.filter(link => link.path !== '/' && link.path !== '/lab').map(link => {
                    const isActive = location.pathname === link.path
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
                        style={{
                          color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                          backgroundColor: isActive ? 'var(--bg-hover)' : 'transparent'
                        }}
                      >
                        {isActive && (
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                        )}
                        <span style={{ marginLeft: isActive ? '0' : '20px' }}>{link.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden mt-4 p-4 rounded-2xl animate-slideDown"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            {appConfig.navigation.links.filter(link => link.path !== '/').map(link => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'var(--bg-hover)' : 'transparent',
                  }}
                >
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                  )}
                  <span>{link.label}</span>
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
