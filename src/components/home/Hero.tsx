import { Link } from 'react-router-dom'
import { site, templateVars } from '@/config'
import { fill } from '@/lib/format'
import { IconArrowRight } from '@/components/common/icons'
import { PalettePreview } from './PalettePreview'

export function Hero() {
  return (
    <section className="shell flex flex-col gap-10 pt-12 pb-14 lg:flex-row lg:items-center lg:gap-16 lg:pt-24 lg:pb-24">
      <div className="w-full space-y-6 lg:max-w-[700px]">
        <span className="inline-flex h-[30px] items-center gap-2 rounded-full border border-line bg-surface px-3.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-[12px] tracking-[0.02em] text-ink-muted">
            {fill(site.hero.badge, templateVars)}
          </span>
        </span>

        <h1 className="font-serif text-[38px] leading-[1.28] tracking-[0.02em] text-ink sm:text-[52px] lg:text-[64px] lg:leading-[1.34]">
          {site.hero.title[0]}
          <br />
          {site.hero.title[1]}
        </h1>

        <p className="max-w-[490px] text-[15px] leading-[28px] text-ink-muted sm:text-[17px] sm:leading-[31px]">
          {site.hero.subline}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link to="/links" className="btn-dark">
            {site.hero.primaryCta}
            <IconArrowRight />
          </Link>
          <Link to="/about#contact" className="btn-ghost">
            {site.hero.secondaryCta}
          </Link>
        </div>

        <p className="font-mono text-[11px] tracking-[0.06em] text-ink-faint">{site.hero.metaLine}</p>
      </div>

      <PalettePreview />
    </section>
  )
}
