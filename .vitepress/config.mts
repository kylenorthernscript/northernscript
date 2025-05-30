import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const _basePath = ""

/**
 * カスタム slugify 関数
 */
function customSlugify(str) {
  return str
      .normalize('NFKC')
      .replace(/：/g, '-')
      .replace(/\s+/g, '-')
      .replace(/[^\p{L}\p{N}-]/gu, '')
      .toLowerCase()
}

function getSidebarItems(dir, basePath = _basePath) {
  const items = []
  let topItem = null
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    if (
        entry.name.startsWith('.') ||
        entry.name === 'node_modules' ||
        entry.name === '.node_modules' ||
        entry.name.toLowerCase() === 'readme.md'
    ) {
      continue
    }

    const fullPath = path.join(dir, entry.name)
    if (entry.isFile() && entry.name.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf-8')
      const { data: frontMatter, content: mdContent } = matter(content)

      let order = 0
      if (frontMatter.order !== undefined) {
        order = Number(frontMatter.order)
      } else {
        const numPrefix = entry.name.match(/^(\d+)/)
        if (numPrefix) order = Number(numPrefix[1])
      }

      if (entry.name === 'index.md') {
        const pageTitle = 'TOP'
        // ───── H2 抽出をコメントアウト（不要） ─────
        // const regex = /^##\s+(.*)$/gm
        // let match
        // const sections = []
        // while ((match = regex.exec(mdContent)) !== null) {
        //   const sectionTitle = match[1].trim()
        //   const anchor = customSlugify(sectionTitle)
        //   sections.push({
        //     text: sectionTitle,
        //     link: `${basePath || ''}/#${anchor}`
        //   })
        // }
        // ────────────────────────────────────────

        topItem = {
          text: pageTitle,
          link: `${basePath || ''}/`,
          // items: sections.length > 0 ? sections : undefined,  // H2 セクションは表示しない
          order
        }
      } else {
        // H1 をページタイトルとして取得
        const h1Regex = /^#\s+(.*)$/m
        const h1Match = mdContent.match(h1Regex)
        const pageTitle = h1Match ? h1Match[1].trim() : entry.name.replace('.md', '')

        // ───── H2 抽出をコメントアウト（不要） ─────
        // const regex = /^##\s+(.*)$/gm
        // let match
        // const sections = []
        // while ((match = regex.exec(mdContent)) !== null) {
        //   const sectionTitle = match[1].trim()
        //   const anchor = customSlugify(sectionTitle)
        //   sections.push({
        //     text: sectionTitle,
        //     link: `${basePath || ''}/${entry.name.replace('.md', '')}#${anchor}`
        //   })
        // }
        // ────────────────────────────────────────

        items.push({
          text: pageTitle,
          link: `${basePath || ''}/${entry.name.replace('.md', '')}`,
          // items: sections.length > 0 ? sections : undefined,  // H2 セクションは表示しない
          order
        })
      }
    } else if (entry.isDirectory()) {
      const childItems = getSidebarItems(fullPath, `${basePath || ''}/${entry.name}`)
      if (childItems.length > 0) {
        let order = 0
        const numPrefix = entry.name.match(/^(\d+)/)
        if (numPrefix) order = Number(numPrefix[1])
        items.push({
          text: entry.name,
          items: childItems,
          order
        })
      }
    }
  }

  items.sort((a, b) => {
    const orderA = a.order || 0
    const orderB = b.order || 0
    if (orderA === orderB) return a.text.localeCompare(b.text)
    return orderA - orderB
  })

  return topItem ? [topItem, ...items] : items
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Projet",
  description: " ",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outlineTitle: "ページの内容",
    appearance: false,
    siteTitle: false,
    docFooter: {
      prev: "前のページ", next: "次のページ"
    },
    sidebar: getSidebarItems(path.resolve(__dirname, '../' + _basePath)),

    nav: [
      { text: 'Home', link: '/' },
    ],

    markdown: {
      anchor: {
        slugify: (str) => customSlugify(str)
      },
      theme: {
        light: "catppuccin-latte",
        dark: "catppuccin-mocha",
      },
      image: {
        // image lazy loading is disabled by default
        lazyLoading: true
      }
    },


    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
