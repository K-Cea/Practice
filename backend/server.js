const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let records = [
  { id: 1, name: "John" },
  { id: 2, name: "Maria" },
  { id: 3, name: "Alex" }
];

// Test route
app.get("/api", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// Get all records
app.get("/api/records", (req, res) => {
  res.json(records);
});

// Add a record
app.post("/api/records", (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Name is required." });
  }

  const newRecord = {
    id: records.length + 1,
    name: name.trim()
  };

  records.push(newRecord);
  res.status(201).json(newRecord);
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});