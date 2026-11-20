import { useEffect, useMemo, useRef, useState } from 'react'
import { Modal } from 'antd'
import { links } from '@/config'
import { searchLinks } from '@/lib/derive'
import { domainOf } from '@/lib/format'
import { useSearchPalette } from '@/context/SearchContext'
import { IconExternal, IconSearch } from '@/components/common/icons'

const MAX_RESULTS = 6

/** 命令面板：Ctrl/⌘ + K 唤起，回车打开第一条 */
export function CommandPalette() {
  const { open, closePalette } = useSearchPalette()
  const [keyword, setKeyword] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => searchLinks(links, keyword).slice(0, MAX_RESULTS), [keyword])

  useEffect(() => {
    if (open) {
      setKeyword('')
      setActiveIndex(0)
      window.setTimeout(() => inputRef.current?.focus(), 60)
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [keyword])

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
    closePalette()
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((prev) => (prev + 1) % Math.max(results.length, 1))
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((prev) => (prev - 1 + results.length) % Math.max(results.length, 1))
    }
    if (event.key === 'Enter' && results[activeIndex]) {
      openLink(results[activeIndex].url)
    }
  }

  return (
    <Modal
      open={open}
      onCancel={closePalette}
      footer={null}
      closable={false}
      width={560}
      style={{ top: 120 }}
      styles={{ body: { padding: 0 } }}
      destroyOnClose
    >
      <div onKeyDown={onKeyDown}>
        <div className="flex h-[58px] items-center gap-2.5 border-b border-line-soft px-[15px]">
          <IconSearch className="text-ink-faint" />
          <input
            ref={inputRef}
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="搜索工具或域名"
            className="h-full flex-1 border-0 bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-faint"
          />
          <kbd className="rounded-[5px] bg-line-soft px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">ESC</kbd>
        </div>

        <div className="max-h-[360px] overflow-y-auto">
          {results.length === 0 && (
            <p className="px-[15px] py-8 text-center text-[13px] text-ink-faint">没有匹配的链接，换个词试试</p>
          )}
          {results.map((link, index) => (
            <button
              key={link.id}
              type="button"
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => openLink(link.url)}
              className={[
                'flex w-full items-center gap-3 px-[15px] py-3 text-left transition-colors',
                index === activeIndex ? 'bg-accent-soft' : 'hover:bg-canvas',
              ].join(' ')}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface text-[11px] font-medium text-ink-muted ring-1 ring-line">
                {link.name.slice(0, 1).toUpperCase()}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium leading-[17px] text-ink">{link.name}</span>
                <span className="block truncate font-mono text-[10px] leading-[13px] text-ink-faint">
                  {domainOf(link.url)}
                </span>
              </span>
              <IconExternal className={index === activeIndex ? 'text-accent' : 'text-ink-faint'} />
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-line-soft bg-[#F7F8FA] px-[15px] py-2.5">
          <span className="font-mono text-[10px] tracking-[0.04em] text-ink-faint">↑ ↓ 选择</span>
          <span className="font-mono text-[10px] tracking-[0.04em] text-ink-faint">ENTER 打开</span>
        </div>
      </div>
    </Modal>
  )
}
