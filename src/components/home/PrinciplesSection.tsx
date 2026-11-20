import { homeSections, principles } from '@/config'

/**
 * 收录标准：白底 + 细线分隔。
 * 深色只留给页脚，这里保持浅色，整页的明暗节奏才落在底部一处。
 */
export function PrinciplesSection() {
  const copy = homeSections.principles

  return (
    <section className="shell py-20 sm:py-[88px]">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h2 className="mt-4 font-serif text-[28px] leading-[1.45] tracking-[0.02em] text-ink sm:text-[44px] sm:leading-[1.4] lg:text-[50px]">
        {copy.title[0]}
        <br />
        {copy.title[1]}
      </h2>

      <div className="mt-12 grid gap-9 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-line">
        {principles.map((item, index) => (
          <div key={item.title} className={index === 0 ? 'sm:pr-10' : index === 1 ? 'sm:px-10' : 'sm:pl-10'}>
            <p className="font-mono text-[11px] tracking-[0.08em] text-ink-ghost">
              {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="mt-2.5 text-[17px] font-medium leading-[25px] text-ink">{item.title}</h3>
            <p className="mt-2.5 text-[13px] leading-[22px] text-ink-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
