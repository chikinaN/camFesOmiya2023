# camFesOmiya2023

## やり方

更新をしていく予定です(10/18)

### デプロイ

本番環境はfirebaseで開発環境はgitHubPagesです

#### デプロイ時のフロー（簡易）

1. GitHub Desktop等でのpush
2. GitHub Pageでの確認
3. 部門長の承認をもらったら[gitHubAction](https://github.com/chikinaN/camFesOmiya2023/actions/workflows/firebase-hosting-merge.yml)を開き、run workflowを実行
4. firebaseでのデプロイの確認(任意)
5. 本番環境を開き確認

#### 各url

本番環境
[https://camfes-omiya-2023.web.app/](https://camfes-omiya-2023.web.app/)

開発環境
[https://chikinan.github.io/camFesOmiya2023/](https://chikinan.github.io/camFesOmiya2023/)

### 新規ページ

1. VScodeで開く
2. ファイルを作成し[^1],[このhtml](/public/copy.html)をコピーし、ファイルに貼り付ける[^4]
3. この[ファイル](public/json/pagelist.json)を編集[^3] (例一を参照)
4. css、jsファイルの作成[^5]
   1. 作成場所はそれぞれcssフォルダー、jsフォルダーに入れる
   2. 名前はhtmlファイル名を使う
   3. linkタグやscriptタグなどをhtmlに書く
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

### サイドの点から外れる方法

以下のような感じでidに`--no-side-index`という変数を割り当てた場合、
横の丸の適応外になります
1で削除0で出現
初期値は0

```css
#test {
  --no-side-index: 1;
}
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

### レスポンシブ

スマホなどでレイアウトが崩れる場合、以下のようにする

```css
@media screen and (max-width: 600px) {
  .クラス名 {}
}
```

### カードオプションの使い方

1. 以下のスクリプトタグを入れる
2. sectionのクラスにcardを入れる
3. sectionの中を以下のようにする
4. 画像のパスを入れる[^6]
5. h4の中に小題を入れpの中に文字を書く

#### 機能

- レスポンシブ対応
  - スマホだと画像と文字が上下になります
- アンダーラインの設定
- ホバー機能(未実装)

```html
<script src="js/option/card.js"></script>
```

```html
  <section id="" class="card">
    <h2></h2>
    <img src="" alt="サンプル">
    <aside>
      <h4></h4>
      <p></p>
    </aside>
  </section>
```

[^1]:ファイル名は作ろうとしているページの英語版できれば1単語無理ならTimeTableみたいな感じ
[^2]:プルリクとはgitHub上での「変更したいです」というようなもの
[^3]:分からない人は部門長に質問
[^4]:ハンバーガーメニューに使いたい
[^5]:任意
[^6]:src=""の中に
