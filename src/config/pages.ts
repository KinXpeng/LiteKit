import type { HomeSections, PageCopy } from '@/types'

/**
 * 页面文案。支持 {count} / {categoryCount} / {cycle} 占位符，
 * 数字由数据自动算出来，改链接数量时不用回来改文案。
 */
export const homeSections: HomeSections = {
  categories: {
    eyebrow: '01 / 按分类逛',
    title: '{categoryCount} 个分类，各取所需',
    more: '全部 {count} 个链接',
    moreTo: '/links',
  },
  recent: {
    eyebrow: '02 / 最近收录',
    title: '这两周新加的',
    more: '更新日志',
    moreTo: '/changelog',
  },
  principles: {
    eyebrow: '03 / 收录标准',
    title: ['把好用的东西，', '留在一个地方。'],
  },
}

export const pageCopy: PageCopy = {
  links: {
    eyebrow: '{count} LINKS / {categoryCount} 个分类',
    title: '全部链接',
    desc: '点任意一行直接跳到原站。按分类筛选，或者搜名字和域名。',
  },
  categories: {
    eyebrow: '{categoryCount} 个分类 / {count} 个链接',
    title: '分类',
    desc: '按用途分组。同一类场景里，只留最好用的那几个。',
  },
  changelog: {
    eyebrow: 'CHANGELOG / {cycle}一批',
    title: '更新',
    desc: '加进来的、下架的，都写在这里。不做静默删除。',
  },
  about: {
    eyebrow: 'ABOUT / 关于这个站',
    title: '关于',
    lead: ['它一开始只是我浏览器里的一个书签文件夹。', '两年删删改改，留下来的，都是每周真会打开的工具。'],
    heading: '为什么做这个',
    paragraphs: [
      '搜索前三页，大半是聚合站和下载站，真正好用的反而排在后面。与其每次重新翻一遍，不如把顺手的记下来、按用途归好类，下次直接点。',
      '所以这里没有排行榜，也没有「编辑推荐」。顺序只跟两件事有关：我多久用一次，以及它有没有在上面塞广告。你要是发现更顺手的，欢迎把它换掉。',
    ],
    contactTitle: '想推荐一个工具？',
    contactDesc: '直接发邮件，我每两周一起看一遍。',
    contactCta: '写邮件',
  },
}
