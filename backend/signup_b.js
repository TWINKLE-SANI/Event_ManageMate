const express = require("express");
const mysql = require("mysql2");


const router = express.Router(); // Create a router instance


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "managemate",
  port: 3307,
});


router.post('/signup', (req, res) => {
  const sql = "insert into signup(name,email,password) values(?,?,?)";


  db.query(sql, [req.body.name, req.body.email, req.body.password], (err, data) => {
    if (err) return res.json({ success: false, message: "Database error" });


    return res.json({ success: true, message: "SignUp Successfully" });
  });
});


module.exports = router;  // Export the router instance



