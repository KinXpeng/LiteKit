import { Link } from 'react-router-dom'
import { categoryGroups, homeSections, templateVars } from '@/config'
import { domainOf, fill } from '@/lib/format'
import { SectionHead } from '@/components/common/SectionHead'
import { IconPlus } from '@/components/common/icons'

export function CategoryGrid() {
  const copy = homeSections.categories

  return (
    <section className="shell pb-20">
      <SectionHead
        eyebrow={copy.eyebrow}
        title={fill(copy.title, templateVars)}
        more={copy.more && copy.moreTo ? { label: fill(copy.more, templateVars), to: copy.moreTo } : undefined}
      />

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categoryGroups.map(({ category, links }, index) => (
          <Link
            key={category.id}
            to={`/links?category=${category.id}`}
            className="card-surface group flex flex-col gap-3.5 p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-float"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-[11px] font-medium leading-[15px] tracking-[0.08em] text-ink-ghost">
                {String(index + 1).padStart(2, '0')}
              </span>
              <IconPlus
                size={10}
                className="mt-[2px] text-ink-ghost transition-colors duration-200 group-hover:text-accent"
              />
            </div>
            <h3 className="text-[20px] font-medium leading-[27px] text-ink">{category.name}</h3>
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
