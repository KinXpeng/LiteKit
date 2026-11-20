import type { NavItem } from '@/types'

/** 顶部导航。顺序即展示顺序 */
export const nav: NavItem[] = [
  { label: '全部链接', to: '/links' },
  { label: '分类', to: '/categories' },
  { label: '更新', to: '/changelog' },
  { label: '关于', to: '/about' },
]
