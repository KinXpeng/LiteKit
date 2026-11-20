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
    lead: '这个站本来只是我自己的书签栏。用了两年，攒下几十个链接——删掉的，比留下的多得多。',
    heading: '为什么做这个',
    paragraphs: [
      '搜索结果越来越难用了。前几页全是 SEO 农场和下载站，真正好用的工具反而藏在后面。于是我干脆把用得顺手的都记下来，放在一个自己的页面上。',
      '这里没有排行榜，也没有「编辑推荐」这种话术。位置先后只跟我用得频不频率有关。你要是发现更好用的，欢迎替换掉它。',
    ],
    contactTitle: '想推荐一个工具？',
    contactDesc: '直接发邮件，我每两周一起看一遍。',
    contactCta: '写邮件',
  },
}
