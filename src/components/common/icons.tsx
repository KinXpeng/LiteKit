interface IconProps {
  size?: number
  className?: string
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 16 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true,
})

export function IconArrowRight({ size = 14, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M2.8 8h9.4M8.4 4.2 12.2 8l-3.8 3.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconExternal({ size = 14, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M5 11 11 5M6.2 5H11v4.8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconSearch({ size = 15, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="7" cy="7" r="4.8" stroke="currentColor" strokeWidth="1.35" />
      <path d="M10.7 10.7 13.9 13.9" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  )
}

export function IconPlus({ size = 13, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M8 2.8v10.4M2.8 8h10.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconMenu({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M2.5 5h11M2.5 8h11M2.5 11h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
