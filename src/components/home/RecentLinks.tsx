import { homeSections, recentLinks, templateVars } from '@/config'
import { domainOf, fill, shortDate } from '@/lib/format'
import { SectionHead } from '@/components/common/SectionHead'
import { IconExternal } from '@/components/common/icons'

export function RecentLinks() {
  const copy = homeSections.recent

  return (
    <section className="shell pb-16">
      <SectionHead
        eyebrow={copy.eyebrow}
        title={fill(copy.title, templateVars)}
        more={copy.more && copy.moreTo ? { label: fill(copy.more, templateVars), to: copy.moreTo } : undefined}
      />

      <div className="card-surface mt-7 divide-y divide-line-soft overflow-hidden">
        {recentLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-canvas sm:h-[70px] sm:py-0"
          >
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[15px] font-medium leading-[21px] text-ink">{link.name}</span>
              <span className="block truncate text-[12px] leading-[17px] text-ink-muted">{link.description}</span>
            </span>
            <span className="hidden w-[156px] shrink-0 truncate font-mono text-[11px] tracking-[0.02em] text-ink-muted sm:block">
              {domainOf(link.url)}
            </span>
            <span className="hidden w-10 shrink-0 text-right font-mono text-[10px] tracking-[0.04em] text-ink-faint sm:block">
              {shortDate(link.addedAt)}
            </span>
            <IconExternal className="shrink-0 text-ink-faint transition-colors group-hover:text-accent" />
          </a>
        ))}
      </div>
    </section>
  )
}
