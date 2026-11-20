import { Link } from 'react-router-dom'
import { categoryGroups, pageCopy, templateVars } from '@/config'
import { fill } from '@/lib/format'
import { PageHead } from '@/components/common/PageHead'
import { IconArrowRight } from '@/components/common/icons'

export function CategoriesPage() {
  const copy = pageCopy.categories

  return (
    <div className="pb-20">
      <PageHead
        eyebrow={fill(copy.eyebrow, templateVars)}
        title={copy.title}
        desc={copy.desc}
      />

      <div className="shell">
        <div className="divide-y divide-line border-t border-line">
          {categoryGroups.map(({ category, links }) => (
            <div key={category.id} className="grid gap-3 py-7 sm:grid-cols-[240px_1fr] sm:gap-12">
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-[20px] leading-[30px] tracking-[0.01em] text-ink">
                  {category.name}
                </h2>
                <span className="rounded-full bg-line-soft px-2 py-[2px] font-mono text-[10px] leading-[14px] tracking-[0.04em] text-ink-muted">
                  {String(links.length).padStart(2, '0')}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-[13px] leading-[21px] text-ink-muted">{category.description}</p>
                <p className="text-[14px] leading-[26px] text-ink-soft">
                  {links.map((link, index) => (
                    <span key={link.id}>
                      {index > 0 && <span className="mx-1.5 text-line">·</span>}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-accent"
                      >
                        {link.name}
                      </a>
                    </span>
                  ))}
                </p>
                <Link
                  to={`/links?category=${category.id}`}
                  className="group inline-flex items-center gap-1.5 pt-1 text-[12px] text-ink-muted transition-colors hover:text-ink"
                >
                  在这个分类里看全部
                  <IconArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
