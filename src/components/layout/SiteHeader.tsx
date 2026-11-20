import { Link, NavLink } from 'react-router-dom'
import { nav, site } from '@/config'
import { LogoMark } from '@/components/common/LogoMark'
import { IconPlus, IconSearch } from '@/components/common/icons'
import { useSearchPalette } from '@/context/SearchContext'
import { MobileNav } from './MobileNav'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'text-[14px] transition-colors',
    isActive ? 'font-medium text-ink' : 'text-ink-muted hover:text-ink',
  ].join(' ')

export function SiteHeader() {
  const { openPalette } = useSearchPalette()

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur">
      <div className="shell flex h-[78px] items-center justify-between gap-6">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label={site.brandFull}>
          <LogoMark />
          <span className="flex flex-col">
            <span className="font-serif text-[19px] leading-6 font-semibold tracking-[0.05em] text-ink">
              {site.name}
            </span>
            <span className="font-mono text-[8px] leading-[11px] font-medium tracking-wide2 text-ink-faint">
              {site.nameEn}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-[30px] md:flex">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={openPalette}
            className="hidden h-10 w-[214px] items-center justify-between rounded-[10px] border border-line bg-surface px-3 text-[13px] text-ink-faint transition-colors hover:border-[#C9CED8] lg:flex"
          >
            <span className="flex items-center gap-2">
              <IconSearch />
              搜索工具
            </span>
            <kbd className="rounded-[5px] bg-line-soft px-1.5 py-0.5 font-mono text-[10px] leading-[13px] text-ink-faint">
              Ctrl K
            </kbd>
          </button>

          <button
            type="button"
            onClick={openPalette}
            aria-label="搜索工具"
            className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line bg-surface text-ink-muted lg:hidden"
          >
            <IconSearch size={16} />
          </button>

          <Link to="/about#contact" className="btn-dark-sm hidden sm:inline-flex">
            <IconPlus />
            推荐工具
          </Link>

          <MobileNav />
        </div>
      </div>
    </header>
  )
}
