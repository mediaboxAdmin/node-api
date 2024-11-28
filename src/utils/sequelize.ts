import { Sequelize } from "sequelize"

import dotenv from "dotenv"

dotenv.config()
const DB_PORT: number = process.env.DB_PORT ? (process.env.DB_PORT as unknown as number) : 3306
const sequelize = new Sequelize({
   host: process.env.BD_HOST,
   username: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   port: DB_PORT,
   dialect: "mysql",
})

export default sequelize
