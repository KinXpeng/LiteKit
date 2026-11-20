import type { ReactNode } from 'react'

interface PageHeadProps {
  eyebrow: string
  title: string
  desc?: string
  right?: ReactNode
}

/** 内页页头：眉标 + 52px 宋体标题 + 说明 + 右侧操作位 */
export function PageHead({ eyebrow, title, desc, right }: PageHeadProps) {
  return (
    <header className="shell pt-12 pb-8 sm:pt-14 sm:pb-9">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="font-serif text-[40px] leading-[52px] tracking-[0.02em] text-ink sm:text-[52px] sm:leading-[66px]">
            {title}
          </h1>
        </div>
        {right}
      </div>
      {desc && <p className="mt-5 max-w-[620px] text-[14px] leading-[26px] text-ink-muted sm:text-[15px]">{desc}</p>}
    </header>
  )
}
