import type { ChangeType } from '@/types'

/** 把模板里的 {count} 之类占位符替换成真实数字 */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = vars[key]
    return value === undefined ? `{${key}}` : String(value)
  })
}

/** 2026-11-18 → 2026.11.18 */
export function formatDate(iso: string): string {
  return iso.replace(/-/g, '.')
}

/** 2026-11-18 → 11.18 */
export function shortDate(iso: string): string {
  return iso.slice(5).replace('-', '.')
}

/** 从 url 里取域名，去掉 www. */
export function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export const changeLabel: Record<ChangeType, string> = {
  add: '新增',
  update: '变更',
  remove: '下架',
}
