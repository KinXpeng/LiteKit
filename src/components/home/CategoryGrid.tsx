import { Link } from 'react-router-dom'
import { categoryGroups, homeSections, templateVars } from '@/config'
import { domainOf, fill } from '@/lib/format'
import { SectionHead } from '@/components/common/SectionHead'

export function CategoryGrid() {
  const copy = homeSections.categories

  return (
    <section className="shell pb-16">
      <SectionHead
        eyebrow={copy.eyebrow}
        title={fill(copy.title, templateVars)}
        more={copy.more && copy.moreTo ? { label: fill(copy.more, templateVars), to: copy.moreTo } : undefined}
      />

      <div className="mt-8 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
        {categoryGroups.map(({ category, links }) => (
          <Link
            key={category.id}
            to={`/links?category=${category.id}`}
            className="card-surface group flex flex-col gap-2.5 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C9CED8]"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-[17px] font-medium text-ink">{category.name}</h3>
              <span className="font-mono text-[11px] tracking-[0.08em] text-ink-faint">
                {String(links.length).padStart(2, '0')}
              </span>
            </div>
            <p className="text-[13px] leading-[21px] text-ink-muted">{category.description}</p>
            <p className="mt-1 truncate font-mono text-[10px] tracking-[0.02em] text-ink-faint">
              {links.slice(0, 3).map((link) => domainOf(link.url)).join(' · ')}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
