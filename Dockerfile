FROM denoland/deno:alpine

WORKDIR /app

# 1. まず全ファイルをコピー（この時点では root 権限）
COPY . .

# 2. root 権限があるうちに、問題のロックファイルを削除
RUN rm -f deno.lock

# 3. ファイルの所有権を deno ユーザーに変更
RUN chown -R deno:deno /app

# 4. 非Rootユーザーに切り替え
USER deno

# 5. インストール実行（ここで新しい lockfile が生成される）
RUN deno install

EXPOSE 8000

CMD ["run", "--allow-net", "--allow-env", "packages/server/src/main.ts"]