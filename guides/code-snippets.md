---
title: コードスニペット集
description: プログラミングでよく使うコードスニペットの集約
editLink: true
prev:
  text: 'PRH 技術書典ルール'
  link: '/tools/prh-install2'
next:
  text: 'ホーム'
  link: '/'
---

# コードスニペット集

プログラミングでよく使用するコードスニペットをまとめています。効率的な開発のために、再利用可能なコードパターンを収集・整理しています。

## JavaScript/TypeScript

### 配列操作

```javascript
// 配列の重複を除去
const uniqueArray = [...new Set(array)];

// 配列をシャッフル
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// 配列の最大値・最小値を取得
const max = Math.max(...numbers);
const min = Math.min(...numbers);
```

### Set操作

```javascript
// 2つのSetから重複要素を取得
function buildDuplicate(list1, list2) {
    let duplicateFruits = new Set();
    for (let i of list2) {
        if (list1.has(i)) {
            duplicateFruits.add(i);
        }
    }
    return duplicateFruits;
}

// 使用例
const fruits1 = new Set(['バナナ', 'ぶどう','オレンジ', 'りんご']);
const fruits2 = new Set(['メロン', 'さくらんぼ', 'バナナ', '晩柑', 'オレンジ']);

const duplicates = buildDuplicate(fruits1, fruits2);
console.log("重複：" + Array.from(duplicates).join(', '));

// より関数型的なアプローチ
const intersection = (set1, set2) => new Set([...set1].filter(x => set2.has(x)));

// Set演算の応用
const union = (set1, set2) => new Set([...set1, ...set2]); // 和集合
const difference = (set1, set2) => new Set([...set1].filter(x => !set2.has(x))); // 差集合
```

### オブジェクト操作

```javascript
// オブジェクトのディープクローン
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

// オブジェクトのマージ
const mergedObject = { ...obj1, ...obj2 };

// オブジェクトから特定のキーを除外
const { excludeKey, ...rest } = originalObject;
```

### 非同期処理

```javascript
// Promise.allの使用例
const results = await Promise.all([
  fetch('/api/data1'),
  fetch('/api/data2'),
  fetch('/api/data3')
]);

// エラーハンドリング付きの非同期関数
const fetchDataSafely = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};
```

## Python

### リスト操作

```python
# リスト内包表記
squares = [x**2 for x in range(10)]
filtered_list = [x for x in numbers if x > 0]

# リストの平坦化
flat_list = [item for sublist in nested_list for item in sublist]

# リストの分割
def chunk_list(lst, chunk_size):
    return [lst[i:i + chunk_size] for i in range(0, len(lst), chunk_size)]
```

### 辞書操作

```python
# 辞書のマージ（Python 3.9+）
merged_dict = dict1 | dict2

# 辞書の値でソート
sorted_dict = dict(sorted(my_dict.items(), key=lambda item: item[1]))

# defaultdictの使用
from collections import defaultdict
dd = defaultdict(list)
```

### ファイル操作

```python
# ファイルの読み書き
with open('file.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# JSONファイルの処理
import json
with open('data.json', 'r') as f:
    data = json.load(f)
```

## CSS

### レスポンシブデザイン

```css
/* フレックスボックス中央揃え */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* グリッドレイアウト */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

/* メディアクエリ */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}
```

### アニメーション

```css
/* フェードイン */
.fade-in {
  opacity: 0;
  animation: fadeIn 0.5s ease-in forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* ホバーエフェクト */
.button {
  transition: all 0.3s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
```

## Git コマンド

### よく使うコマンド

```bash
# ブランチ操作
git checkout -b new-feature
git branch -d feature-branch
git push origin --delete feature-branch

# コミット操作
git commit --amend -m "新しいコミットメッセージ"
git reset --soft HEAD~1
git rebase -i HEAD~3

# ログとdiff
git log --oneline --graph
git diff --cached
git show HEAD~1
```

### 設定とエイリアス

```bash
# Git設定
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 便利なエイリアス
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
```

## 使用上の注意

- コードスニペットは適切にテストしてから本番環境で使用してください
- 各言語やフレームワークのバージョンによって動作が異なる場合があります
- セキュリティ面での考慮も忘れずに行ってください

## 参考資料

- [MDN Web Docs](https://developer.mozilla.org/)
- [Python Documentation](https://docs.python.org/)
- [Git Documentation](https://git-scm.com/doc)