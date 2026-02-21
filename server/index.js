const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json()); // ✅ REQUIRED

const dataFile = path.join(__dirname, "data", "employees.json");

// Helpers
function loadEmployees() {
  try {
    if (!fs.existsSync(dataFile)) return [];
    const data = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    return [];
  }
}

function saveEmployees(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// Routes
app.get("/employees", (req, res) => {
  res.json(loadEmployees());
});
app.get("/", (req, res) => {
  res.send("Employee Management API is running 🚀 Use /employees");
});

app.post("/employees", (req, res) => {
  const employees = loadEmployees();
  employees.push(req.body);
  saveEmployees(employees);
  res.status(201).json({ message: "Employee added" });
});

app.put("/employees/:id", (req, res) => {
  const employees = loadEmployees();
  const index = employees.findIndex(e => e.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Employee not found" });
  }

  employees[index] = { ...employees[index], ...req.body };
  saveEmployees(employees);
  res.json({ message: "Employee updated" });
});

app.delete("/employees/:id", (req, res) => {
  const employees = loadEmployees();
  const filtered = employees.filter(e => e.id !== req.params.id);

  if (filtered.length === employees.length) {
    return res.status(404).json({ message: "Employee not found" });
  }

  saveEmployees(filtered);
  res.json({ message: "Employee deleted" });
});

// 🔴 THIS LINE IS MANDATORY FOR VERCEL
module.exports = app;