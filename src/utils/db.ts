import { createPool } from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let globalPool: any = undefined
const connection = async () => {
   try {
      if (globalPool) return globalPool
      globalPool = await createPool({
         host: process.env.BD_HOST,
         user: process.env.DB_USER,
         password: process.env.DB_PASSWORD,database: process.env.DB_NAME,
      })
      return globalPool
   } catch (error) {
      console.log(error)
      throw error
   }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const query = async (query: string, values?: any[]) => {
   const pool = await connection()
   return (await pool.query(query, values))[0]
}
