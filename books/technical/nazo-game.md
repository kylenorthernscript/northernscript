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

## 目次

### はじめに
- 企画の背景と目的
- 対象読者
- 本書の構成
- 読み進める際の注意点

### 第1章 依頼背景と着想
- 1.1 はじめに
- 1.2 成果物と制約
- 1.3 市場動向と差別化ポイント
- 1.4 コンセプト設計
- 1.5 想定ペルソナ（年齢層／動機／リテラシー）
- 1.6 大雑把なチェックポイントの設計
- 1.7 その他留意した点

### 第2章 オリエンテーション
- 2.1 背景ストーリー
- 2.2 謎解きの流れ
- 2.3 オープニングムービー
- 2.4 封筒探索の設計意図
- 2.5 クロスワードの設計
- 2.6 クロスワードの設問
- 2.7 舞台と関係した設問
- 2.8 答えの作り方
- 2.9 舞台と関係した設問2
- 2.10 クロスワード全体の設問
- 2.11 部屋を出るまで

### 第3章 最初のステージ：池袋西口広場
- 3.1 パズルA
- 3.2 チェックポイントの選定
- 3.3 作成のプロセス

### 第4章 移動開始：ロサ会館
- 4.1 ロケーションムービー
- 4.2 指示
- 4.3 パズルB
- 4.4 パズルC
- 4.5 ステージ2の最終問題

### 第5章 中間地点：池袋大橋
- 5.1 ロケーションムービー
- 5.2 指示
- 5.3 設問の悩み
- 5.4 パズルD
- 5.5 パズルE
- 5.6 振り返って

### 第6章 終盤戦：中池袋公園
- 6.1 ロケーションムービー
- 6.2 指示
- 6.3 設問の悩み
- 6.4 パズルF
- 6.5 パズルG
- 6.6 パズルH
- 6.7 パズルI
- 6.8 キーワードをつなぎ合わせる

### 第7章 ラストステージ：てんぼうパーク
- 7.1 ロケーションムービー
- 7.2 指示
- 7.3 設問の意図
- 7.4 パズルJ
- 7.5 パズルK
- 7.6 パズルL
- 7.7 最終問題
- 7.8 クリア後

### 第8章 ゴール：東池袋中央公園
- 8.1 最後の指示
- 8.2 エピローグ

### 第9章 モニターテスト
- 9.1 オリエンテーション
- 9.2 池袋西口公園
- 9.3 ロサ会館
- 9.4 池袋大橋
- 9.5 中池袋公園
- 9.6 サンシャイン60展望台
- 9.7 巣鴨プリズンの跡地
- 9.8 総評

### 第10章 位置情報技術の基礎
- 10.1 はじめに
- 10.2 Geolocation APIの基本
- 10.3 位置座標の取り方
- 10.4 距離計算の実装
- 10.5 方角の計算
- 10.6 座標の妥当性検証
- 10.7 成功判定の閾値設定
- 10.8 parseFloatの重要性
- 10.9 テストモードの実装
- 10.10 振り返って

### 第11章 コアモジュールの実装
- 11.1 はじめに
- 11.2 config.js: 設定の一元管理
- 11.3 geoUtils.js: 地理計算ユーティリティ
- 11.4 ui.js: UI表示ロジック
- 11.5 locationChecker.js: ビジネスロジック
- 11.6 pageInit.js: ページ初期化
- 11.7 HTMLからの呼び出し
- 11.8 モジュール間の依存関係
- 11.9 振り返って

### 第12章 ファイル構成とサイト全体像
- 12.1 ルートディレクトリの俯瞰
- 12.2 HTMLページとルーティング
- 12.3 JavaScriptモジュールの役割
- 12.4 スタイルとアセット
- 12.5 開発・配信の前提
- 12.6 構成方針と設計思想
- 12.7 今後の拡張性と運用上の考慮

### 第13章 まとめ
- 13.1 使用した端末
- 13.2 ロケーションチェックの不安定さ
- 13.3 クロスワード作成
- 13.4 場所決めの過程
- 13.5 スポットに依存する謎
- 13.6 英語での謎の作成の難しさ
- 13.7 冊子併用のメリットとデメリット
- 13.8 改善アイデア
- 13.9 採用されたか

### 終わりに
- 参考文献

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
