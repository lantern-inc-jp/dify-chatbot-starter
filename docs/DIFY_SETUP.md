# Dify設定

1. `dify/base-chatbot.yml`を複製し、会社名、対応範囲、リンク・カード対応表、問い合わせ文を案件用に変更します。
2. DifyへDSLをインポートします。
3. LLMノードのモデルと認証情報を選択します。
4. `client/knowledge/`を登録した専用ナレッジベースをKnowledge Retrievalノードで選択します。
5. `client.config.json`の`tokenPrefix`、カードID、コレクションIDとプロンプトを一致させます。
6. Previewで対象内、対象外、情報不足、機密質問、問い合わせ誘導を確認して公開します。
7. API Accessでキーを発行し、Vercelの`DIFY_API_KEY`へ保存します。

DSLの`[会社名]`や`example.com`が残った状態では公開しないでください。Difyからカード制御トークンが出るため、フロントエンドを先にデプロイします。
