const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "../data/employees.json");

// Load employees from file
function loadEmployees() {
    if (!fs.existsSync(dataFile)) return [];
    const data = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(data || "[]");
}

// Save employees to file
function saveEmployees(employees) {
    fs.writeFileSync(dataFile, JSON.stringify(employees, null, 2));
}

// Add employee
function addEmployee(employee) {
    const employees = loadEmployees();
    employees.push(employee);
    saveEmployees(employees);
}

// Get all employees
function getEmployees() {
    return loadEmployees();
}

// Update employee
function updateEmployee(id, updatedData) {
    const employees = loadEmployees();
    const index = employees.findIndex(emp => emp.id === id);

    if (index === -1) return false;

    employees[index] = { ...employees[index], ...updatedData };
    saveEmployees(employees);
    return true;
}

// Delete employee
function deleteEmployee(id) {
    let employees = loadEmployees();
    const initialLength = employees.length;

    employees = employees.filter(emp => emp.id !== id);

    if (employees.length === initialLength) return false;

    saveEmployees(employees);
    return true;
}

module.exports = {
    addEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee
};