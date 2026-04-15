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

  // Get current page info
  const currentPage = appConfig.navigation.links.find(link => location.pathname === link.path)

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
            {/* Enhanced Mini Logo Icon */}
            <svg className="w-9 h-9" viewBox="0 0 48 48" fill="none">
              <defs>
                <linearGradient id="headerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#d946ef" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {/* Outer glow */}
              <circle cx="24" cy="24" r="22" fill="url(#headerLogoGradient)" opacity="0.15" filter="url(#glow)" />
              {/* Main circle */}
              <circle cx="24" cy="24" r="18" fill="url(#headerLogoGradient)" />
              {/* Inner highlight */}
              <circle cx="20" cy="18" r="6" fill="white" opacity="0.15" />
              {/* Abstract "L" */}
              <path d="M16 32 L16 20 L23 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              {/* Abstract "K" */}
              <path d="M25 20 L25 32 M25 26 L31 20 M25 26 L31 32" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            {/* Title */}
            <span className="text-xl font-bold gradient-text">
              {appConfig.logo.text}
            </span>
          </Link>

          {/* Desktop Navigation - More Dropdown */}
          <div className="hidden md:flex items-center gap-3" ref={dropdownRef}>
            {/* Current Page Indicator */}
            {currentPage && location.pathname !== '/' && (
              <div className="px-4 py-2 rounded-xl" style={{ backgroundColor: 'var(--bg-hover)' }}>
                <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
                  {currentPage.label}
                </span>
              </div>
            )}

            {/* More Menu Button */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
                style={{ 
                  color: 'var(--text-secondary)'
                }}
                title="更多功能"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="5" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="12" cy="19" r="1.5" />
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
                  {appConfig.navigation.links.filter(link => link.path !== '/').map(link => {
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
          </div>

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
