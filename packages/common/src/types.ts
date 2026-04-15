// プレイヤーの基本データ
export interface Player {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  lv: number;
  pos: { x: number; y: number };
}

// サーバーから送られてくるメッセージの種類
export type ServerEvent = 
  | { type: 'room_info'; players: Player[] }
  | { type: 'player_joined'; player: Player }
  | { type: 'battle_log'; message: string };

// クライアントからサーバーへ送るメッセージの種類
export type ClientCommand = 
  | { type: 'move'; direction: 'up' | 'down' | 'left' | 'right' }
  | { type: 'attack'; targetId: string };