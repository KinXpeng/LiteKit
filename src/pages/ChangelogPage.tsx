import { useMemo } from 'react'
import { changelog, pageCopy, templateVars } from '@/config'
import { groupByDate } from '@/lib/derive'
import { changeLabel, fill, formatDate } from '@/lib/format'
import { PageHead } from '@/components/common/PageHead'

export function ChangelogPage() {
  const copy = pageCopy.changelog
  const groups = useMemo(() => groupByDate(changelog), [])

  return (
    <div className="pb-20">
      <PageHead
        eyebrow={fill(copy.eyebrow, templateVars)}
        title={copy.title}
        desc={copy.desc}
      />

      <div className="shell">
        <div className="divide-y divide-line border-t border-line">
          {groups.map(([date, entries]) => (
            <div key={date} className="grid gap-4 py-7 sm:grid-cols-[96px_1fr] sm:gap-12">
              <span className="font-mono text-[11px] tracking-[0.06em] text-ink-faint">{formatDate(date)}</span>

              <div className="space-y-4">
                {entries.map((entry) => (
                  <div key={entry.id} className="flex items-center gap-3.5">
                    <span
                      className={[
                        'w-10 shrink-0 font-mono text-[11px] tracking-[0.06em]',
                        entry.type === 'add' ? 'text-accent' : 'text-ink-faint',
                      ].join(' ')}
                    >
                      {changeLabel[entry.type]}
                    </span>
                    <span
                      className={[
                        'w-[150px] shrink-0 truncate text-[15px] font-medium sm:w-[200px]',
                        entry.type === 'remove' ? 'text-ink-muted' : 'text-ink',
                      ].join(' ')}
                    >
                      {entry.name}
                    </span>
                    <span className="min-w-0 flex-1 truncate font-mono text-[11px] tracking-[0.02em] text-ink-faint">
                      {entry.domain}
                      {entry.note && ` — ${entry.note}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
