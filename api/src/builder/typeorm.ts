import { DataSource } from "typeorm";
import * as env from "dotenv"
import  AppDataSource  from "../../config/typeormConfig";
env.config()

class TypeOrm {
  public static instance : TypeOrm;
  private typeorm: DataSource;
  private constructor() {
    this.typeorm = AppDataSource;
  }
 
  public static async getInstance() : Promise<TypeOrm> {
    if (!TypeOrm.instance) {
      TypeOrm.instance = new TypeOrm();
      try {
        await TypeOrm.instance.initialize()
        console.log("Initialized Connection")
      } catch (e) {
        console.log("Failed to initialize Connection", e.message)
      }
    }

    return TypeOrm.instance;
  }

  public async initialize(): Promise<void> {
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

export default TypeOrm