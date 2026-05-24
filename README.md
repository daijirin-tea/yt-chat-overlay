# yt-chat-overlay
youtube data apiを用いて簡素なチャット欄のオーバレイを表示させます
# 事前に必要なもの
- Git
- `YouTube Data API v3` のAPIキー

# 導入(初回)
Gitを用いてフォルダをクローンします
1. `yt-chat-overlay`を置きたいフォルダで右クリック→`ターミナルで開く`
2. ターミナル上で`git clone https://github.com/daijirin-tea/yt-chat-overlay.git`を入力
3. 作成された`yt-chat-overlay`というフォルダに移動し、`apiKey.js`と`defineEvents.js`を作成
4. `apiKey.js`の中身を`const API_KEY = 'あなたのAPIキー';`に変更(例:`const API_KEY = '012abc';`)
5. `defineEvents.js`の中身を`const imageDisplayEvents = [];`に変更

# アップデート(二回目以降)
1. `yt-chat-overlay`に対して右クリック→`ターミナルで開く`
2. ターミナル上で`git pull origin main`を入力

# 配信ごとに実行
1. ファイルのurlの`v=`の後ろを`https://www.youtube.com/watch?v=`の後ろの文字列に変更する
2. 再読み込みをする
  
もしくは、
  
1. OBSの対話(操作)を選択
2. 右クリックでメニューを開き、動画IDを張り付けて確定

# レイアウトを変える方法
1. 「index.html」をchromeなどのブラウザにドラッグアンドドロップする
2. 警告にOKと押すとテストの画面が出てくる
3. 右クリックでメニューを開き、位置やサイズを調整する
4. 動画IDに`https://www.youtube.com/watch?v=`の後ろの文字列を入力し、Enterで確定する
5. 「メニュー」→「Copy」でファイルのurl「(例)`file:///C:/Users/.../index.html`」をコピーし、OBSのブラウザソースに張り付ける

# defineEvents.js
`[]`となっている部分を書き換えれば特定のキーワードが含まれるコメントに対し、画像を表示させることができます
型をTypeScriptであらわすと以下のようになります
```typescript
type ImageDisplayEvents = {
    type: 0 | 1 | 2 | 3,
    matches: (string | RegExp)[],
    sources: string[]
}[]
```
役割は以下の通りです
| type | matches | source | 
| :--- | :--- | :--- |
| 表示方法を変える(ぽよんと出てくる、上から降ってくるなど) | キーワードとなる文字列(部分一致)、または正規表現のリスト | 表示する画像のリスト。この中からランダムで選ばれる |
## 例
```javascript :defineEvents.js
const imageDisplayEvents = [
    {
        type: 0,
        matches: ["PON","pon","ぽん","ポン","ﾎﾟﾝ","ＰＯＮ","ｐｏｎ"],
        sources: ["assets/pon_1.jpg","assets/pon_2.jpg"]
    },
    {
        type: 0,
        matches: [/^(?=.*おにぎり)(?=.*鮭).*$/],
        sources: ["assets/shake.png"]
    },
    {
        type: 0,
        matches: [/^(?=.*おにぎり)(?=.*梅).*$/],
        sources: ["assets/ume.png"]
    },
    {
        type: 3,
        matches: [/^(?=.*おにぎり)(?!.*鮭)(?!.*梅).*$/],
        sources: ["assets/onigiri.png"]
    }
];
```