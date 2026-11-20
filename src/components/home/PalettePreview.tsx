import { featuredLinks, recentLinks } from '@/config'
import { domainOf } from '@/lib/format'
import { useSearchPalette } from '@/context/SearchContext'
import { IconExternal, IconSearch } from '@/components/common/icons'

const previewItems = [...featuredLinks, ...recentLinks]
  .filter((link, index, arr) => arr.findIndex((item) => item.id === link.id) === index)
  .slice(0, 4)

/** 首屏右侧的命令面板预览：点一下就是真的搜索框 */
export function PalettePreview() {
  const { openPalette } = useSearchPalette()

  return (
    <button
      type="button"
      onClick={openPalette}
      aria-label="打开搜索面板"
      className="w-full max-w-[404px] shrink-0 overflow-hidden rounded-2xl border border-line bg-surface text-left shadow-[0_26px_50px_-14px_rgba(15,16,25,0.10),0_6px_14px_-2px_rgba(15,16,25,0.05)] transition-shadow hover:shadow-[0_30px_60px_-14px_rgba(15,16,25,0.16)]"
    >
      <div className="flex h-[58px] items-center gap-2.5 border-b border-line-soft px-[15px]">
        <IconSearch className="text-ink-faint" />
        <span className="flex-1 text-[13px] text-ink-faint">搜索工具或域名</span>
        <span className="rounded-[5px] bg-line-soft px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">ESC</span>
      </div>

      <div>
        {previewItems.map((link, index) => (
          <div
            key={link.id}
            className={[
              'flex items-center gap-3 px-[15px] py-[11px]',
              index === 0 ? 'bg-accent-soft' : '',
            ].join(' ')}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface text-[11px] font-medium text-ink-muted ring-1 ring-line">
              {link.name.slice(0, 1).toUpperCase()}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium leading-[17px] text-ink">{link.name}</span>
              <span className="block truncate font-mono text-[10px] leading-[13px] text-ink-faint">
                {domainOf(link.url)}
              </span>
            </span>
            <IconExternal className={index === 0 ? 'text-accent' : 'text-ink-faint'} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-line-soft bg-[#F7F8FA] px-[15px] py-2.5">
        <span className="font-mono text-[10px] tracking-[0.04em] text-ink-faint">↑ ↓ 选择</span>
        <span className="font-mono text-[10px] tracking-[0.04em] text-ink-faint">ENTER 打开</span>
      </div>
    </button>
  )
}
