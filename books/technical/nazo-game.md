---
title: 街歩き謎解きゲームをゼロから作ってみた
description: 現実の街をステージにする体験設計とWeb実装の記録
editLink: true
prev:
  text: 'VitePress入門'
  link: '/books/technical/vitepress-book'
next:
  text: 'Storyblok入門（Nuxt 3対応）'
  link: '/books/technical/storyblok-book'
---

# 街歩き謎解きゲームをゼロから作ってみた

<div class="book-detail-header">
  <img src="/nazo-cover.jpg" alt="街歩き謎解きゲームをゼロから作ってみた Book Cover" class="book-detail-cover">
  <div class="book-detail-info">
    <div class="tip-box">
      <strong>技術書典19出展</strong><br>
      現実の街をステージにしたリアル・ロケーション型謎解きゲームの企画から実装、テストまでの全プロセスを記録した一冊です。
    </div>
    <a href="https://techbookfest.org/product/bLHbQVbxKCVTv4LcDU8Rvz?productVariantID=4K1k46d5a5kfp5uTVfLLkN" target="_blank" rel="noopener noreferrer" class="purchase-button purchase-button-top">
      📚 技術書典で購入する
    </a>
    <h2>書籍概要</h2>
    <p>「謎解きゲーム」と聞くと、室内で紙とペンを使って楽しむものを思い浮かべる人が多いかもしれません。しかし、スマートフォンとWebブラウザがあれば、街そのものを舞台にした「リアル・ロケーション型謎解きゲーム」を個人でも作れる時代になりました。</p>
  </div>
</div>

<style>
.book-detail-header {
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
  align-items: flex-start;
}

.book-detail-cover {
  width: 120px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.book-detail-info {
  flex: 1;
}

.tip-box {
  background: #f0f9ff;
  border: 1px solid #0ea5e9;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #0c4a6e;
}

.purchase-button {
  display: inline-block;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
  border: none;
  cursor: pointer;
  line-height: 1.4;
}

.purchase-button:hover {
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
  text-decoration: none;
  color: white;
}

.purchase-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
}

.purchase-button-top {
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 280px;
}

.purchase-button-bottom {
  padding: 16px 32px;
  font-size: 18px;
  margin: 2rem auto;
  display: block;
  max-width: 320px;
}

@media (max-width: 768px) {
  .book-detail-header {
    flex-direction: column;
    gap: 1rem;
  }

  .book-detail-cover {
    width: 100px;
    align-self: center;
  }
}
</style>

## はじめに

本書『街歩き謎解きゲームをゼロから作ってみた』は、筆者が謎解きゲームのプロトタイプを作る依頼を受けたところからスタートします。外国人を対象に英語での街歩き謎解きゲームの企画設計のすべてを記載しています。

舞台の選定、謎の製作過程と苦労、実装、実地でのモニターによるテスト、そこから得られた知見をまとめた**プロジェクトの全記録**です。

### 副題：現実の街をステージにする体験設計とWeb実装の記録

「どこから手を付ければいいのか分からない」「位置情報ゲームってどう作るの？」という読者に、現実の街を使った体験型コンテンツの作り方を、具体的なコードと事例を交えて紹介します。

観光とテクノロジー、ストーリーテリングと実装、アイデアと現場検証。
それらをすべて横断的に体験できる一冊として、開発者・デザイナー・謎解きファンのいずれにも楽しんでいただける内容です。

## 想定読者

本書は以下のような方々を対象としています：

### 開発者
- **Web開発者**: フロントエンドの基礎を持ち、実際に動く企画を作ってみたい人
- **位置情報アプリ開発者**: GPSやWeb APIを活用したロケーションベースのサービスに興味がある人
- **フルスタック開発者**: 企画から実装、テストまでの全工程を学びたい人

### 企画・デザイナー
- **イベント企画者**: 地域イベントや観光向けにオリジナル体験を設計したい人
- **体験設計者**: 現実空間を使ったインタラクティブな体験を作りたい人
- **観光関係者**: 地域の魅力を活かしたコンテンツを企画したい人

### 謎解きファン
- **謎解きクリエイター**: 自分で謎解きゲームを作ってみたい人
- **街歩き愛好者**: 街歩きと謎解きを組み合わせた新しい体験に興味がある人
- **ゲームデザイナー**: リアル空間を使ったゲーム設計に関心がある人

## 本書の特徴

### 実践的なプロジェクト記録
- **リアルな開発プロセス**: 依頼から完成まで、実際のプロジェクトの全工程を記録
- **失敗と改善**: うまくいかなかった点や試行錯誤の過程も包み隠さず公開
- **現場のフィードバック**: 実地テストで得られた生の声と改善策

### 技術と企画の両面からアプローチ
- **体験設計**: ユーザーが楽しめる謎解き体験の設計方法
- **実装技術**: Web技術を使った位置情報ゲームの実装方法
- **テスト手法**: 実地でのテストと改善サイクルの回し方

### 再現可能な内容
- **具体的なコード**: 実際に使用したコードやAPI活用例
- **舞台選定のポイント**: 街歩き謎解きに適した場所の選び方
- **謎作りのコツ**: 街の特性を活かした謎の作り方

## 主な内容

### 第1章：プロジェクトの始まり
- 依頼内容と要件定義
- 対象ユーザー（外国人観光客）の分析
- プロジェクトのゴール設定

### 第2章：舞台選定と企画
- 街歩き謎解きに適した場所の条件
- 実際の舞台選定プロセス
- ルート設計と所要時間の検討

### 第3章：謎の製作
- 謎解きの種類と難易度設定
- 街の特性を活かした謎の作り方
- 英語での謎作りの注意点
- 試作と改善のプロセス

### 第4章：Web実装
- 技術スタックの選定
- 位置情報APIの活用
- プログレッシブWebアプリ（PWA）の実装
- オフライン対応とパフォーマンス最適化

### 第5章：実地テストと改善
- モニターテストの設計
- フィードバックの収集と分析
- 改善点の洗い出しと対応
- 最終調整と完成

### 第6章：運用と今後の展開
- 実際のリリースと運用
- 得られた知見とノウハウ
- 今後の展開可能性

## 技術スタック

本書で扱う主な技術：

### フロントエンド
- **HTML/CSS/JavaScript**: 基本的なWeb技術
- **位置情報API**: Geolocation APIの活用
- **PWA技術**: オフライン対応とホーム画面追加

### 開発ツール
- **地図API**: Google Maps API / OpenStreetMap
- **モバイル最適化**: レスポンシブデザインとタッチUI
- **デバッグツール**: 実地テストでの検証方法

### 企画ツール
- **ルート設計**: 地図を使った効率的な設計
- **謎作成**: 謎解きの企画と検証
- **テスト設計**: ユーザーテストの設計と実施

## 学習効果

本書を読み終えることで、以下のスキルを習得できます：

### 技術スキル
- 位置情報を活用したWebアプリケーションの実装
- PWAの基本と実践的な活用方法
- モバイルファーストの開発手法
- 実地テストとデバッグの方法

### 企画スキル
- 体験型コンテンツの設計方法
- 街の特性を活かした企画立案
- ユーザー目線での改善サイクル
- 多言語対応コンテンツの企画

### プロジェクト管理
- 要件定義から完成までの工程管理
- フィードバックの活用と改善
- リアル空間を使ったコンテンツの運用

## こんなプロジェクトに応用できます

### 観光・地域振興
- **観光アプリ**: 街の魅力を伝える体験型ガイド
- **地域イベント**: 商店街や観光地での謎解きイベント
- **教育プログラム**: 歴史や文化を学ぶ街歩き学習

### エンターテイメント
- **謎解きイベント**: 商業施設や公園での謎解き企画
- **宝探しゲーム**: 位置情報を使った宝探し
- **AR体験**: 拡張現実を組み合わせた体験コンテンツ

### 企業活用
- **チームビルディング**: 社員研修やチーム活動
- **マーケティング**: 店舗誘導や商品PRキャンペーン
- **採用活動**: ユニークな会社説明会や選考プロセス

## プロジェクトのハイライト

### 挑戦したこと
- **多言語対応**: 日本語話者が英語で謎解きを作る挑戦
- **文化の違い**: 外国人観光客に楽しんでもらうための工夫
- **技術的実装**: GPSの精度問題やオフライン対応

### 得られた知見
- **体験設計**: リアル空間での体験をデザインする方法
- **技術的ノウハウ**: 位置情報アプリの実装のコツ
- **改善プロセス**: ユーザーフィードバックを活かした改善サイクル

## 実践的な活用例

本書では、以下のような実践的な内容を含んでいます：

### コード例
- GPS位置情報の取得と活用
- 地図APIの統合
- 進捗管理とステート管理
- オフライン対応の実装

### 設計資料
- ルート設計の考え方
- 謎解きの難易度調整
- ユーザーテストの設計書
- フィードバックシートのサンプル

### チェックリスト
- 舞台選定のチェックポイント
- 実装前の確認事項
- テスト前の準備リスト
- リリース前の最終チェック

## 購入・詳細情報

<div style="text-align: center; margin: 2rem 0;">
  <a href="https://techbookfest.org/product/bLHbQVbxKCVTv4LcDU8Rvz?productVariantID=4K1k46d5a5kfp5uTVfLLkN" target="_blank" rel="noopener noreferrer" class="purchase-button purchase-button-bottom">
    📚 技術書典で購入する
  </a>
</div>

詳細な情報については、[技術書典の製品ページ](https://techbookfest.org/product/bLHbQVbxKCVTv4LcDU8Rvz?productVariantID=4K1k46d5a5kfp5uTVfLLkN)をご確認ください。

## 関連リソース

### 位置情報技術
- [Geolocation API - MDN](https://developer.mozilla.org/ja/docs/Web/API/Geolocation_API)
- [Google Maps Platform](https://developers.google.com/maps)
- [OpenStreetMap](https://www.openstreetmap.org/)

### PWA技術
- [Progressive Web Apps - MDN](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps)
- [Service Worker API](https://developer.mozilla.org/ja/docs/Web/API/Service_Worker_API)

### 体験設計
- [User Experience Design](https://www.nngroup.com/articles/)
- [Location-Based Services](https://en.wikipedia.org/wiki/Location-based_service)

## まとめ

街歩き謎解きゲームは、技術と企画の両方が求められる、やりがいのあるプロジェクトです。本書を通して、アイデアを形にするプロセスを追体験し、あなた自身のプロジェクトに活かしてください。

現実の街を舞台にした体験型コンテンツの作成が、これまでよりもずっと身近に感じられることを約束します。

---

**技術書典19出展**
イベント会場でお会いできることを楽しみにしています！
