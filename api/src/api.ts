import express from "express";
import TypeOrm from "./builder/typeorm";

const app = express();
const PORT = 5555;

app.use(express.json());

(async () => {
  const db = await TypeOrm.getInstance();
  const connection = db.getTypeOrm();
  console.log("Conexão obtida com sucesso!", connection.isInitialized);
})();

app.get("/isAlive", (_, res) => {
  res.status(200).json({ status: "alive" });
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📚 Documentação: http://localhost:${PORT}/api-docs`);
});
