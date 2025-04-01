import express, { Request, Response } from "express";

const app = express();
const PORT = 5555;

app.use(express.json());

app.get("/isAlive", (_, res) => {
  res.status(200).json({ status: "alive" });
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📚 Documentação: http://localhost:${PORT}/api-docs`);
});
