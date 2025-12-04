import { openDb } from "./db.js";

// ===============================
// PEGAR TOP 3 (PÓDIO)
// ===============================
export async function getPodio(req, res) {
  try {
    const db = await openDb();
    const podio = await db.all(
      "SELECT username, total_points FROM ranking ORDER BY total_points DESC LIMIT 3"
    );

    res.json(podio);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao carregar pódio" });
  }
}

// ===============================
// PEGAR RANKING COMPLETO (4° PRA BAIXO)
// ===============================
export async function getRanking(req, res) {
  try {
    const db = await openDb();
    const ranking = await db.all(
      `SELECT username, total_points 
       FROM ranking 
       ORDER BY total_points DESC 
       LIMIT -1 OFFSET 3`
    );

    res.json(ranking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao carregar ranking" });
  }
}

// ===============================
// ADICIONAR JOGADOR
// ===============================
export async function addPlayer(req, res) {
  const { username, total_points } = req.body;

  if (!username || total_points === undefined) {
    return res.status(400).json({ error: "Envie username e total_points!" });
  }

  try {
    const db = await openDb();
    await db.run(
      "INSERT INTO ranking (username, total_points) VALUES (?, ?)",
      [username, total_points]
    );

    res.json({ message: "Jogador registrado!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao salvar jogador" });
  }
}
