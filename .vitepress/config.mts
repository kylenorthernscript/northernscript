import { defineConfig } from 'vitepress'

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

/**
 * 明示的なサイドバー構造定義
 */
function getOrganizedSidebar() {
  return [
    {
      text: '🏠 ホーム',
      link: '/'
    },
    {
      text: '📝 活動紹介',
      link: '/activities'
    },
    {
      text: '📚 技術書典書籍',
      collapsed: false,
      items: [
        {
          text: '技術書典18（2025年5月）',
          collapsed: false,
          items: [
            { text: 'ひとりGitからの卒業 ― チーム開発への最初の一歩', link: '/solo-git-to-team' },
            { text: 'CloudFrontで始めるAWS CDN', link: '/cloudfront-aws-cdn' }
          ]
        },
        {
          text: '技術書典17（2024年11月）',
          collapsed: true,
          items: [
            { text: 'VitePress入門', link: '/vitepress-book' }
          ]
        },
        {
          text: '技術書典16（2024年5月）',
          collapsed: true,
          items: [
            { text: '新潟清酒達人検定　銀の達人受験戦記', link: '/niigata-sake-silver' },
            { text: '新潟清酒達人検定　銅の達人受験戦記', link: '/niigata-sake-copper' }
          ]
        },
        {
          text: '技術書典15（2023年11月）',
          collapsed: true,
          items: [
            { text: 'Storyblok入門（Nuxt 3対応）', link: '/storyblok-book' }
          ]
        },
        {
          text: '技術書典14（2023年5月）',
          collapsed: true,
          items: [
            { text: 'ChatGPTと語りながら作る、Jamstack入門', link: '/chatgpt-jamstack' }
          ]
        },
        {
          text: '技術書典13（2022年11月）',
          collapsed: true,
          items: [
            { text: 'バックエンドエンジニアによる初めてのJamstack', link: '/jamstack-realtime-scoreboard' },
            { text: 'Jamstack以前に知りたかったこと', link: '/jamstack-basics' }
          ]
        }
      ]
    },
    {
      text: '📖 商業書籍',
      collapsed: false,
      items: [
        {
          text: '技術の泉シリーズ',
          collapsed: false,
          items: [
            { text: 'Storyblok入門（商業版）', link: '/storyblok-commercial' },
            { text: 'ChatGPT Jamstack入門（商業版）', link: '/chatgpt-jamstack-commercial' },
            { text: 'バックエンドエンジニアJamstack（商業版）', link: '/jamstack-backend-engineer' }
          ]
        }
      ]
    },
    {
      text: '🛠️ ツール・ガイド',
      collapsed: true,
      items: [
        { text: 'PRH VS Codeインストール', link: '/prh-install' },
        { text: 'PRH 技術書典ルール', link: '/prh-install2' },
        { text: 'コードスニペット・その他記事', link: '/code-snippets' }
      ]
    }
  ]
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Project",
  description: " ",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outlineTitle: "ページの内容",
    appearance: false,
    siteTitle: false,
    docFooter: {
      prev: "前のページ", next: "次のページ"
    },
    sidebar: getOrganizedSidebar(),

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
