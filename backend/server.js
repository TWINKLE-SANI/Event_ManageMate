const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Your MySQL password
  database: "managemate",
  port: 3307,
});

const eventRouter = require('./dash_b')
const signupRouter = require('./signup_b')

app.use('/', eventRouter)
app.use('/', signupRouter)

app.post('/login', (req, res) => {
  const sql = "SELECT email, password FROM signup WHERE email = ? AND password = ?";

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) return res.json({ success: false, message: "Database error" });

    if (data.length > 0) {
      return res.json({ success: true, message: "Login Successfully" });
    } else {
      return res.json({ success: false, message: "No Record" });
    }
  });
});

// Start Server
app.listen(3001, () => {
  console.log("Listening...");
});
