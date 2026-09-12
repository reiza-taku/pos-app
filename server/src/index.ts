import express from "express";
import cors from "cors";
import { db } from "./db";
import { createUser, verifyPassword } from "./auth";

//Expressアプリの作成（webサーバの設定を集める）
const app = express();


/*------------------------------------------
    共通のミドルウェアの設定
------------------------------------------*/

//リクエストがルート処理に到達する前に、リクエストのボディをJSONとして解析する
app.use(cors());
//HTTPリクエストのボディをJSONとして解析するミドルウェアを追加
app.use(express.json());

//GET /health エンドポイントの定義
//app.get("URLのパス", "リクエストを処理する関数");
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/test-user", async (_req, res) => {
  await createUser("staff1", "password123", "staff");
  res.json({ message: "created" });
});

//環境変数 PORT があればそれを使い、なければ3001番を使う
const PORT = process.env.PORT || 3001;


/*------------------------------------------
    serverの起動
------------------------------------------*/
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})