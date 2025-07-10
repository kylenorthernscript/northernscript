---
title: PRHのVS Codeへのインストール
editLink: true
prev:
  text: 'バックエンドエンジニアによる初めてのJamstack（商業出版版）'
  link: '/books/technical/jamstack-backend-engineer'
next:
  text: 'PRH 技術書典ルール'
  link: '/tools/prh-install2'
---
# PRHのVS Codeへのインストール


## VS Code拡張機能のインストール

ここからダウンロード  
https://marketplace.visualstudio.com/items?itemName=vvakame.vscode-prh-extention

![拡張機能のインストール](./assets/prh-install/01.png)

## 設定ファイルでprh.ymlの指定

1. `Ctrl + Shift + P` で設定画面を出す
2. **Preferences: Open Workspace Settings (JSON)** と入力、または選択する。
   ![Workspaceの設定](./assets/prh-install/02.png)

3. settings.jsonを編集する画面になるので、以下のように入力する。

```json
{
    "prh.configFiles": [
        "＜プロジェクトのルートディレクトリ＞/prh.yml"
    ]
}
```

::: info
プロジェクトのルートディレクトリは適時ご自身の環境に合わせて設定してください。

例）C:/Users/ユーザー名/OneDrive/Documents/プロジェクトディレクトリ
:::


## Nodeのインストール

 - prh 関連ツールがNode.js上で動作するため、インストールを推奨します。トラブルシューティングにも役立ちます。
 - Node.js公式サイトからLTS版をインストールしてください。npmはNode.jsに同梱されています。
 - インストール後、ターミナル（コマンドプロンプトやPowerShellなど）で node -v と npm -v を実行し、バージョンが表示されることを確認してください。インストールされていれば以下のように表示されるはずです。

```bash
node -v
v18.17.1
```
```bash
npm -v
9.6.7
```

## prh と prh-languageserverのインストール

これらのパッケージがインストールされていない場合、ターミナルで以下のコマンドを実行してグローバルにインストールしてみてください。

```bash
npm install -g prh prh-languageserver
```


## prh.yml設定ファイルの準備
prh は、チェックのルールを定義する prh.yml という設定ファイルを参照します。このファイルをプロジェクトのルートディレクトリ（または適切な場所）に作成する必要があります。

prh.yml の例:
```yaml
version: 1
rules:
- expected: JavaScript # 表記を「JavaScript」に統一する
  pattern: javascript
  tags: [noun]
- expected: TypeScript
  pattern: typescript
  tags: [noun]
- expected: Node.js
  pattern: node.js
  tags: [noun]
# よくあるタイポの修正例
- expected: こんにちは
  pattern: こんにちわ
# 全角と半角スペースの混在をチェックする例（正規表現を使用）
- expected: "$1 $2" # 半角スペースに統一
  pattern: "/([a-zA-Z0-9])　([a-zA-Z0-9])/" # 全角スペースを挟む英数字
  replace: "$1 $2"
```

### prh.yml の作成場所について:

- 通常は、チェックしたいプロジェクトのルートディレクトリに prh.yml を置きます。
- 設定ファイルの場所は、VSCodeののsettings.jsonでprh.prhEngine.configPathで先ほど指定した場所と一致する必要があります。

## テスト用のMarkdownファイルの作成
test01.mdというファイルを作成してテストしてみましょう。
```markdown:test01.md
# テストドキュメント

これは vscode-prh-extension をテストするためのドキュメントです。

## 技術スタック

私たちのプロジェクトでは以下の技術を使用しています。

-   フロントエンド: typescript と react
-   バックエンド: node.js
-   データベース: PostgreSQL

javascript は素晴らしい言語ですが、typescript も型システムがあり安全です。

## 挨拶

こんにちわ、世界！

## スペースのチェック

この文には　スペースに関する問題があります。 example　text です。
english　words の間に全角スペースがあります。
```
これでうまく設定出来ていれば、PRHが作動するはずです。VS Codeを再起動するか、開発者：ウィンドウの再読み込みが必要です。

::: info
このサンプルファイルに含まれる、prh.yml のルールで指摘される可能性のある箇所:

- typescript (2箇所) → TypeScript に修正提案
- node.js → Node.js に修正提案
- javascript → JavaScript に修正提案
- こんにちわ → こんにちは に修正提案
- この文には　スペースに関する問題があります。 (「は」と「ス」の間の全角スペース) → 半角スペースに修正提案 (もし正規表現ルールが意図通り機能すれば)
- example　text (「example」と「text」の間の全角スペース) → 半角スペースに修正提案
- english　words (「english」と「words」の間の全角スペース) → 半角スペースに修正提案

するとこのように検証に引っかかる場所が**波線でハイライト**されます。

![拡張機能のインストール](./assets/prh-install/03.png)

:::

## prh.ymlの基本的なファイル構造


主要なキーとその役割は以下の通りです。
```markdown
# prhのルールファイルのバージョン (現在は主に1)
version: 1

# メタ情報 (任意)
meta:
  title: "My Custom Rules"
  author: "Your Name"
  # ... その他自由に記述可能

# 他のルールファイルをインポート (任意)
imports:
  - path/to/another_rules.yml
  - ./shared/common_typos.yml

# 特定のファイル群に対する設定 (任意)
targets:
  - file: /\.md$/ # .md ファイルにのみ適用
    rules:
      # このターゲット専用のルール
      - expected: "Markdown Specific"
        pattern: "md specific"
    excludes:
      # このターゲット内でチェック対象外とするパターン
      - pattern: /```[^]*?```/m # コードブロックを除外

# グローバルなルール定義 (必須、またはimportsで提供)
rules:
  # ここに具体的なルールを記述
  - expected: "期待する文字列"
    pattern: "検出するパターン"
  # ...
```

### version (必須)

  ルールファイルのフォーマットバージョンを指定します。通常は 1 です。
```yaml
version: 1
```

### meta (任意)

ルールファイル自体に関するメタデータを記述します。内容は自由で、ルール管理に役立ちます。

```yaml
meta:
  title: "技術文書向け表記統一ルール"
  description: "〇〇プロジェクトで使用する表記ルールセットです。"
  version: "1.2.0"
  updated_at: "2025-05-23"
  reviewer:
    - "山田太郎"
    - "佐藤花子"
```

### imports (任意)
  他の prh.yml ファイルを読み込み、そのルールセットを取り込むことができます。これにより、ルールのモジュール化や共通化が可能です。
```yaml
imports:
  # プロジェクトルートからの相対パスや絶対パスで指定
  - ./rules/base_japanese_rules.yml
  - ./rules/project_specific_terms.yml
```

### targets (任意)

特定のファイル（ファイル名や拡張子でフィルタリング）に対してのみ適用するルールや除外設定を定義できます。
```yaml
targets:
  - file: /\.md$/ # 正規表現で .md ファイルを指定
    ext: .md      # 拡張子で指定 (file と ext はどちらか一方で良いことが多い)
    rules:
      # .md ファイル内でのみ適用したいルール
      - expected: "セクション"
        pattern: "せくしょん"
    excludes:
      # .md ファイル内でチェック対象外とするパターン
      # (markdown.yml の内容で解説したものがここに入るイメージ)
      - pattern: /\[[^\]]*\]\([^)]+\)/ # リンクを除外
      - pattern: /```[^]*?```/m       # コードブロックを除外
      - pattern: /`.*?`/              # インラインコードを除外
  - file: /_spec\.js$/ # _spec.js で終わるファイル用
    rules:
      # テストファイル用の特殊なルールなど
      - expected: "テストケース"
        pattern: "てすとけーす"
```
- excludes: 指定したパターンに一致する箇所は、他の全てのルール（imports されたものやグローバルな rules も含む）のチェック対象外となります。

### rules (必須、またはimportsで提供)

表記揺れをチェックし修正するための具体的なルールを配列（リスト）で定義します。各ルールは以下のキーを持ちます。

- expected (必須):

修正後の期待される文字列。pattern で正規表現のキャプチャグループ（例: $1, $2）を使用した場合、それらを埋め込むことができます。
```yaml
rules:
  - expected: "正しい株式会社表記" # 単純な文字列
    pattern: "（株）"
  - expected: "$1年$2月$3日"      # キャプチャグループを使用
    pattern: /(\d+)／(\d+)／(\d+)/
```

- pattern (必須):

検出したい文字列のパターン。単純な文字列、またはスラッシュ / で囲んだ正規表現で記述します。

正規表現はJavaScriptのエンジン（new RegExp()）で解釈されます。

正規表現のフラグ（例: i で大文字・小文字を区別しない、g でグローバルマッチ）も指定できます。g フラグは prh が内部で処理するため、通常は不要か、意図しない動作になることがあります。i や m (マルチライン) は有用です。
```yaml
rules:
  - expected: "サーバー"
    pattern: "サーバ" # 単純な文字列
  - expected: "サーバー"
    pattern: "/サーバ/i" # 正規表現 (大文字・小文字無視)
  - expected: "ItemA, ItemB"
    pattern: "/ItemA、ItemB/" # 「、」を「, 」に
```

- prh (任意):
  VSCodeなどで修正候補として表示される際のカスタムメッセージ。ルールがなぜ必要なのか、どのような意図があるのかを記述すると分かりやすくなります。
```yaml
rules:
  - expected: "理由"
    pattern: "わけ"
    prh: "公的な文書では「わけ」ではなく「理由」を使用します。"
```

- specs (任意):
  そのルールが正しく動作するかをテストするための定義。from (修正前) と to (修正後の期待値) のペアをリストで記述します。

  prh test コマンドでこれらのテストを実行できます。ルール作成時には非常に重要です。
```yaml
rules:
  - expected: "影響"
    pattern: "影響を与える"
    specs:
      - from: "パフォーマンスに影響を与える可能性があります。"
        to:   "パフォーマンスに影響可能性があります。" # "与える" を削除する意図の例 (やや不自然な例ですが)
      - from: "影響を与えない" # これはマッチしないはず
        to:   "影響を与えない"
```

- tags (任意):

ルールにタグを付けることができます。ルールの分類や管理に利用できますが、prh の動作自体に直接影響を与えることは少ないです。
```yaml
rules:
  - expected: "ウェブサイト"
    pattern: "ホームページ"
    tags: ["表記統一", "IT用語"]
```

- regexpMustEmpty (任意):

pattern の正規表現で指定したキャプチャグループが空文字の場合にのみ、ルールを適用します。

グループ番号は $1, $2 ... のように指定します。

```yaml
rules:
  # "更に" は "さらに" にするが、"変更" はそのまま
  - expected: "さらに"
    pattern: "/(変)?更に/" # $1 は "変" または空
    regexpMustEmpty: "$1"
    specs:
      - from: "更に調査を進める。"
        to:   "さらに調査を進める。"
      - from: "内容を変更する。" # $1 が "変" なのでマッチしない
        to:   "内容を変更する。"
```

- regexpMustNotEmpty (任意):

pattern の正規表現で指定したキャプチャグループが空文字でない場合にのみ、ルールを適用します。

```yaml
rules:
  # "AとB" は "A and B" にするが、"と" 単体はそのまま
  - expected: "$1 and $2"
    pattern: "/([a-zA-Z]+)と([a-zA-Z]+)/" # $1, $2 が英単語
    regexpMustNotEmpty: ["$1", "$2"] # $1 も $2 も空でないことを期待
    specs:
      - from: "AppleとGoogle"
        to:   "Apple and Google"
      - from: "ペンとノート" # これは日本語なのでマッチしない (パターンが英字指定のため)
        to:   "ペンとノート"
```

- raw (任意):

true に設定すると、expected の中の $1 や \n といった特殊なシーケンスがそのまま文字列として扱われ、キャプチャグループの展開やエスケープシーケンスの解釈が行われなくなります。

```yaml
rules:
  - expected: "Install $1 command"
    pattern: "/install (.+?) command/"
    raw: true # $1 は "$1" という文字列として扱われる
    specs:
      - from: "install my-app command"
        to:   "Install $1 command" # "Install my-app command" ではない
```
- disabled (任意):

true に設定すると、そのルールは一時的に無効化されます。ルールを削除せずに動作を止めたい場合に便利です。

```yaml
rules:
  - expected: "古い表現"
    pattern: "すごく古い表現"
    disabled: true # このルールは現在適用されない
```

::: tip YAMLの基本的な注意点

- インデント: YAMLはインデント（通常は半角スペース2つ）で階層構造を表現します。インデントが崩れると正しく解釈されません。
- ハイフン (-): リスト（配列）の要素を示します。rules や imports の各項目はハイフンで始めます。
- コロン (:): キーと値のペアを示します（例: expected: "文字列"）。
- 文字列のクォート: 通常、文字列をクォート（" や '）で囲む必要はありませんが、特殊文字（: や # など）を文字列の先頭で使いたい場合や、意図を明確にしたい場合はクォートします。
:::

::: tip 良いルールを書くためのヒント
- 小さく始める: 最初から完璧なルールセットを目指さず、よく出会う表記揺れや簡単なものから追加していくと良いでしょう。
- specs を書く: ルールを追加・修正したら必ず specs でテストケースを記述し、prh test コマンド（もし prh のCLIツールを使っていれば）やVSCode上での動作確認を行いましょう。意図しない置換を防ぐために非常に重要です。
- 正規表現は慎重に: 強力ですが、複雑な正規表現は意図しないマッチを生む可能性があります。オンラインの正規表現テスターなどで十分にテストしましょう。
- 既存のルールセットを参考にする: prh/rules リポジトリ (GitHub) には多くの実用的なルールセットがあります。これらを参考にしたり、imports して活用したりすると効率的です。
- コメントを活用する: ルールの意図や複雑な正規表現の解説などをコメント (#) で残しておくと、後から見返したときや他の人と共有するときに役立ちます。
:::
### 拡張機能の動作確認と利用

1. prh.yml を作成または配置したら、VSCodeでMarkdownファイルやRe:VIEWファイルを開きます。
2. prh.yml のルールに違反する箇所があると、エディタ上で波線が表示されたり、問題パネル（表示 > 問題）に指摘事項がリストアップされたりします。
3. 指摘箇所にカーソルを合わせると、修正候補が表示されます。電球アイコン（💡）が表示された場合は、それをクリックすると「Quick Fix...」が表示され、修正案を選択して適用できます。
4. コマンドパレット（Ctrl+Shift+P または Cmd+Shift+P）を開き、「prh」と入力すると、関連コマンドが表示されることがあります。例えば、「prh: Apply all fixes in the current
   document」のようなコマンドがあれば、ファイル全体の修正を一括で行えます。

::: tip 補足

- Node.js と npm (または yarn): prh および prh-languageserver はNode.
  jsのパッケージとして提供されているため、それらがシステムにインストールされていることが前提となる場合があります。もし拡張機能がうまく動作しない場合は、Node.jsとnpm（またはyarn）がインストールされ、PATHが通っているか確認してください。

拡張機能の設定: VSCodeの「設定」（ファイル > 基本設定 > 設定、または Ctrl+,）で「prh」と検索すると、この拡張機能に関する設定項目が表示される場合があります。ここで設定ファイルのパスなどを調整できることがあります。

::: 
