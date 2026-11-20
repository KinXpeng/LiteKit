import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="shell flex min-h-[52vh] flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="font-serif text-[32px] leading-[44px] text-ink">这页还没收进来</h1>
      <p className="text-[14px] text-ink-muted">地址不对，或者这个页面已经下掉了。</p>
      <Link to="/" className="btn-dark mt-2">
        回到首页
      </Link>
    </div>
  )
}
