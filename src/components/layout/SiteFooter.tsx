import { Link } from 'react-router-dom'
import { categories, latestChangeDate, nav, site, totalLinks } from '@/config'
import { formatDate } from '@/lib/format'
import { LogoMark } from '@/components/common/LogoMark'

interface FooterItem {
  label: string
  to: string
}

function FooterColumn({ title, items }: { title: string; items: FooterItem[] }) {
  return (
    <div className="space-y-3">
      <p className="font-mono text-[10px] tracking-label text-[#8B92A0]">{title}</p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.to + item.label}>
            {item.to.includes(':') ? (
              <a
                href={item.to}
                className="text-[13px] leading-[19px] text-[#C9CED8] transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ) : (
              <Link
                to={item.to}
                className="text-[13px] leading-[19px] text-[#C9CED8] transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter() {
  const categoryItems: FooterItem[] = [
    ...categories.slice(0, 3).map((item) => ({ label: item.name, to: `/links?category=${item.id}` })),
    { label: `全部 ${totalLinks} 个链接`, to: '/links' },
  ]

  const pageItems: FooterItem[] = nav.map((item) => ({ label: item.label, to: item.to }))

  return (
    <footer className="bg-ink text-canvas">
      <div className="shell pt-16 pb-10 sm:pt-[72px] sm:pb-11">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-[340px] space-y-4">
            <div className="flex items-center gap-2.5">
              <LogoMark inverted />
              <span className="font-serif text-[17px] font-semibold tracking-[0.03em]">{site.brandFull}</span>
            </div>
            <p className="text-[13px] leading-[22px] text-[#A9AFBA]">{site.footer.brandDesc}</p>
            <a
              href={`mailto:${site.email}`}
              className="inline-block font-mono text-[12px] tracking-[0.03em] text-[#7C8390] transition-colors hover:text-canvas"
            >
              {site.email}
            </a>
          </div>

          <div className="flex flex-wrap gap-12 sm:gap-16">
            <FooterColumn title="分类" items={categoryItems} />
            <FooterColumn title="页面" items={pageItems} />
            <FooterColumn title="联系" items={[{ label: site.email, to: `mailto:${site.email}` }]} />
          </div>
        </div>

        <div className="mt-14 border-t border-[#2A2E36] pt-5">
          <div className="flex flex-col gap-2 text-[11px] text-[#8B92A0] sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono tracking-[0.03em]">{site.footer.copyright}</span>
            {latestChangeDate && (
              <span className="font-mono tracking-[0.03em]">最近更新 {formatDate(latestChangeDate)}</span>
            )}
          </div>
        </div>

        <div className="mt-12 space-y-4">
          <p className="font-serif text-[32px] leading-[1.35] tracking-[0.03em] sm:text-[52px] lg:text-[58px]">
            {site.footer.closing}
          </p>
          <p className="font-mono text-[10px] tracking-wide2 text-[#8B92A0]">{site.footer.caption}</p>
        </div>
      </div>
    </footer>
  )
}
