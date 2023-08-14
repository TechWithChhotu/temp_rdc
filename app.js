const express = require("express");
const mysql = require("mysql2/promise");
require("dotenv").config();
let receivedData = "";
const PASSWORD = "Chhotu@MySql123";
const HOST_NAME = "localhost";
const USER = "root";
const DB_NAME = "university";
const TABLE_NAME = "rdc";

const app = express();
const port = 8088;
let command = `SELECT * FROM ${process.env.TABLE_NAME}`;
app.get("/connect", async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: HOST_NAME,
      user: USER,
      password: PASSWORD,
      database: DB_NAME,
    });
    const [rows] = await connection.query(`${command}`);
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

//********************************************
//--------------------------------------------
// Middleware to parse the request body as text
app.use(express.text());

// app.post("/send-data", (req, res) => {
//   receivedData = req.body;
//   console.log("Received data:", receivedData);
//   res.send("Data received successfully!");
//   command = `SELECT * FROM ${process.env.TABLE_NAME} ${receivedData}`;
//   const [row]=
// });

// Existing code for database connection and other configurations
//--------------------------------------------
// app.post("/fetch-data", async (req, res) => {
//   try {
//     receivedData = req.body;
//     command = `SELECT * FROM ${process.env.TABLE_NAME} ${receivedData}`;

//     const [rows] = await connection.query(`${command}`);
//     res.json(rows);
//     console.log("Received data:", receivedData);
//     res.send("Data received successfully!");
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Error fetching data from MySQL" });
//   }
// });
//--------------------------------------------
app.post("/filter-data", async (req, res) => {
  try {
    const filterCriteria = req.body; // Assuming your criteria is an object

    // Construct and execute the filtered query based on filterCriteria
    const query = `SELECT * FROM ${process.env.TABLE_NAME} WHERE course=BCA`; // Construct your query here
    const [filteredRows] = await connection.query(query);

    connection.end();

    res.json(filteredRows);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error filtering data from MySQL" });
  }
});
