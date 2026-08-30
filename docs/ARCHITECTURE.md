# アーキテクチャ

## 設計方針

このスターターは「共通コア」「標準機能」「案件固有レイヤー」を分離します。設定だけで済む案件は高速に構築し、独自要件は`client/`配下でReactコンポーネントやDifyフローを追加します。

```text
Webサイト埋め込みコード
        ↓ iframe
Next.js / Vercel
        ↓ server-side API proxy
Dify Advanced Chat
        ↓
クライアント専用ナレッジ
```

Dify APIキーはNext.jsのRoute Handlerだけが利用します。ブラウザは同一オリジンの`/api/*`へアクセスし、Difyの秘密鍵を保持しません。

## 拡張境界

- ブランドと標準コンテンツ：`client/client.config.json`
- 独自カードUI：`client/renderers.tsx`
- 独自アセット：`public/client-assets/`
- 回答知識：`client/knowledge/`
- 回答制御と分岐：Difyの案件別DSL
- 外部API：サーバーRoute HandlerまたはDify Toolノード

## マルチテナントにしない理由

クライアントごとにデプロイを分けることで、APIキー、会話履歴、ナレッジ、障害影響、契約終了時の削除範囲を明確にします。共通化するのはソースと制作手順であり、顧客データではありません。
