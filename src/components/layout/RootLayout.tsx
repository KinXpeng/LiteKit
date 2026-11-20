import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CommandPalette } from '@/components/search/CommandPalette'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

/** 路由切换后回到顶部（带 hash 时交给浏览器定位） */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <CommandPalette />
    </div>
  )
}
