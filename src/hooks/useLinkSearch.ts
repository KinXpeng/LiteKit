import { useMemo, useState } from 'react'
import { categories, links } from '@/config'
import { groupByCategory, searchLinks } from '@/lib/derive'

export const ALL_CATEGORIES = 'all'

/** 「全部链接」页的筛选逻辑：关键词 + 分类，结果按分类分组 */
export function useLinkSearch() {
  const [keyword, setKeyword] = useState('')
  const [categoryId, setCategoryId] = useState<string>(ALL_CATEGORIES)

  const filtered = useMemo(() => {
    const byKeyword = searchLinks(links, keyword)
    return categoryId === ALL_CATEGORIES
      ? byKeyword
      : byKeyword.filter((link) => link.categoryId === categoryId)
  }, [keyword, categoryId])

  const groups = useMemo(() => groupByCategory(filtered, categories), [filtered])

  return {
    keyword,
    setKeyword,
    categoryId,
    setCategoryId,
    filtered,
    groups,
    isEmpty: filtered.length === 0,
    total: links.length,
  }
}
