import pg from "pg";
import env from "dotenv";

env.config();

const db = new pg.Client({
  user: "postgres",
  password: "pranab",
  database: "clients_db",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

db.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch(err => console.error("Database connection error:", err.stack));

export default db;