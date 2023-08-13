const express = require("express");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
const port = 3000;

app.get("/connect", async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.HOST_NAME,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await connection.query(
      `SELECT * FROM ${process.env.TABLE_NAME}`
    );
    connection.end();

    res.json(rows);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error connecting to MySQL" });
  }
});

app.use(express.static(__dirname)); // Serve HTML and JS files
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
