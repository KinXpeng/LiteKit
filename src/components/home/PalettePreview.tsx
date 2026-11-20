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
      className="relative w-full max-w-[420px] shrink-0 overflow-hidden rounded-[20px] border border-line bg-surface text-left shadow-float transition-shadow duration-300 hover:shadow-[0_50px_90px_-24px_rgba(13,23,71,0.18)]"
    >
      {/* 顶部一条纯蓝细线：全站辨识度最高的一处细节，不用渐变 */}
      <span className="block h-[2px] w-full bg-accent" />

      <div className="flex h-[62px] items-center gap-2.5 border-b border-line-soft px-4">
        <IconSearch className="text-ink-faint" />
        <span className="flex-1 text-[14px] text-ink-faint">搜索工具或域名</span>
        <span className="rounded-md bg-line-soft px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">ESC</span>
      </div>

      <div>
        {previewItems.map((link, index) => (
          <div
            key={link.id}
            className={['flex items-center gap-3 px-4 py-[11px]', index === 0 ? 'bg-accent-soft' : ''].join(' ')}
          >
            <span
              className={[
                'flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[9px] text-[11px] font-medium',
                index === 0
                  ? 'bg-surface text-accent ring-1 ring-[#E4EBFF]'
                  : 'bg-line-soft text-ink-muted ring-1 ring-line',
              ].join(' ')}
            >
              {link.name.slice(0, 1).toUpperCase()}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium leading-[18px] text-ink">{link.name}</span>
              <span className="block truncate font-mono text-[10px] leading-[14px] text-ink-faint">
                {domainOf(link.url)}
              </span>
            </span>
            <IconExternal className={index === 0 ? 'text-accent' : 'text-ink-faint'} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-line-soft bg-[#FAFBFD] px-4 py-2.5">
        <span className="font-mono text-[10px] tracking-[0.04em] text-ink-faint">↑ ↓ 选择</span>
        <span className="font-mono text-[10px] tracking-[0.04em] text-ink-faint">ENTER 打开</span>
      </div>
    </button>
  )
}
