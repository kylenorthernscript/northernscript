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
          text: '技術書典20（2026年5月）',
          collapsed: false,
          items: [
            { text: 'AIに読まれる技術 ── LLMO・AEO・GEOで実現する次世代の情報設計', link: '/books/technical/ai-readable-tech' }
          ]
        },
        {
          text: '技術書典19（2025年11月）',
          collapsed: false,
          items: [
            { text: '街歩き謎解きゲームをゼロから作ってみた', link: '/books/technical/nazo-game' }
          ]
        },
        {
          text: '技術書典18（2025年5月）',
          collapsed: false,
          items: [
            { text: 'ひとりGitからの卒業 ― チーム開発への最初の一歩', link: '/books/technical/solo-git-to-team' },
            { text: 'CloudFrontで始めるAWS CDN', link: '/guides/cloudfront-aws-cdn' }
          ]
        },
        {
          text: '技術書典17（2024年11月）',
          collapsed: true,
          items: [
            { text: 'VitePress入門', link: '/books/technical/vitepress-book' }
          ]
        },
        {
          text: '技術書典16（2024年5月）',
          collapsed: true,
          items: [
            { text: '新潟清酒達人検定　銀の達人受験戦記', link: '/books/other/niigata-sake-silver' },
            { text: '新潟清酒達人検定　銅の達人受験戦記', link: '/books/other/niigata-sake-copper' }
          ]
        },
        {
          text: '技術書典15（2023年11月）',
          collapsed: true,
          items: [
            { text: 'Storyblok入門（Nuxt 3対応）', link: '/books/technical/storyblok-book' }
          ]
        },
        {
          text: '技術書典14（2023年5月）',
          collapsed: true,
          items: [
            { text: 'ChatGPTと語りながら作る、Jamstack入門', link: '/books/technical/chatgpt-jamstack' }
          ]
        },
        {
          text: '技術書典13（2022年11月）',
          collapsed: true,
          items: [
            { text: 'バックエンドエンジニアによる初めてのJamstack', link: '/books/technical/jamstack-realtime-scoreboard' },
            { text: 'Jamstack以前に知りたかったこと', link: '/books/technical/jamstack-basics' }
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
            { text: 'GitHub実践入門 ブランチ戦略とコードレビュー', link: '/books/technical/github-practical-intro' },
            { text: '高機能ヘッドレスCMS『Storyblok』入門', link: '/books/technical/storyblok-commercial' },
            { text: 'ChatGPTと語りながら作るJamstack入門', link: '/books/technical/chatgpt-jamstack-commercial' },
            { text: 'バックエンドエンジニアによる初めてのJamstack', link: '/books/technical/jamstack-backend-engineer' }
          ]
        }
      ]
    },
    {
      text: '🛠️ ツール・ガイド',
      collapsed: true,
      items: [
        { text: 'PRH VS Codeインストール', link: '/tools/prh-install' },
        { text: 'PRH 技術書典ルール', link: '/tools/prh-install2' },
        { text: 'コードスニペット・その他記事', link: '/guides/code-snippets' }
      ]
    }
  ]
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Northern Script",
  description: "のーざんすくりぷと",
  lang: 'ja-JP',
  lastUpdated: true,
  sitemap: {
    hostname: 'https://blogs.northernscript.jp'
  },
  cleanUrls: true,
  
  locales: {
    root: {
      label: '日本語',
      lang: 'ja-JP',
      themeConfig: {
        nav: [
          { text: 'ホーム', link: '/' },
          { text: 'English', link: '/en/' }
        ]
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Northern Script',
      description: 'Technical Author, Travel Guide, and Language Professional',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Travel Guides', link: '/en/travel/' },
          { text: 'Book Recommendations', link: '/en/books/mystery-novels' },
          { text: 'Work with Me', link: '/en/contact' },
          { text: '日本語', link: '/' }
        ]
      }
    }
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 1000
    }
  },
  head: [
    ['meta', { charset: 'utf-8' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'description', content: 'のーざんすくりぷと - プログラミング、AI、執筆に関する技術書や記事を公開しています' }],
    ['meta', { name: 'keywords', content: 'プログラミング,技術書,VitePress,Jamstack,AI,執筆' }],
    ['meta', { name: 'author', content: 'Northern Script' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { property: 'og:title', content: 'Northern Script' }],
    ['meta', { property: 'og:description', content: 'のーざんすくりぷと - プログラミング、AI、執筆に関する技術書や記事を公開しています' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://blogs.northernscript.jp' }],
    ['meta', { property: 'og:image', content: 'https://blogs.northernscript.jp/ns_hero.png' }],
    ['meta', { property: 'og:site_name', content: 'Northern Script' }],
    ['meta', { property: 'og:locale', content: 'ja_JP' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@kyart_tokyo' }],
    ['meta', { name: 'twitter:creator', content: '@kyart_tokyo' }],
    ['meta', { name: 'twitter:title', content: 'Northern Script' }],
    ['meta', { name: 'twitter:description', content: 'のーざんすくりぷと - プログラミング、AI、執筆に関する技術書や記事を公開しています' }],
    ['meta', { name: 'twitter:image', content: 'https://blogs.northernscript.jp/ns_hero.png' }],
    ['meta', { name: 'p:domain_verify', content: '52ec38730f6adfa767884ca47972b03b' }],
    ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/ns_hero.png' }],
    ['link', { rel: 'canonical', href: 'https://blogs.northernscript.jp' }],
    ['link', { rel: 'alternate', hreflang: 'ja', href: 'https://blogs.northernscript.jp/' }],
    ['link', { rel: 'alternate', hreflang: 'en', href: 'https://blogs.northernscript.jp/en/' }],
    ['link', { rel: 'alternate', hreflang: 'x-default', href: 'https://blogs.northernscript.jp/' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    // Google Analytics 4
    ['script', { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-JZ65XK33TF' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-JZ65XK33TF');
    `],
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Website',
      'name': 'Northern Script',
      'description': 'のーざんすくりぷと - プログラミング、AI、執筆に関する技術書や記事を公開しています',
      'url': 'https://blogs.northernscript.jp',
      'author': {
        '@type': 'Person',
        'name': 'Northern Script',
        'sameAs': [
          'https://github.com/kylenorthernscript',
          'https://x.com/kyart_tokyo'
        ]
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Northern Script',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://blogs.northernscript.jp/ns_hero.png'
        }
      }
    })]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outlineTitle: "ページの内容",
    appearance: false,
    siteTitle: false,
    docFooter: {
      prev: "前のページ", next: "次のページ"
    },
    sidebar: {
      '/en/books/': [
        {
          text: '📚 Japanese Mystery Novels',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/en/books/mystery-novels' },
            { 
              text: 'Book Reviews',
              collapsed: false,
              items: [
                { text: 'The Devotion of Suspect X', link: '/en/books/mystery-novels/devotion-of-suspect-x' },
                { text: 'Malice', link: '/en/books/mystery-novels/malice' },
                { text: 'Journey Under the Midnight Sun', link: '/en/books/mystery-novels/journey-under-midnight-sun' },
                { text: 'Puppet Master', link: '/en/books/mystery-novels/puppet-master' },
                { text: 'The Tokyo Zodiac Murders', link: '/en/books/mystery-novels/tokyo-zodiac-murders' },
                { text: 'Murder in the Crooked House', link: '/en/books/mystery-novels/murder-crooked-house' },
                { text: 'The Decagon House Murders', link: '/en/books/mystery-novels/decagon-house-murders' },
                { text: 'The Perfect Insider', link: '/en/books/mystery-novels/perfect-insider' },
                { text: 'Six Four', link: '/en/books/mystery-novels/six-four' },
                { text: 'Confessions', link: '/en/books/mystery-novels/confessions' },
                { text: 'The Mill House Murders', link: '/en/books/mystery-novels/mill-house-murders' }
              ]
            }
          ]
        }
      ],
      '/en/': [],
      '/': getOrganizedSidebar()
    },


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
      },
      config: (md) => {
        // 画像の最適化とレスポンシブ対応
        md.renderer.rules.image = (tokens, idx, options, env) => {
          const token = tokens[idx]
          const srcIndex = token.attrIndex('src')
          const src = token.attrs[srcIndex][1]
          const alt = token.content

          return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async" fetchpriority="low" style="max-width: 100%; height: auto; contain: layout style;">`
        }
      }
    },


    socialLinks: [
      { icon: 'github', link: 'https://github.com/kylenorthernscript', ariaLabel: 'GitHubプロフィールを見る' },
      { icon: 'twitter', link: 'https://x.com/kyart_tokyo', ariaLabel: 'Twitterプロフィールを見る' }
    ]
  }
})
