import mysql from "./mysql";
// const { writeFileSync } = require("fs");

// MySQL connection
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "users",
});

conn.connect(function (err) {
  if (err) {
    console.error("Not Connected Successfully");
    return;
  }
  console.log("Server connected Successfully");
});

// Fetch data from table
conn.query("SELECT * FROM clients", function (err, result, fields) {
  if (err) {
    console.error("Cannot collect data from SQL database", err);
    return;
  }

  console.log("Fields selected successfully");

  // ✅ Move this block inside the callback:
  const rows = result
    .map(
      (row) => `
        <tr>
          <td>${row.id}</td>
          <td>${row.first_name}</td>
          <td>${row.last_name}</td>
          <td>${row.email}</td>
          <td>${row.gender}</td>
          <td>${row.age}</td>
          <td>${row.owns_a_car ? "Yes" : "No"}</td>
        </tr>
      `
    )
    .join("");

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Clients Table</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
    </head>
    <body>
      <h2 style="text-align:center;">Clients Table</h2>
      <table class='table table-success table-bordered'>
        <thead>
          <tr>
            <th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Gender</th><th>Age</th><th>Owns a Car</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </body>
    </html>
  `;

//   writeFileSync("clients_table.html", html);
  console.log("clients_table.html created successfully");

  conn.end();
});
function addClients(fname, lname, email, gender, age, car) {
  const sql =
    "INSERT INTO clients (first_name, last_name, email, gender, age, owns_a_car) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [fname, lname, email, gender, age, car];

  conn.query(sql, values, function (err, result) {
    if (err) throw err;
    console.log("Client added successfully!");
  });
}
