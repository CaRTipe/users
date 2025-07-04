import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));

// MySQL connection
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "users",
});

conn.connect(function (err) {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Database connected successfully");
});

// API endpoint to get all clients
app.get('/api/clients', (req, res) => {
  conn.query("SELECT * FROM clients", function (err, result) {
    if (err) {
      console.error("Error fetching clients:", err);
      return res.status(500).json({ error: "Failed to fetch clients" });
    }
    res.json(result);
  });
});

// API endpoint to add a new client
app.post('/api/clients', (req, res) => {
  const { fname, lname, email, gender, age, car } = req.body;
  
  const sql = "INSERT INTO clients (first_name, last_name, email, gender, age, owns_a_car) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [fname, lname, email, gender, age, car === "Yes" ? 1 : 0];

  conn.query(sql, values, function (err, result) {
    if (err) {
      console.error("Error adding client:", err);
      return res.status(500).json({ error: "Failed to add client" });
    }
    res.json({ message: "Client added successfully", id: result.insertId });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
