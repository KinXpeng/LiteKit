import { useState } from 'react'
import { Drawer } from 'antd'
import { Link, NavLink } from 'react-router-dom'
import { nav } from '@/config'
import { IconMenu } from '@/components/common/icons'

/** 移动端导航：AntD Drawer 承载，避免自己写一套抽屉 */
export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        aria-label="打开菜单"
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line bg-surface text-ink md:hidden"
      >
        <IconMenu />
      </button>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement="right"
        width={260}
        title="导航"
        styles={{ body: { paddingTop: 8 } }}
      >
        <nav className="flex flex-col">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                [
                  'border-b border-line-soft py-3.5 text-[15px]',
                  isActive ? 'font-medium text-ink' : 'text-ink-muted',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/about#contact"
            onClick={() => setOpen(false)}
            className="mt-6 flex h-11 items-center justify-center rounded-[10px] bg-ink text-[14px] font-medium text-canvas"
          >
            推荐工具
          </Link>
        </nav>
      </Drawer>
    </>
  )
}
