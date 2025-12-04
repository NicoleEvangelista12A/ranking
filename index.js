import express from "express";
import cors from "cors";
import { createTable } from "./db.js";
import { getPodio, getRanking, addPlayer } from "./rankingController.js";

const app = express();
const port = 3006;

app.use(cors());
app.use(express.json());

createTable();

// ROTAS
app.get("/podio", getPodio);
app.get("/ranking", getRanking);
app.post("/ranking", addPlayer);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}, Jussara 💖`);
});
