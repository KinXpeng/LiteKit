import { Link } from 'react-router-dom'
import { IconArrowRight } from './icons'

interface SectionHeadProps {
  eyebrow: string
  title: string
  more?: { label: string; to: string }
}

/** 区块标题：左侧小标 + 大标题，右侧可选的「更多」链接 */
export function SectionHead({ eyebrow, title, more }: SectionHeadProps) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <span className="accent-rule" />
        <p className="eyebrow mt-3.5">{eyebrow}</p>
        <h2 className="mt-3 font-serif text-[26px] leading-[36px] tracking-[0.02em] text-ink sm:text-[34px] sm:leading-[46px]">
          {title}
        </h2>
      </div>
      {more && (
        <Link
          to={more.to}
          className="group inline-flex shrink-0 items-center gap-2 pb-1 text-[13px] text-ink-muted transition-colors hover:text-ink"
        >
          {more.label}
          <IconArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  )
}
