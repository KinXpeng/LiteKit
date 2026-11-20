import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Empty } from 'antd'
import { categories, pageCopy, templateVars } from '@/config'
import { fill } from '@/lib/format'
import { PageHead } from '@/components/common/PageHead'
import { CategoryChips } from '@/components/links/CategoryChips'
import { LinkSearchField } from '@/components/links/LinkSearchField'
import { LinkTable } from '@/components/links/LinkTable'
import { ALL_CATEGORIES, useLinkSearch } from '@/hooks/useLinkSearch'

export function LinksPage() {
  const { keyword, setKeyword, categoryId, setCategoryId, filtered, groups, isEmpty, total } = useLinkSearch()
  const [searchParams] = useSearchParams()

  // 支持 /links?category=dev 这种直达链接（首页分类卡、页脚都会用到）
  useEffect(() => {
    const fromUrl = searchParams.get('category')
    if (fromUrl && categories.some((item) => item.id === fromUrl)) {
      setCategoryId(fromUrl)
    } else {
      setCategoryId(ALL_CATEGORIES)
    }
  }, [searchParams, setCategoryId])

  const copy = pageCopy.links

  return (
    <div className="pb-20">
      <PageHead
        eyebrow={fill(copy.eyebrow, templateVars)}
        title={copy.title}
        desc={copy.desc}
        right={<LinkSearchField value={keyword} onChange={setKeyword} className="w-full sm:w-[340px]" />}
      />

      <div className="shell space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CategoryChips value={categoryId} onChange={setCategoryId} />
          <span className="font-mono text-[11px] tracking-[0.06em] text-ink-faint">
            {filtered.length} / {total}
          </span>
        </div>

        {isEmpty ? (
          <div className="card-surface py-16">
            <Empty description="没有匹配的链接，换个关键词试试" />
          </div>
        ) : (
          <LinkTable groups={groups} />
        )}
      </div>
    </div>
  )
}
