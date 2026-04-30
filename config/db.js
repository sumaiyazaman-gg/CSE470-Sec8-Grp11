const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");

const envPath = path.resolve(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const [key, ...rest] = trimmed.split("=");
    const value = rest.join("=").trim();
    if (key && value !== undefined && process.env[key] === undefined) {
      process.env[key] = value;
    }
  });
}

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "campus_portal",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = pool.promise();

db.getConnection()
  .then((connection) => {
    console.log("Connected to database");
    connection.release();
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

module.exports = db;
