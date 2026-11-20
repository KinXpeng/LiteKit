import type { LinkItem } from '@/types'
import { domainOf } from '@/lib/format'
import { IconExternal } from '@/components/common/icons'

/** 链接行：移动端上下两行，桌面端「名称 / 描述 / 域名 / 箭头」四列 */
export function LinkRow({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-[#FAFBFD] md:h-[58px] md:px-[22px] md:py-0"
    >
      <span className="flex min-w-0 flex-1 flex-col gap-0.5 md:flex-row md:items-center md:gap-5">
        <span className="truncate text-[15px] font-medium leading-[21px] text-ink md:w-[170px] md:shrink-0">
          {link.name}
        </span>
        <span className="truncate text-[12px] leading-[17px] text-ink-muted md:flex-1">{link.description}</span>
      </span>
      <span className="hidden w-[160px] shrink-0 truncate font-mono text-[11px] tracking-[0.02em] text-ink-muted md:block">
        {domainOf(link.url)}
      </span>
      <IconExternal className="shrink-0 text-ink-faint transition-colors group-hover:text-accent" />
    </a>
  )
}
