import './style.css'
import type { GameMessage } from '@rpg/common'

// DOM要素の取得（index.htmlに後で追加します）
const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = `
  <div>
    <h1>RPG Client</h1>
    <div id="log" style="border: 1px solid #ccc; height: 200px; overflow-y: scroll; text-align: left; padding: 10px;"></div>
    <input type="text" id="nameInput" placeholder="名前を入力">
    <button id="joinBtn">入室</button>
  </div>
`

const logElement = document.querySelector<HTMLDivElement>('#log')!
const nameInput = document.querySelector<HTMLInputElement>('#nameInput')!
const joinBtn = document.querySelector<HTMLButtonElement>('#joinBtn')!

// WebSocketの接続（Denoサーバーのポートは8000）
// import.meta.env から読み込む
const WS_URL = import.meta.env.VITE_WS_URL;

if (!WS_URL) {
  throw new Error("VITE_WS_URL is not defined");
}

const ws = new WebSocket(WS_URL);

ws.onopen = () => {
  addLog('サーバーに接続しました')
}

ws.onmessage = (event) => {
  const data = JSON.parse(event.data)
  addLog(`受信: ${JSON.stringify(data)}`)
}

// ボタンクリック時に JOIN メッセージを送信
joinBtn.onclick = () => {
  const name = nameInput.value
  if (!name) return
  
  const msg: GameMessage = { type: 'JOIN', name: name }
  ws.send(JSON.stringify(msg))
}

function addLog(message: string) {
  const p = document.createElement('p')
  p.innerText = message
  logElement.appendChild(p)
  logElement.scrollTop = logElement.scrollHeight
}
