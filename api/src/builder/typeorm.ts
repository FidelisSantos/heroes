import { DataSource } from "typeorm";
import * as env from "dotenv";
import AppDataSource from "../../config/typeormConfig.js";

env.config();

class Database {
    private static instance: Database;
    private typeorm: DataSource;

    private constructor() {
        this.typeorm = AppDataSource;
    }

    public static async getInstance(): Promise<Database> {
        if (!Database.instance) {
            Database.instance = new Database();
            try {
                await Database.instance.initialize();
            } catch (e: any) {
                console.error("❌ Falha ao inicializar a conexão:", e.message);
            }
        }
        return Database.instance;
    }

    private async initialize(): Promise<void> {
        console.log("🔄 Tentando inicializar conexão com o banco...");

        if (!this.typeorm.isInitialized) {
            try {
                await this.typeorm.initialize();
                console.log("✅ Conexão inicializada com sucesso!");
            } catch (error) {
                console.error("❌ Erro ao inicializar conexão:", error);
            }
        } else {
            console.log("⚠️ Conexão já estava inicializada.");
        }
    }

    public getTypeOrm(): DataSource {
        return this.typeorm;
    }
}

async function initializeDatabase(): Promise<DataSource> {
    const database = await Database.getInstance();
    return database.getTypeOrm();
}


const typeormPromise = initializeDatabase();

export async function instanceDatabase() {
    return await typeormPromise;
}

