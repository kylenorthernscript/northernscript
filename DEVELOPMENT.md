# 開発ワークフロー

## Claude Code Action使用時の注意点

### ローカル開発とClaude Code Actionの使い分け

#### 1. Claude Code Actionを使う場合
- **大きな機能追加**: 新しいページやコンポーネントの作成
- **設定変更**: VitePress設定、パフォーマンス最適化
- **バグ修正**: GitHub Issue経由での修正依頼
- **コードレビュー**: Pull Request での改善提案

#### 2. ローカル開発を使う場合  
- **日常的な編集**: 記事の更新、小さな修正
- **実験的な変更**: 試行錯誤が必要な作業
- **複数ファイルの同時編集**: 関連する複数ファイルの一括変更

### 同期手順

#### Claude Code Action使用後
```bash
# 1. リモートの変更を取得
git pull origin main

# 2. 変更内容を確認
git log --oneline -5

# 3. 必要に応じてローカルで追加修正
# （編集作業）

# 4. 追加変更をコミット・プッシュ
git add .
git commit -m "Claude Code Actionによる変更の調整"
git push origin main
```

#### ローカル作業後
```bash
# 1. 通常通りコミット・プッシュ
git add .
git commit -m "ローカルでの変更"
git push origin main

# 2. 必要に応じてGitHubで @claude に相談
# Issue作成: "@claude この変更について改善点はありますか？"
```

### 衝突回避のコツ

1. **作業前の同期**: 作業開始前に必ず `git pull`
2. **小さなコミット**: 頻繁にコミット・プッシュして差分を小さく保つ
3. **Claude との連携**: 大きな変更前にClaude に相談
4. **ブランチ運用**: 大きな機能追加時はfeatureブランチを使用

### トラブルシューティング

#### 衝突が発生した場合
```bash
# 1. 現在の変更を一時保存
git stash

# 2. リモートの変更を取得
git pull origin main

# 3. 保存した変更を復元
git stash pop

# 4. 衝突を手動解決
# （エディタで conflict markers を解決）

# 5. 解決後にコミット
git add .
git commit -m "Merge conflict resolution"
git push origin main
```

#### 複雑な衝突の場合
- GitHub Issue で `@claude 衝突の解決方法を教えてください` と相談
- Claude が適切な解決方法を提案してくれます

## Claude Code Actionの効果的な使い方

### 良い依頼例
```markdown
@claude VitePressサイトのCore Web Vitalsスコアを改善してください。
特に以下を重視：
- 画像の最適化（WebP対応）
- CSS/JSの最小化
- キャッシュ設定の最適化
```

### 避けるべき依頼
```markdown
@claude サイトを良くして
（具体性がなく、意図が不明確）
```

## まとめ

Claude Code ActionとローカルClaude Codeは補完関係にあります：
- **GitHub**: 大きな設計変更、システム改善、コードレビュー
- **ローカル**: 日常的な編集、実験、細かい調整

適切に使い分けることで、効率的な開発が可能になります。