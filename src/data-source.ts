import { DataSource } from "typeorm";
import 'dotenv/config'
import 'reflect-metadata'

export const dataSource = new DataSource({
    type:'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
})