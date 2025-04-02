import "reflect-metadata"
import { DataSource } from "typeorm"
import * as env from "dotenv"

env.config()

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port:  process.env.MYSQL_PORT ?  +process.env.MYSQL_PORT : 3306,
  password: process.env.MYSQL_PASSWORD || "root",
  database: process.env.MYSQL_DATABASE || "heroesDb",
  username: process.env.MYSQL_USER || "root",
  synchronize: true,
  logging: false,
  entities: [
    "src/entity/*.ts"
  ],
  migrations:[
   "migrations/*.ts"
  ],
  subscribers: [],
})

export default AppDataSource;