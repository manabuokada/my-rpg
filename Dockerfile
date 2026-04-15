# バージョンを固定して再現性を確保
FROM denoland/deno:alpine-2.1.4

# 作業ディレクトリの作成
WORKDIR /app

# セキュリティ: 実行ユーザーを 'deno' に固定
# 公式イメージには最初からこのユーザーが含まれています
COPY --chown=deno:deno . .

# 非Rootユーザーに切り替え
USER deno

# 依存関係のインストール（Deno 2.0の標準的な解決）
RUN deno install

# Renderの環境変数 $PORT を使うためのポート開放（内部ドキュメント用）
EXPOSE 8000

# 最小限の権限で実行
# --allow-net: WebSocket通信に必要
# --allow-env: $PORT 等の環境変数読み取りに必要
CMD ["run", "--allow-net", "--allow-env", "packages/server/src/main.ts"]