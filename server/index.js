#!/usr/bin/env node
const readline = require("readline");
const {
    addEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee
} = require("./employeeManager");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log("\n=== Employee Management System ===");
    console.log("1. Add Employee");
    console.log("2. View Employees");
    console.log("3. Update Employee");
    console.log("4. Delete Employee");
    console.log("5. Exit");

    rl.question("Choose an option: ", handleMenu);
}

function handleMenu(choice) {
    switch (choice) {
        case "1":
            addEmployeeMenu();
            break;
        case "2":
            viewEmployees();
            break;
        case "3":
            updateEmployeeMenu();
            break;
        case "4":
            deleteEmployeeMenu();
            break;
        case "5":
            console.log("Goodbye!");
            rl.close();
            break;
        default:
            console.log("Invalid choice!");
            showMenu();
    }
}

function addEmployeeMenu() {
    rl.question("Enter ID: ", (id) => {
        if (!id) return invalidInput();

        rl.question("Enter Name: ", (name) => {
            if (!name) return invalidInput();

            rl.question("Enter Role: ", (role) => {
                if (!role) return invalidInput();

                rl.question("Enter Salary: ", (salary) => {
                    if (isNaN(salary)) return invalidInput();

                    addEmployee({
                        id,
                        name,
                        role,
                        salary: Number(salary)
                    });

                    console.log("Employee added successfully!");
                    showMenu();
                });
            });
        });
    });
}

function viewEmployees() {
    const employees = getEmployees();

    if (employees.length === 0) {
        console.log("No employees found.");
    } else {
        console.table(employees);
    }
    showMenu();
}

function updateEmployeeMenu() {
    rl.question("Enter Employee ID to update: ", (id) => {
        rl.question("Enter new Name: ", (name) => {
            rl.question("Enter new Role: ", (role) => {
                rl.question("Enter new Salary: ", (salary) => {
                    const success = updateEmployee(id, {
                        name,
                        role,
                        salary: Number(salary)
                    });

                    if (success) {
                        console.log("Employee updated successfully!");
                    } else {
                        console.log("Employee not found.");
                    }
                    showMenu();
                });
            });
        });
    });
}

function deleteEmployeeMenu() {
    rl.question("Enter Employee ID to delete: ", (id) => {
        const success = deleteEmployee(id);

        if (success) {
            console.log("Employee deleted successfully!");
        } else {
            console.log("Employee not found.");
        }
        showMenu();
    });
}

function invalidInput() {
    console.log("Invalid input. Please try again.");
    showMenu();
}

showMenu();
module.exports = app;