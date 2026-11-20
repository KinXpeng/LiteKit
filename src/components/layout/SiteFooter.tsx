import { Link } from 'react-router-dom'
import { categories, latestChangeDate, nav, site, totalLinks } from '@/config'
import { formatDate } from '@/lib/format'
import { FooterPattern } from '@/components/common/Patterns'

interface FooterItem {
  label: string
  to: string
  emphasis?: boolean
}

function FooterColumn({ title, items }: { title: string; items: FooterItem[] }) {
  return (
    <div className="space-y-3">
      <p className="font-mono text-[10px] tracking-label text-deep-dim">{title}</p>
      <ul className="space-y-3">
        {items.map((item) => {
          const className = [
            'text-[13px] leading-[19px] transition-colors',
            item.emphasis ? 'text-white' : 'text-deep-text hover:text-white',
          ].join(' ')
          return (
            <li key={item.to + item.label}>
              {item.to.includes(':') ? (
                <a href={item.to} className={className}>
                  {item.label}
                </a>
              ) : (
                <Link to={item.to} className={className}>
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 * 页脚：全站唯一的深色块，负责「收尾」。
 * 只用一个中性深色 #0A0B0D，不叠发光、不叠渐变，靠字号和字距撑住气势。
 */
export function SiteFooter() {
  const categoryItems: FooterItem[] = [
    ...categories.slice(0, 3).map((item) => ({ label: item.name, to: `/links?category=${item.id}` })),
    { label: `全部 ${totalLinks} 个链接`, to: '/links', emphasis: true },
  ]

  const pageItems: FooterItem[] = nav.map((item) => ({ label: item.label, to: item.to }))

  return (
    <footer className="relative overflow-hidden bg-deep">
      <FooterPattern />
      <div className="relative shell pt-16 pb-12 sm:pt-[76px] sm:pb-14">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-[340px] space-y-4">
            <p className="font-serif text-[17px] font-semibold tracking-[0.03em] text-white">{site.brandFull}</p>
            <p className="text-[13px] leading-[22px] text-deep-mid">{site.footer.brandDesc}</p>
            <a
              href={`mailto:${site.email}`}
              className="inline-block font-mono text-[12px] tracking-[0.03em] text-deep-dim transition-colors hover:text-white"
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

        <div className="mt-14 border-t border-deep-line pt-5">
          <div className="flex flex-col gap-2 text-[11px] text-deep-dim sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono tracking-[0.03em]">{site.footer.copyright}</span>
            {latestChangeDate && (
              <span className="font-mono tracking-[0.03em]">最近更新 {formatDate(latestChangeDate)}</span>
            )}
          </div>
        </div>

        <div className="mt-12 space-y-4">
          <p className="font-serif text-[34px] leading-[1.35] tracking-[0.03em] text-white sm:text-[54px] lg:text-[68px]">
            {site.footer.closing}
          </p>
          <p className="font-mono text-[10px] tracking-wide2 text-deep-dim">{site.footer.caption}</p>
        </div>
      </div>
    </footer>
  )
}
