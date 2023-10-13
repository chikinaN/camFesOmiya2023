# camFesOmiya2023

## やり方

更新をしていく予定です(10/11)

### 新規ページ

1. VScodeで開く
2. ファイルを作成し[^1],[このhtml](/public/copy.html)をコピーし、ファイルに貼り付ける[^4]
3. この[ファイル](public/json/pagelist.json)を編集[^3] (例一を参照)
4. css、jsファイルの作成[^5]
   1. 作成場所はそれぞれcssフォルダー、jsフォルダーに入れる
   2. 名前はhtmlファイル名を使う
5. sectionを変更(例二を参照)
6. 必須要件[^4]
   1. sectionのid名を記入
   2. h2内を記入

### 以下例

#### 例一

```json
,{
  // "id": 前の次の値,
  // "name": 英語の名前,
  // "jaName": 日本語の名前,
  // "path": リンク
  "id": 1,
  "name": "main",
  "jaName": "メインページ",
  "path": "/access.html"
}
```

#### 例二

基本的に以下のarticle内にsectionを追加

```html
<section id="idName">
  <h2>content</h2>
</section>
```

```html
<article>
  <section>
    <h2></h2>
  </section>
  <section>
    <h2></h2>
  </section>
</article>
```

### ページ変更

1. VScodeで開く
2. [TODO](/TODO.md)やdiscordなどで変更の通知がないか確認
   - あった場合
     - 該当箇所を確認
   - なかった場合
     - 変更

### プルリク

1. できたのを確認
2. プルリク[^2]する

[^1]:ファイル名は作ろうとしているページの英語版できれば1単語無理ならTimeTableみたいな感じ
[^2]:プルリクとはgitHub上での「変更したいです」というようなもの
[^3]:分からない人は部門長に質問
[^4]:ハンバーガーメニューに使いたい
[^5]:任意
