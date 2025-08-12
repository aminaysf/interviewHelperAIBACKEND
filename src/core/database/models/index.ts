
import { Dialect, Sequelize } from 'sequelize'
import * as dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.DATABASE_NAME as string
const dbUser = process.env.DATABASE_USER as string
const dbHost = process.env.DATABASE_HOST
const dbPassword = process.env.DATABASE_PASSWORD
const dbPort = Number(process.env.DATABASE_PORT) || 5432

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
  port: dbPort,
})

export default sequelizeConnection