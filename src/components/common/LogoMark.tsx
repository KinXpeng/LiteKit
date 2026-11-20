import { site } from '@/config'

/** 品牌标：深色圆角方块 + 三根递减横线（= 一份清单） */
export function LogoMark({ size = 30, inverted = false }: { size?: number; inverted?: boolean }) {
  const bg = inverted ? '#FFFFFF' : '#0A0B0D'
  const fg = inverted ? '#0A0B0D' : '#FFFFFF'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={site.brandFull}
      role="img"
    >
      <rect x="0.5" y="0.5" width="29" height="29" rx="9" fill={bg} />
      <path d="M8 10.5h14M8 15h9.5M8 19.5h5" stroke={fg} strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  )
}
