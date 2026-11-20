import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

interface SearchContextValue {
  open: boolean
  openPalette: () => void
  closePalette: () => void
}

const SearchContext = createContext<SearchContextValue | null>(null)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openPalette = useCallback(() => setOpen(true), [])
  const closePalette = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'
      if (isShortcut) {
        event.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const value = useMemo(
    () => ({ open, openPalette, closePalette }),
    [open, openPalette, closePalette],
  )

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

export function useSearchPalette(): SearchContextValue {
  const context = useContext(SearchContext)
  if (!context) throw new Error('useSearchPalette 必须在 SearchProvider 内使用')
  return context
}
