FROM denoland/deno:alpine

WORKDIR /app

# ファイルをコピー
COPY --chown=deno:deno . .

# セキュリティ: 非Rootユーザーへ
USER deno

# 【重要】既存のロックファイルを削除して、エラーを回避する
# その後、クリーンな状態でインストールを実行
RUN rm -f deno.lock && deno install

# ポート開放
EXPOSE 8000

# 実行権限の制限
CMD ["run", "--allow-net", "--allow-env", "packages/server/src/main.ts"]