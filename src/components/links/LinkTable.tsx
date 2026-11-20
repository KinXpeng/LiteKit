import type { CategoryGroup } from '@/lib/derive'
import { LinkRow } from './LinkRow'

/** 按分类分组的链接表 */
export function LinkTable({ groups }: { groups: CategoryGroup[] }) {
  return (
    <div className="space-y-12">
      {groups.map(({ category, links }) => (
        <section key={category.id}>
          <div className="mb-3 flex items-baseline gap-2.5">
            <h2 className="text-[17px] font-medium text-ink">{category.name}</h2>
            <span className="font-mono text-[11px] tracking-[0.08em] text-ink-faint">
              {String(links.length).padStart(2, '0')}
            </span>
          </div>
          <div className="card-surface divide-y divide-line-soft overflow-hidden">
            {links.map((link) => (
              <LinkRow key={link.id} link={link} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
