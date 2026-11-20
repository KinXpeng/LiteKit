import type { ChangeEntry } from '@/types'

/**
 * 更新日志。date 相同的条目会自动归到同一组，按日期倒序展示。
 * type: 'add' 新增 / 'update' 变更 / 'remove' 下架
 * 加一条就够，不用改任何组件的代码。
 */
export const changelog: ChangeEntry[] = [
  { id: 'c-1118-1', date: '2026-11-18', type: 'add', name: 'Excalidraw', domain: 'excalidraw.com' },
  { id: 'c-1118-2', date: '2026-11-18', type: 'add', name: 'tldraw', domain: 'tldraw.com' },
  { id: 'c-1118-3', date: '2026-11-18', type: 'add', name: 'Craft', domain: 'craft.do' },
  { id: 'c-1105-1', date: '2026-11-05', type: 'add', name: 'Squoosh', domain: 'squoosh.app' },
  { id: 'c-1105-2', date: '2026-11-05', type: 'add', name: 'Photopea', domain: 'photopea.com' },
  {
    id: 'c-1022-1',
    date: '2026-10-22',
    type: 'add',
    name: 'Zamzar',
    domain: 'zamzar.com',
    note: '冷门格式的备选',
  },
  {
    id: 'c-1022-2',
    date: '2026-10-22',
    type: 'remove',
    name: 'Typora',
    domain: 'typora.io',
    note: '已转付费',
  },
  {
    id: 'c-1008-1',
    date: '2026-10-08',
    type: 'add',
    name: 'JSON Crack',
    domain: 'jsoncrack.com',
  },
  {
    id: 'c-1008-2',
    date: '2026-10-08',
    type: 'update',
    name: 'Hoppscotch',
    domain: 'hoppscotch.io',
    note: '界面改版',
  },
]
