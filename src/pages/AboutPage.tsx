import { categoryCount, pageCopy, site, totalLinks } from '@/config'
import { PageHead } from '@/components/common/PageHead'

export function AboutPage() {
  const copy = pageCopy.about

  const facts = [
    { label: '起始', value: site.since },
    { label: '收录', value: `${totalLinks} 个链接` },
    { label: '分类', value: `${categoryCount} 个` },
    { label: '更新', value: site.updateCycle },
  ]

  return (
    <div className="pb-20">
      <PageHead eyebrow={copy.eyebrow} title={copy.title} />

      <div className="shell -mt-2">
        <p className="max-w-[860px] font-serif text-[19px] leading-[32px] tracking-[0.01em] text-ink sm:text-[24px] sm:leading-[40px] lg:text-[26px] lg:leading-[44px]">
          {copy.lead.map((line) => (
            <span key={line} className="inline lg:block">
              {line}
            </span>
          ))}
        </p>
      </div>

      <div className="shell mt-12 grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-20">
        <div className="space-y-[18px]">
          <h2 className="text-[16px] font-medium text-ink">{copy.heading}</h2>
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 12)} className="text-[14px] leading-[30px] text-ink-soft">
              {paragraph}
            </p>
          ))}
        </div>

        <dl className="space-y-4">
          {facts.map((fact) => (
            <div key={fact.label} className="flex items-center justify-between gap-4">
              <dt className="text-[12px] text-ink-faint">{fact.label}</dt>
              <dd className="font-mono text-[13px] tracking-[0.02em] text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section id="contact" className="shell mt-16 scroll-mt-28">
        <div className="card-surface flex flex-col gap-5 p-6 shadow-float sm:flex-row sm:items-center sm:justify-between sm:px-[30px] sm:py-[26px]">
          <div className="space-y-1.5">
            <p className="text-[16px] font-medium text-ink">{copy.contactTitle}</p>
            <p className="text-[13px] leading-[20px] text-ink-muted">{copy.contactDesc}</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${site.email}`}
              className="font-mono text-[13px] tracking-[0.02em] text-ink-muted transition-colors hover:text-ink"
            >
              {site.email}
            </a>
            <a href={`mailto:${site.email}`} className="btn-dark-sm">
              {copy.contactCta}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
