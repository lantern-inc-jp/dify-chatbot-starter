# Webサイトへの埋め込み

## 生成

`client/client.config.json`の`embed.chatUrl`をVercel本番URLへ変更して実行します。

```bash
pnpm validate:client
pnpm generate:embed
```

生成物は`dist/chatbot-embed.js`です。顧客サイトの公開ディレクトリまたは管理可能なCDNへ配置し、閉じ`body`タグの直前で読み込みます。

```html
<script src="https://client.example/assets/chatbot-embed.js" defer></script>
```

STUDIOやCMSのカスタムコード欄へJavaScript本文を直接貼り付けることもできますが、更新性のため外部ファイル方式を推奨します。

## 調整可能な項目

- 左右位置と余白
- パネル幅・高さ
- 初回案内メッセージ
- ロゴとブランドカラー
- PCのフローティング表示とスマートフォン全画面表示

## 確認事項

- 顧客サイトのCSPでVercel URLの`frame-src`が許可されていること
- Cookie、プライバシーポリシー、アクセス解析の扱い
- 他の固定ボタンと重ならないこと
- iOS Safari、Android Chrome、主要PCブラウザで開閉できること
- 埋め込みコードを削除すればチャットボットを即時停止できること
