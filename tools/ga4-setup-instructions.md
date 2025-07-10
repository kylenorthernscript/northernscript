# Google Analytics 4 設定手順

Northern ScriptサイトにGoogle Analytics 4を設定するための手順です。

## 1. Google Analytics 4 プロパティの作成

1. [Google Analytics](https://analytics.google.com) にアクセス
2. Googleアカウントでログイン
3. 「測定を開始」をクリック
4. アカウント名: `Northern Script` を入力
5. プロパティ名: `Northern Script Blog` を入力
6. レポートのタイムゾーン: `日本` を選択
7. 通貨: `日本円（JPY）` を選択
8. 「次へ」をクリック

## 2. ウェブストリームの設定

1. プラットフォーム: `ウェブ` を選択
2. ウェブサイトのURL: `https://blogs.northernscript.jp`
3. ストリーム名: `Northern Script Website`
4. 「ストリームを作成」をクリック

## 3. 測定IDの取得

1. 作成されたウェブストリーム詳細ページで **測定ID** をコピー
   - 形式: `G-XXXXXXXXXX` (Gから始まる10文字のID)

## 4. VitePress設定ファイルの更新

`.vitepress/config.mts` ファイルの以下の箇所を更新:

```typescript
// 現在の設定（プレースホルダー）
['script', { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX' }],
['script', {}, `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    anonymize_ip: true,
    cookie_flags: 'max-age=7200;secure;samesite=strict'
  });
`],

// ↓ 実際の測定IDに置き換え
['script', { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-[実際の測定ID]' }],
['script', {}, `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-[実際の測定ID]', {
    anonymize_ip: true,
    cookie_flags: 'max-age=7200;secure;samesite=strict'
  });
`],
```

## 5. プライバシー設定の確認

すでに作成済みの `privacy-policy.md` ページが以下をカバーしています:
- Google Analytics使用の明記
- データ収集内容の説明
- Cookie使用の説明
- オプトアウト方法の提供

## 6. デプロイと確認

1. 設定ファイル更新後、サイトをビルド・デプロイ
2. Google Analytics管理画面で「リアルタイム」レポートを確認
3. 自分のサイトにアクセスして、アクセス数がカウントされることを確認

## 7. 追加設定（オプション）

### カスタムイベントの設定
技術書の購入ボタンクリックを追跡する場合:

```javascript
// 技術書典ボタンクリック追跡
gtag('event', 'techbook_click', {
  'event_category': 'purchase',
  'event_label': '技術書典',
  'book_title': 'VitePress入門'
});

// Amazon購入ボタンクリック追跡
gtag('event', 'amazon_click', {
  'event_category': 'purchase', 
  'event_label': 'Amazon',
  'book_title': 'Storyblok入門'
});
```

### コンバージョン目標の設定
1. Google Analytics管理画面で「イベント」→「コンバージョンとしてマーク」
2. 重要な指標: `techbook_click`, `amazon_click` をコンバージョンイベントに設定

## 注意事項

- 測定IDは機密情報ではありませんが、公開リポジトリにコミットする際は注意
- プライバシーポリシーページへのリンクをサイトに追加することを推奨
- GDPR準拠のため、IPアドレス匿名化（anonymize_ip）は有効にしています
- Cookieの有効期限を2時間（7200秒）に制限してプライバシーを保護

## 完了後の効果

Google Analytics 4を設定することで以下が可能になります:

- **ページビュー分析**: どのページが最も読まれているか
- **ユーザー行動**: 滞在時間、直帰率の把握
- **購入ボタン効果測定**: 技術書典とAmazonのクリック率比較
- **デバイス分析**: モバイル/デスクトップの利用状況
- **地域分析**: どの地域からのアクセスが多いか
- **リアルタイム監視**: サイトの現在のアクセス状況

これらのデータを基に、コンテンツやサイト構造の改善を継続的に行えます。