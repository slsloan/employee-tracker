// import dependencies 
var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

const banner =
    "|---------------------------------------------------|\n" +
    "|                                                   |\n" +
    "|  _____                  _                         |\n" +
    "| |  ___|_ ___  __  _ ___| | ___  _   _  ___   ___  |\n" +
    "| |  _| | `_  '_  |  _   | |/ _ '| | | |/ _ ' / _ ' |\n" +
    "| | |___| | | | | | |_|  | | |_| | | | |  __/|  __/ |\n" +
    "| |_____|_| |_| |_| ____/|_|'___/|___| |____||____| |\n" +
    "|                 |_|             |___/             |\n" +
    "|  __  __                                           |\n" +
    "| |  '/  | ____ _ __   ____  ___   ___   _ __       |\n" +
    "| | |'/| |/ _' | '_ ' / _  |/ _ ' / _ ' | ,__|      |\n" +
    "| | |  | | |_| | | | | |_| | |_| |  __/ | |         |\n" +
    "| |_|  |_||__,_|_| |_|___,_|___, |____|_|_|         |\n" +
    "|                           |___/                   |\n" +
    "|---------------------------------------------------|\n";

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_trackerDB"
});

// connect to the database
connection.connect(function (err) {
    if (err) throw err;
    console.log("connection successful");
    console.log(banner);
    runEmployeeTracker();
});

function runEmployeeTracker() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add a Department",
                "Add a Job Role",
                "Add an Employee",
                "View All Departments",
                "View All Job Roles",
                "View All Employees",
                "Update an Employee Role",
                //bonus
                "Update an Employee's Manager",
                "View Employees By Manager",
                "Remove Department",
                // "Remove Job Role",
                "Remove Employee",
                // "View total utilized budget of a department"

                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Add a Department":

                    addDepartment();
                    break;
                case "Add a Job Role":

                    addRole();
                    break;
                case "Add an Employee":

                    addEmployee();
                    break;
                case "View All Departments":

                    viewDepartments();
                    break;
                case "View All Job Roles":

                    viewRoles();
                    break;
                case "View All Employees":

                    viewEmployees();
                    break;
                case "Update an Employee Role":

                    updateRole();
                    break;
                case "Update an Employee's Manager":

                    updateManager();
                    break;
                case "View Employees By Manager":

                    viewByManager();
                    break;
                case "Remove Department":

                    deleteDepartment();
                    break;
                // case "Remove Job Role":

                //     deleteRole();
                //     break;
                case "Remove Employee":

                    deleteEmployee();
                    break;
                // case "View total utilized budget of a department":

                //     viewDepartmentBudget();
                //     break;
                case "Exit":

                    connection.end();
                    break;
            }
        });
}

// ADD DATA
function addDepartment() {
    inquirer.prompt({
        name: "departmentName",
        type: "input",
        message: "Enter the name of your new department:"
    })
        .then(function (answer) {
            connection.query("INSERT INTO department (name) VALUES (?)", [answer.departmentName], function (err, res) {
                if (err) throw err;
                console.log("Successfully added a new department!");
                runEmployeeTracker();
            })
        });
}

function addRole() {
    inquirer.prompt([{
        name: "roleName",
        type: "input",
        message: "Enter your new role name:"
    },
    {
        name: "roleSalary",
        type: "input",
        message: "Enter your new role's salary:"
    },
    {
        name: "deptID",
        type: "input",
        message: "Enter department ID:"
    }
    ])
        .then(function (answer) {
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)", [answer.roleName, answer.roleSalary, answer.deptID], function (err, res) {
                if (err) throw err;
                console.table(res);
                console.log("Successfully added a new role!");
                runEmployeeTracker();
            });
        });
}

function addEmployee() {
    inquirer.prompt([{
        name: "firstName",
        type: "input",
        message: "Enter your new employee's first name:"
    },
    {
        name: "lastName",
        type: "input",
        message: "Enter your new employee's last name:"
    },
    {
        name: "roleID",
        type: "input",
        message: "Enter your new employee's role ID:"
    },
    {
        name: "managerID",
        type: "input",
        message: "Enter your new employee's manager ID:"
    }
    ])
        .then(function (answer) {
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [answer.firstName, answer.lastName, answer.roleID, answer.managerID], function (err, res) {
                if (err) throw err;
                console.table(res);
                console.log("Successfully added a new employee!");
                runEmployeeTracker();
            });
        });
}

// VIEW DATA
function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        runEmployeeTracker();
    });
}

function viewRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        runEmployeeTracker();
    });
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        runEmployeeTracker();
    });
}

function viewByManager() {
    inquirer.prompt({
        name: "managerID",
        type: "input",
        message: "Enter the manager ID of the employees you would like to view:"
    })
        .then(function (answer) {
            connection.query("SELECT * FROM employee WHERE manager_id=?", [answer.managerID], function (err, res) {
                if (err) throw err;
                console.table(res);
                runEmployeeTracker();
            });
        });
}

// COULDN'T GET TO THIS FUNCTION YET
// function viewDepartmentBudget() {

// }

// UPDATE DATA
function updateRole() {
    inquirer.prompt([{
        name: "employeeUpdate",
        type: "input",
        message: "Enter the first name of the employee you would like to update:"
    },
    {
        name: "roleUpdate",
        type: "input",
        message: "Enter the updated role:"
    }
    ])
        .then(function (answer) {
            connection.query("UPDATE employee SET role_id=? WHERE first_name=?", [answer.roleUpdate, answer.employeeUpdate], function (err, res) {
                if (err) throw err;
                console.table(res);
                console.log(`Successfully updated ${answer.employeeUpdate}'s role!`);
                runEmployeeTracker();
            });
        });
}

function updateManager() {
    inquirer.prompt([{
        name: "employeeUpdate",
        type: "input",
        message: "Enter the first name of the employee you would like to update:"
    },
    {
        name: "managerUpdate",
        type: "input",
        message: "Enter the updated manager ID:"
    }
    ])
        .then(function (answer) {
            connection.query("UPDATE employee SET manager_id=? WHERE first_name=?", [answer.managerUpdate, answer.employeeUpdate], function (err, res) {
                if (err) throw err;
                console.table(res);
                console.log(`Successfully updated ${answer.employeeUpdate}'s manager!`);
                runEmployeeTracker();
            });
        });
}

// DELETE DATA
function deleteDepartment() {
    inquirer.prompt({
        name: "deptName",
        type: "input",
        message: "Enter Department Name you wish to remove:"
    })
        .then(function (answer) {
            connection.query("DELETE FROM department WHERE name=?", [answer.deptName], function (err, res) {
                if (err) throw err;
                console.log(`Successfully removed department named ${answer.deptName}!`);
                runEmployeeTracker();
            });
        });
}

// ISSUES GETTING THIS TO WORK WITH THE FORIEGN KEYS!
// function deleteRole() {
//     inquirer.prompt({
//         name: "roleName",
//         type: "input",
//         message: "Enter Role you wish to remove:"
//     })
//         .then(function (answer) {
//             connection.query("DELETE FROM role WHERE title=?", [answer.roleName], function (err, res) {
//                 if (err) throw err;
//                 console.log(`Successfully removed role named ${answer.roleName}!`);
//                 runEmployeeTracker();
//             });
//         });
// }

function deleteEmployee() {
    inquirer.prompt({
        name: "employeeID",
        type: "input",
        message: "Enter the ID of the employee you wish to remove:"
    })
        .then(function (answer) {
            connection.query("DELETE FROM employee WHERE id=?", [answer.employeeID], function (err, res) {
                if (err) throw err;
                console.log(`Successfully removed employee with the ID of ${answer.employeeID}!`);
                runEmployeeTracker();
            });
        });
}