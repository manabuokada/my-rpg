import { Hono } from "hono";
import { upgradeWebSocket } from "hono/deno";
import type { GameMessage, Player } from "@rpg/common";

const app = new Hono();
const players = new Map<string, Player>();

app.get("/ws", upgradeWebSocket((c) => {
  return {
    onOpen(evt, ws) {
      console.log("Client connected");
    },
    onMessage(evt, ws) {
      // 受信データを GameMessage 型として扱う
      const data = JSON.parse(evt.data as string) as GameMessage;
      
      if (data.type === "JOIN") {
        console.log(`${data.name}が入室しました`);
        ws.send(JSON.stringify({ type: "WELCOME", message: `ようこそ ${data.name}！` }));
      }
    },
    onClose: () => console.log("Client disconnected"),
  };
}));

// ポート番号を環境変数から取得（デフォルトは8000）
const port = Number(Deno.env.get("PORT")) || 8000;

Deno.serve({ port }, app.fetch);

