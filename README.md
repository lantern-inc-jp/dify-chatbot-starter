# LANTERN Chatbot Starter

Dify・Next.js・Vercelを使い、企業サイト向けの公式AIチャットボットを短期間で構築するための案件スターターです。単なる色や社名の差し替えに限定せず、標準カード、引用、画像、独自Reactコンポーネント、クライアント固有のDifyフローまで拡張できます。

## 成果物

このスターターから、案件ごとに次の4点を作成します。

1. Difyインポート用DSLとクライアント専用ナレッジ
2. GitHub・Vercelへ配置するチャットWebアプリ
3. 顧客サイトへ貼り付ける埋め込みJavaScript
4. 設定・テスト・運用ドキュメント

## クイックスタート

```bash
pnpm install --frozen-lockfile
copy .env.example .env.local
pnpm validate:client
pnpm dev
```

開発画面は `http://localhost:3000`、リッチ表示プレビューは `http://localhost:3000/dev/rich-preview` です。プレビューページは本番環境では404になります。

## 新しいクライアント案件を始める

1. このフォルダを案件名で複製し、新しいGitリポジトリとして管理します。
2. `client/client.config.json` の会社名、ブランド、カード、公式URL、埋め込み設定を変更します。
3. ロゴとカード画像を `public/client-assets/` へ配置します。
4. `client/knowledge/` の雛形を、公式サイトと顧客確認済み資料だけで埋めます。
5. `pnpm validate:client` を実行します。
6. `dify/base-chatbot.yml` を案件用に編集してDifyへインポートし、モデルとナレッジベースを選択します。
7. Vercelへデプロイして環境変数を設定します。
8. `client.config.json` の `embed.chatUrl` を本番URLへ変更し、`pnpm generate:embed` を実行します。
9. `dist/chatbot-embed.js` を顧客サイトへ設置します。
10. `docs/TEST_CHECKLIST.md` に沿って受入テストを行います。

## 環境変数

```dotenv
NEXT_PUBLIC_APP_ID=
DIFY_API_KEY=
NEXT_PUBLIC_API_URL=https://api.dify.ai/v1
```

`DIFY_API_KEY`はVercelのサーバー専用環境変数です。ブラウザへ公開したり、Gitへcommitしたりしないでください。旧案件からの移行時だけ`NEXT_PUBLIC_APP_KEY`をサーバー側フォールバックとして読みます。

## リッチ表示プロトコル

DifyはHTMLや任意の画像URLではなく、検証可能な制御トークンだけを返します。

```text
[[CHATBOT_CARD:service-a]]
[[CHATBOT_CARD:contact]]
[[CHATBOT_CARD:services]]
```

カードの内容とリンク先は `client/client.config.json` の許可済みカタログから描画されます。`collections.services` のようなコレクションIDは複数カードのカルーセルへ展開されます。

## 独自UIを追加する

標準カードで足りない案件では、商品、予約、求人、店舗、料金シミュレーターなどのReactコンポーネントを作り、`client/renderers.tsx`へ登録します。

```tsx
import ProductCard from './components/product-card'

export const CLIENT_CARD_RENDERERS = {
  product: ProductCard,
}
```

カード設定の`renderer`を`product`にすると、その案件だけ独自表示へ切り替わります。共通コアを直接複製改造する必要はありません。

## 設定と生成コマンド

```bash
pnpm validate:client   # URL、色、カードID、画像、コレクション参照を検査
pnpm generate:embed    # dist/chatbot-embed.jsを生成
pnpm lint              # コード品質を検査
pnpm typecheck         # TypeScriptの型を検査
pnpm build             # 設定・型検査後にNext.js本番ビルド
```

## ディレクトリ

```text
client/                 案件固有の設定、拡張コンポーネント、ナレッジ
config/                 Next.js・Dify API接続設定
app/                    共通チャットUI
dify/                   Difyインポート用プリセット
public/client-assets/   ロゴ・カード画像
scripts/                設定検証・埋め込み生成
docs/                   設計、導入、セキュリティ、テスト手順
dist/                   生成された埋め込みコード（git管理外を推奨）
```

## ライセンス

LANTERNが独自に作成したコード、設定、デザイン、ドキュメントについて、第三者への利用許諾は行っていません。リポジトリを閲覧できること自体は利用許可を意味しません。詳細は[LICENSE](./LICENSE)を確認してください。

Dify由来部分などの第三者著作物には、それぞれのライセンスが引き続き適用されます。該当する表示は[THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)に記載しています。

## 案件運用の原則

- クライアントごとにDifyアプリ、ナレッジ、APIキー、Vercelプロジェクトを分離します。
- 回答根拠は公開情報または顧客承認済み資料に限定します。
- リンクとカードは許可リスト方式とし、LLMにURLを生成させません。
- Dify Preview、Vercel URL、実際の埋め込み先の3環境で確認します。
- Claude Design等で作ったデザイン案は、そのまま貼り付けずテーマ設定またはクライアント独自コンポーネントへ移植します。

詳細は[アーキテクチャ](docs/ARCHITECTURE.md)、[導入手順](docs/CLIENT_ONBOARDING.md)、[Dify設定](docs/DIFY_SETUP.md)、[埋め込み](docs/EMBEDDING.md)、[セキュリティ](docs/SECURITY.md)、[テスト](docs/TEST_CHECKLIST.md)を参照してください。
