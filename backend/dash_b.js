const express = require("express");
const mysql = require("mysql");

const router = express.Router(); // Use router instead of app

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "managemate", // Replace with your database name
  port: 3307
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database!");
});

// API endpoint to add an event
router.post("/add-event", (req, res) => {
  const { eventName } = req.body; // Get event name from the request body

  if (!eventName) {
    return res.status(400).json({ error: "Event name is required" });
  }

  const query = "INSERT INTO events (eventName) VALUES (?)";

  db.query(query, [eventName], (err, result) => {
    if (err) {
      console.error("Error inserting event:", err);
      return res.status(500).json({ error: "Failed to add event" });
    }

    res.status(200).json({ message: "Event added successfully", eventId: result.insertId });
  });
});

// API endpoint to add catering details
router.post("/add-catering", (req, res) => {
  const { name, duration, staffAssigned, menu } = req.body;

  // Check if all fields are provided
  if (!name || !duration || !staffAssigned || !menu) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `
    INSERT INTO catering (name, duration, staffAssigned, menu)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [name, duration, staffAssigned, menu], (err, result) => {
    if (err) {
      console.error("Error adding catering details:", err);
      return res.status(500).json({ error: "Failed to save catering details" });
    }

    res.status(200).json({ message: "Catering details saved successfully!" });
  });
});

// API endpoint to add a photography detail
router.post("/add-photography", (req, res) => {
  const { name, duration, staffNames } = req.body;

  // Check if all fields are provided
  if (!name || !duration || !staffNames) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `
    INSERT INTO photography (name, duration, staffNames)
    VALUES (?, ?, ?)
  `;

  db.query(query, [name, duration, staffNames], (err, result) => {
    if (err) {
      console.error("Error adding photography details:", err);
      return res.status(500).json({ error: "Failed to save photography details" });
    }

    res.status(200).json({ message: "Photography details saved successfully!" });
  });
});

// Add this route to handle POST requests for decoration
router.post("/add-decoration", async (req, res) => {
  const { teamName, duration, startOfDecorating } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO Decoration (team_name, duration, start_of_decorating) VALUES (?, ?, ?)",
      [teamName, duration, startOfDecorating]
    );

    res.json({ message: "Decoration details saved successfully!" });
  } catch (error) {
    console.error("Error saving decoration details:", error);
    res.status(500).json({ error: "Failed to save decoration details" });
  }
});


module.exports = router; // Export the router
