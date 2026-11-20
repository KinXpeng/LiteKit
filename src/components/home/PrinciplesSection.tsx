import { homeSections, principles } from '@/config'

export function PrinciplesSection() {
  const copy = homeSections.principles

  return (
    <section className="border-t border-line">
      <div className="shell py-16 sm:py-[76px]">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 className="mt-3 font-serif text-[26px] leading-[1.5] tracking-[0.02em] text-ink sm:text-[32px]">
          {copy.title[0]}
          <br />
          {copy.title[1]}
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-line">
          {principles.map((item, index) => (
            <div
              key={item.title}
              className={index === 0 ? 'sm:pr-8' : index === 1 ? 'sm:px-8' : 'sm:pl-8'}
            >
              <p className="font-mono text-[10px] tracking-[0.08em] text-ink-faint">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 text-[16px] font-medium text-ink">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-[22px] text-ink-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
