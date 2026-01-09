const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "app_user",
  password: "password_example_123",
  database: "database_example",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;