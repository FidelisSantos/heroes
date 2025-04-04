import express from "express";
import * as bodyParser from "body-parser";
import ErrorMiddleware from "./middlewares/ErrorMiddleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../config/swaggerConfig.js";
import * as env from "dotenv";
import { typeorm } from "./builder/index.js";
import Routes from "./routes/index.js";
import BadRequestError from "./errors/BadRequestError.js";
import { NextFunction, Request, Response } from "express";

env.config();

class App {
  private app = express();
  private port = process.env.APP_PORT || 5555;

  constructor() {
    this.start();
  }

  private async start() {
    try {
        if (!typeorm.isInitialized) {
            await typeorm.initialize();
        }
        this.config();
    } catch (error) {
        console.error("❌ Erro ao inicializar o banco de dados:", error);
    }
  }

  private config() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    new Routes(this.app);

    this.app.use((error:Error | BadRequestError, req:Request, res:Response, next:NextFunction)=>
        ErrorMiddleware.handleError(error, req, res, next)
      );

    this.app.listen(this.port, () => {
      console.log(`🚀 Servidor rodando na porta ${this.port}`);
    });
  }
}

new App();
