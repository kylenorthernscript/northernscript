# Northern Script（のーざんすくりぷと）

📝 プログラミングとAIと執筆を中心とした技術活動サイト

## 概要

Northern Script（のーざんすくりぷと）は、技術書執筆、モダンWeb開発、AI活用を中心とした技術活動を紹介するサイトです。VitePressを使用して構築されており、Catppuccinテーマを採用しています。

## 主な内容

### 📚 技術書紹介
- 技術書典での同人誌（10冊以上）
- 商業出版書籍（技術の泉シリーズ）
- Jamstack、ヘッドレスCMS、AI活用開発に関する実践的な技術書

### 💡 技術活動
- **執筆**: 技術書典・商業出版での継続的な執筆活動
- **プログラミング**: Vue.js、Nuxt.js、VitePress、Astroを中心としたモダンWeb開発
- **コンサルティング**: Jamstack導入支援、AIツール活用支援

## 技術スタック

- **Static Site Generator**: VitePress
- **Theme**: @catppuccin/vitepress
- **Content Management**: Markdown + Frontmatter
- **Deployment**: 静的ホスティング対応

## 開発

### 必要な環境
- Node.js 18+
- npm または pnpm

### セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run docs:dev

# 本番ビルド
npm run docs:build

# ビルド結果のプレビュー
npm run docs:preview
```

## ディレクトリ構造

```
/
├── public/          # 静的アセット（書影、画像等）
├── assets/          # インストールガイド用画像
├── *.md            # コンテンツページ
├── package.json    # プロジェクト設定
└── .vitepress/     # VitePress設定（別途設定が必要）
```

## 主要コンテンツ

### 技術書典書籍
- ひとりGitからの卒業 ― チーム開発への最初の一歩
- CloudFrontで始めるAWS CDN
- Markdownでドキュメントサイト爆速開発 VitePress入門
- 新潟清酒達人検定受験戦記シリーズ
- 高機能ヘッドレスCMS「Storyblok」入門
- ChatGPTと語りながら作る、Jamstack入門
- バックエンドエンジニアによる初めてのJamstack
- Jamstack以前に知りたかったこと

### 商業出版書籍
- 高機能ヘッドレスCMS『Storyblok』入門（技術評論社）
- ChatGPTと語りながら作るJamstack入門（インプレス）
- バックエンドエンジニアによる初めてのJamstack（技術評論社）

### その他コンテンツ
- PRHインストールガイド
- コードスニペット集
- 技術活動紹介

## ライセンス

- **VitePress**: MIT License
- **Catppuccin Theme**: MIT License © 2025 Catppuccin
- **Content**: このサイトのコンテンツは著者によるオリジナルです

## お問い合わせ

技術書執筆、システム開発、コンサルティングに関するご相談は、X（旧Twitter）@kyart_tokyo よりお問い合わせください。

---

🎨 Powered by [VitePress](https://vitepress.dev/) with [Catppuccin theme](https://github.com/catppuccin/vitepress)