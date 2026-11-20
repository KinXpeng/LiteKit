import { Link } from 'react-router-dom'
import { site, templateVars } from '@/config'
import { fill } from '@/lib/format'
import { IconArrowRight } from '@/components/common/icons'
import { HeroPattern } from '@/components/common/Patterns'
import { PalettePreview } from './PalettePreview'

export function Hero() {
  return (
    <section className="shell relative flex flex-col gap-12 pt-10 pb-16 lg:flex-row lg:items-center lg:gap-14 lg:pt-24 lg:pb-28">
      {/* 右侧图案：满铺网格 + 同心弧，压在搜索卡下面；超出首屏的部分直接裁掉 */}
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden xl:block">
        <div className="absolute right-0 top-0">
          <HeroPattern />
        </div>
      </div>

      <div className="relative w-full space-y-7 lg:max-w-[700px]">
        <span className="inline-flex h-8 items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 shadow-lift">
          <span className="h-[7px] w-[7px] rounded-full bg-accent" />
          <span className="text-[12px] font-medium tracking-[0.02em] text-ink-muted">
            {fill(site.hero.badge, templateVars)}
          </span>
        </span>

        <h1 className="font-serif text-[38px] leading-[1.28] tracking-[0.02em] text-ink sm:text-[56px] sm:leading-[1.26] lg:text-[76px] lg:leading-[1.32]">
          {site.hero.title[0]}
          <br />
          {site.hero.title[1]}
        </h1>

        <p className="max-w-[560px] text-[15px] leading-[30px] text-ink-muted sm:text-[17px] sm:leading-[32px]">
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

        <p className="font-mono text-[11px] tracking-[0.08em] text-ink-faint">{site.hero.metaLine}</p>
      </div>

      <div className="relative w-full max-w-[420px] shrink-0">
        <PalettePreview />
      </div>
    </section>
  )
}
