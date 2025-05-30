---
title: CloudFrontで始めるAWS CDN - 今さら聞けない静的サイト高速化テクニック
description: Amazon CloudFrontとS3を活用した静的サイトの高速化とセキュリティ強化の実践ガイド
editLink: true
prev: false
next: false
---

# CloudFrontで始めるAWS CDN - 今さら聞けない静的サイト高速化テクニック

<div class="book-detail-header">
  <img src="/cloudfront-aws-cover.png" alt="CloudFront AWS CDN Book Cover" class="book-detail-cover">
  <div class="book-detail-info">
    <div class="tip-box">
      <strong>のーざんすくりぷと</strong><br>
      本書は当サイト「Northern Script（のーざんすくりぷと）」シリーズとして、AWSのCDNサービスCloudFrontを活用したWebサイト高速化の実践的なガイドです。
    </div>
    <h2>書籍概要</h2>
    <p>静的サイトのパフォーマンスを最大限に引き出すための、Amazon CloudFrontとAmazon S3の活用に関する実践的な技術書です。CDNの基本概念から始まり、実際の設定手順、高度な最適化テクニックまでを体系的に解説します。</p>
    <p><strong>「今さら聞けない」</strong>というタイトルが示すように、CDNの必要性は理解しているものの、実際の導入に踏み切れないでいる開発者やインフラエンジニアのための実践的な指南書です。</p>
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
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.book-detail-info {
  flex: 1;
}

.book-detail-info h2 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.tip-box {
  background: var(--vp-c-tip-bg);
  border: 1px solid var(--vp-c-tip-border);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  color: var(--vp-c-tip-text);
}

@media (max-width: 768px) {
  .book-detail-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .book-detail-cover {
    width: 100px;
  }
}
</style>

## CDNの基本と必要性

### CDN（Content Delivery Network）とは

#### CDNの仕組み
```
[ユーザー] → [エッジサーバー] → [オリジンサーバー]
     ↑              ↓
   高速レスポンス   キャッシュ取得
```

CDNは世界中に分散配置されたエッジサーバーを通じて、ユーザーに最も近い場所からコンテンツを配信するサービスです。

#### CDN導入の効果

##### パフォーマンス向上
- **レスポンス時間短縮**: 物理的距離による遅延の削減
- **帯域幅最適化**: オリジンサーバーの負荷軽減
- **同時接続数向上**: 大量アクセス時の安定性確保

##### コスト削減
- **データ転送料削減**: S3からの直接配信コスト削減
- **サーバー負荷軽減**: オリジンサーバーのスペック要件緩和
- **運用コスト削減**: 自動スケーリングによる運用負荷軽減

## Amazon CloudFrontの特徴

### CloudFrontの優位性

#### グローバルネットワーク
```javascript
const cloudFrontEdgeLocations = {
  totalLocations: 400,  // 以上のエッジロケーション
  countries: 90,        // 以上の国・地域
  regions: {
    northAmerica: 180,
    europe: 120,
    asia: 80,
    southAmerica: 15,
    oceania: 5
  }
};
```

#### AWSエコシステムとの統合
- **S3**: 静的ファイルの配信
- **Lambda@Edge**: エッジでの動的処理
- **Certificate Manager**: SSL証明書の自動管理
- **Route 53**: DNS連携
- **CloudWatch**: 監視・ログ分析

### CloudFrontの主要機能

#### キャッシュ機能
```javascript
const cacheSettings = {
  defaultTTL: 86400,      // 24時間
  maxTTL: 31536000,       // 1年
  behaviors: [
    {
      pathPattern: "*.html",
      cachingDisabled: true,
      ttl: 0
    },
    {
      pathPattern: "*.css",
      ttl: 2592000,         // 30日
      compress: true
    },
    {
      pathPattern: "*.js",
      ttl: 2592000,         // 30日
      compress: true
    },
    {
      pathPattern: "*.jpg",
      ttl: 31536000,        // 1年
      compress: false
    }
  ]
};
```

#### セキュリティ機能
- **AWS WAF統合**: Webアプリケーションファイアウォール
- **DDoS保護**: AWS Shieldによる自動保護
- **アクセス制御**: 地理的制限、IP制限
- **HTTPS強制**: SSL/TLS暗号化の強制

## S3バケットの準備

### 静的ウェブサイトホスティングの設定

#### S3バケット作成
```bash
# AWS CLI を使用したバケット作成
aws s3 mb s3://my-static-website-bucket-unique-name

# バケットポリシーの設定
aws s3api put-bucket-policy \
  --bucket my-static-website-bucket-unique-name \
  --policy file://bucket-policy.json
```

#### バケットポリシーの設定
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-static-website-bucket-unique-name/*"
    }
  ]
}
```

#### 静的ウェブサイト設定
```bash
# 静的ウェブサイトホスティングの有効化
aws s3 website s3://my-static-website-bucket-unique-name \
  --index-document index.html \
  --error-document error.html
```

### ファイル構造の最適化

#### 推奨ディレクトリ構造
```
s3://my-bucket/
├── index.html
├── error.html
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   └── vendor.css
│   ├── js/
│   │   ├── app.js
│   │   └── vendor.js
│   ├── images/
│   │   ├── hero.jpg
│   │   ├── thumbnails/
│   │   └── icons/
│   └── fonts/
├── pages/
│   ├── about.html
│   └── contact.html
└── api/
    └── data.json
```

#### ファイル最適化
```javascript
const fileOptimization = {
  images: {
    formats: ["WebP", "AVIF", "JPEG"],
    compression: "85% quality",
    responsiveImages: "multiple sizes",
    lazyLoading: "intersection observer"
  },
  css: {
    minification: "remove whitespace",
    critical: "inline critical CSS",
    nonCritical: "load asynchronously"
  },
  javascript: {
    minification: "terser optimization",
    bundling: "webpack code splitting",
    treeshaking: "remove unused code"
  }
};
```

## CloudFrontディストリビューションの作成

### 基本設定

#### ディストリビューション作成
```json
{
  "CallerReference": "my-static-site-2024",
  "Comment": "Static website distribution",
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-my-static-website-bucket",
        "DomainName": "my-static-website-bucket-unique-name.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-my-static-website-bucket",
    "ViewerProtocolPolicy": "redirect-to-https",
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    },
    "MinTTL": 0,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000
  }
}
```

### Origin Access Identity（OAI）の設定

#### セキュアな配信設定
```bash
# OAI作成
aws cloudfront create-origin-access-identity \
  --origin-access-identity-config CallerReference=OAI-2024,Comment="OAI for static site"

# S3バケットポリシー更新（OAI専用）
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity EXAMPLE123"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-static-website-bucket-unique-name/*"
    }
  ]
}
```

### カスタムドメインの設定

#### SSL証明書の取得
```bash
# Certificate Manager での証明書リクエスト
aws acm request-certificate \
  --domain-name example.com \
  --subject-alternative-names www.example.com \
  --validation-method DNS \
  --region us-east-1  # CloudFront用は必ずus-east-1
```

#### CNAME設定
```json
{
  "Aliases": {
    "Quantity": 2,
    "Items": ["example.com", "www.example.com"]
  },
  "ViewerCertificate": {
    "ACMCertificateArn": "arn:aws:acm:us-east-1:123456789012:certificate/12345678-1234-1234-1234-123456789012",
    "SSLSupportMethod": "sni-only",
    "MinimumProtocolVersion": "TLSv1.2_2021"
  }
}
```

## 高度な設定と最適化

### Cache Behaviors の最適化

#### ファイルタイプ別キャッシュ戦略
```javascript
const cacheBehaviors = [
  {
    pathPattern: "*.html",
    description: "HTMLファイル - 短期キャッシュ",
    cachePolicyId: "custom-html-policy",
    settings: {
      defaultTTL: 300,        // 5分
      maxTTL: 3600,           // 1時間
      compression: true,
      viewerProtocolPolicy: "redirect-to-https"
    }
  },
  {
    pathPattern: "/api/*",
    description: "APIレスポンス - キャッシュ無効",
    cachePolicyId: "CachingDisabled",
    settings: {
      defaultTTL: 0,
      maxTTL: 0,
      compression: false
    }
  },
  {
    pathPattern: "/assets/css/*",
    description: "CSSファイル - 長期キャッシュ",
    cachePolicyId: "custom-static-policy",
    settings: {
      defaultTTL: 2592000,    // 30日
      maxTTL: 31536000,       // 1年
      compression: true
    }
  },
  {
    pathPattern: "/assets/js/*",
    description: "JavaScriptファイル - 長期キャッシュ",
    cachePolicyId: "custom-static-policy",
    settings: {
      defaultTTL: 2592000,    // 30日
      maxTTL: 31536000,       // 1年
      compression: true
    }
  },
  {
    pathPattern: "/assets/images/*",
    description: "画像ファイル - 超長期キャッシュ",
    cachePolicyId: "custom-image-policy",
    settings: {
      defaultTTL: 31536000,   // 1年
      maxTTL: 31536000,       // 1年
      compression: false      // 画像は事前最適化済み
    }
  }
];
```

### Lambda@Edge による動的処理

#### A/Bテストの実装
```javascript
// Lambda@Edge function for A/B testing
exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;
  
  // A/Bテストのセグメント決定
  const testSegment = determineTestSegment(headers);
  
  if (testSegment === 'B' && request.uri === '/') {
    request.uri = '/index-variant-b.html';
  }
  
  callback(null, request);
};

function determineTestSegment(headers) {
  const userAgent = headers['user-agent'][0].value;
  const hash = hashCode(userAgent);
  return (hash % 100) < 50 ? 'A' : 'B';
}
```

#### セキュリティヘッダーの追加
```javascript
// セキュリティヘッダー追加のLambda@Edge
exports.handler = (event, context, callback) => {
  const response = event.Records[0].cf.response;
  const headers = response.headers;
  
  headers['strict-transport-security'] = [{
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  }];
  
  headers['content-security-policy'] = [{
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
  }];
  
  headers['x-frame-options'] = [{
    key: 'X-Frame-Options',
    value: 'DENY'
  }];
  
  headers['x-content-type-options'] = [{
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }];
  
  callback(null, response);
};
```

### パフォーマンス最適化技術

#### HTTP/2 Server Push の活用
```javascript
// Server Push用のLambda@Edge
exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const response = event.Records[0].cf.response;
  
  if (request.uri === '/' || request.uri === '/index.html') {
    response.headers['link'] = [{
      key: 'Link',
      value: '</assets/css/main.css>; rel=preload; as=style, </assets/js/app.js>; rel=preload; as=script'
    }];
  }
  
  callback(null, response);
};
```

#### 画像の動的最適化
```javascript
// 画像最適化のLambda@Edge
exports.handler = async (event, context) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;
  
  // WebP対応ブラウザの判定
  const acceptHeader = headers.accept && headers.accept[0].value;
  const supportsWebP = acceptHeader && acceptHeader.includes('image/webp');
  
  // 画像リクエストの場合
  if (request.uri.match(/\.(jpg|jpeg|png)$/i)) {
    if (supportsWebP) {
      request.uri = request.uri.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
  }
  
  return request;
};
```

## 監視とパフォーマンス分析

### CloudWatch メトリクス

#### 重要な監視指標
```javascript
const monitoringMetrics = {
  performance: [
    'OriginLatency',        // オリジンサーバーのレスポンス時間
    'CacheHitRate',         // キャッシュヒット率
    'BytesDownloaded',      // ダウンロードデータ量
    'Requests'              // リクエスト数
  ],
  errors: [
    'ErrorRate',            // エラー率
    '4xxErrorRate',         // クライアントエラー率
    '5xxErrorRate'          // サーバーエラー率
  ],
  security: [
    'WAFBlockedRequests',   // WAFによるブロック数
    'AttackAttempts'        // 攻撃試行数
  ]
};
```

#### アラート設定
```json
{
  "AlarmName": "CloudFront-HighErrorRate",
  "ComparisonOperator": "GreaterThanThreshold",
  "EvaluationPeriods": 2,
  "MetricName": "ErrorRate",
  "Namespace": "AWS/CloudFront",
  "Period": 300,
  "Statistic": "Average",
  "Threshold": 5.0,
  "ActionsEnabled": true,
  "AlarmActions": [
    "arn:aws:sns:us-east-1:123456789012:cloudfront-alerts"
  ]
}
```

### Real User Monitoring（RUM）

#### Web Vitals の測定
```javascript
// Core Web Vitals の測定
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);
  
  // Beacon APIで送信
  if ('sendBeacon' in navigator) {
    navigator.sendBeacon('/analytics', body);
  } else {
    fetch('/analytics', { body, method: 'POST', keepalive: true });
  }
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### パフォーマンステスト

#### 自動化されたパフォーマンステスト
```javascript
// Lighthouse CI設定
const lighthouseConfig = {
  ci: {
    collect: {
      url: ['https://example.com', 'https://example.com/about'],
      settings: {
        chromeFlags: '--no-sandbox'
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }]
      }
    },
    upload: {
      target: 'lhci',
      serverBaseUrl: 'https://lighthouse-ci.example.com'
    }
  }
};
```

## コスト最適化

### 価格体系の理解

#### CloudFront 料金構造
```javascript
const pricingStructure = {
  dataTransfer: {
    firstTB: 0.085,      // USD per GB
    next9TB: 0.080,
    next40TB: 0.060,
    next100TB: 0.040,
    over150TB: 0.030
  },
  requests: {
    http: 0.0075,        // USD per 10,000 requests
    https: 0.0100
  },
  priceClasses: {
    all: "全エッジロケーション",
    100: "北米・欧州のみ",
    200: "北米・欧州・アジア・中東・アフリカ"
  }
};
```

#### コスト最適化戦略
```javascript
const costOptimization = {
  caching: {
    strategy: "適切なTTL設定でオリジンアクセス削減",
    impact: "データ転送料とS3料金の削減"
  },
  compression: {
    strategy: "Gzip/Brotli圧縮の有効化",
    impact: "転送データ量の30-70%削減"
  },
  priceClass: {
    strategy: "必要な地域のみの配信設定",
    impact: "不要なエッジロケーション料金の削減"
  },
  monitoring: {
    strategy: "定期的な使用量とコストの監視",
    impact: "予期しない料金増加の早期発見"
  }
};
```

### 効果測定とROI

#### パフォーマンス改善指標
```javascript
const performanceImprovements = {
  beforeCDN: {
    ttfb: "1200ms",           // Time to First Byte
    lcp: "3500ms",            // Largest Contentful Paint
    cls: "0.15",              // Cumulative Layout Shift
    fid: "150ms",             // First Input Delay
    serverLoad: "80%"         // サーバー負荷
  },
  afterCDN: {
    ttfb: "300ms",            // 75%改善
    lcp: "1200ms",            // 66%改善
    cls: "0.05",              // 67%改善
    fid: "50ms",              // 67%改善
    serverLoad: "25%"         // 69%改善
  },
  businessImpact: {
    conversionRate: "+15%",    // コンバージョン率向上
    bounceRate: "-25%",        // 直帰率改善
    userSatisfaction: "+30%",  // ユーザー満足度向上
    seoRanking: "+20%"         // SEOランキング向上
  }
};
```

## トラブルシューティング

### よくある問題と解決法

#### キャッシュされないコンテンツ
```javascript
const cacheIssues = {
  problem: "HTMLファイルがキャッシュされない",
  causes: [
    "Cache-Control: no-cache ヘッダー",
    "動的コンテンツの誤認識",
    "不適切なキャッシュビヘイビア設定"
  ],
  solutions: [
    "S3のメタデータ設定を確認",
    "CloudFrontのキャッシュポリシー見直し",
    "オリジンレスポンスヘッダーの調整"
  ]
};
```

#### SSL証明書の問題
```javascript
const sslIssues = {
  problem: "カスタムドメインでSSLエラー",
  solutions: [
    "Certificate Managerの証明書がus-east-1リージョンにあることを確認",
    "ドメイン検証の完了確認",
    "CloudFrontでの証明書選択確認",
    "DNS設定の確認"
  ]
};
```

#### パフォーマンス問題
```javascript
const performanceIssues = {
  slowLoading: {
    diagnostics: [
      "CloudWatch メトリクスでOriginLatency確認",
      "キャッシュヒット率の確認",
      "ネットワークタブでの詳細分析"
    ],
    solutions: [
      "キャッシュ設定の最適化",
      "ファイル圧縮の有効化",
      "Lambda@Edgeでの最適化"
    ]
  }
};
```

## 対象読者と前提知識

### 主要なターゲット

#### AWSエンジニア
- **経験レベル**: AWS基本サービス（S3、EC2）の利用経験
- **課題**: CDNの導入を検討しているが、設定方法がわからない
- **目標**: CloudFrontを使った高パフォーマンスサイト構築

#### フロントエンドエンジニア
- **経験レベル**: Webサイト開発・運用経験
- **課題**: サイトの表示速度改善が必要
- **目標**: 技術的な最適化手法の習得

#### インフラエンジニア
- **経験レベル**: サーバー管理・運用経験
- **課題**: 既存インフラの負荷軽減
- **目標**: CDNを活用したアーキテクチャ設計

### 前提知識

#### 必須スキル
- AWS基本サービスの理解
- HTML/CSS/JavaScriptの基礎知識
- コマンドライン操作
- JSON形式の理解

#### 推奨スキル
- AWS CLI の操作経験
- Webパフォーマンス最適化の基礎知識
- DNS設定の理解
- SSL/TLS証明書の基本概念

## 購入・詳細情報

詳細な情報や購入については、[技術書典の製品ページ](https://techbookfest.org/product/4gJR43YHbADpVQCM9KMgF8)をご確認ください。

## 関連リソース

### AWS公式ドキュメント
- [Amazon CloudFront Developer Guide](https://docs.aws.amazon.com/cloudfront/)
- [Amazon S3 User Guide](https://docs.aws.amazon.com/s3/)
- [AWS Lambda@Edge Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html)

### パフォーマンス最適化
- [Web Vitals](https://web.dev/vitals/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

### 監視・分析ツール
- [AWS CloudWatch](https://aws.amazon.com/cloudwatch/)
- [AWS X-Ray](https://aws.amazon.com/xray/)
- [Real User Monitoring](https://aws.amazon.com/cloudwatch/features/rum/)

## まとめ

CloudFrontを活用した静的サイトの高速化は、現代のWeb開発において必須のスキルです。本書で紹介した技術とベストプラクティスを活用することで、以下の成果を実現できます：

### 技術的成果
- **パフォーマンス向上**: 50-80%のロード時間短縮
- **可用性向上**: 99.99%以上のアップタイム
- **セキュリティ強化**: DDoS保護とSSL/TLS暗号化
- **スケーラビリティ**: 自動スケーリングによる安定性

### ビジネス成果
- **ユーザー体験向上**: 高速なページロード
- **SEO改善**: 検索エンジンランキング向上
- **コンバージョン率向上**: 離脱率の削減
- **運用コスト削減**: インフラ負荷の軽減

「今さら聞けない」CDNの導入も、適切な知識と手順に従えば決して難しいものではありません。本書を参考に、あなたのWebサイトも次世代のパフォーマンスを実現してください。