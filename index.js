// import dependencies 
var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

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
                "Remove Job Role",
                "Remove Employee",
                "View utilized budget of a department",

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
                case "Remove Job Role":

                    deleteRole();
                    break;
                case "Remove Employee":

                    deleteEmployee();
                    break;
                case "View utilized budget of a department":

                    viewByDeptBudget();
                    break;
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
        consoleTable(res);
        runEmployeeTracker();
    });
}

function viewRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        consoleTable(res);
        runEmployeeTracker();
    });
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        consoleTable(res);
        runEmployeeTracker();
    });
}

function viewByManager() {

}

function viewByDeptBudget() {

}

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
            connection.query("UPDATE employee SET role_id=? WHERE first_name=?", [answer.updateRole, answer.employeeUpdate], function (err, res) {
                if (err) throw err;
                consoleTable(res);
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
                consoleTable(res);
                console.log(`Successfully updated ${answer.employeeUpdate}'s manager!`);
                runEmployeeTracker();
            });
        });
}

// DELETE DATA
function deleteDepartment() {
    inquirer.prompt({
        name: "deleteDepartment",
        type: "input",
        message: "Enter Department Name you wish to remove:"
    })
        .then(function (answer) {
            connection.query("DELETE FROM department WHERE name=?", [answer.deleteDepartment], function (err, res) {
                if (err) throw err;
                console.log(`Successfully removed department named ${deleteDepartment}!`);
                runEmployeeTracker();
            });
        });
}

function deleteRole() {
    inquirer.prompt({
        name: "deleteRole",
        type: "input",
        message: "Enter Role you wish to remove:"
    })
        .then(function (answer) {
            connection.query("DELETE FROM role WHERE title=?", [answer.deleteRole], function (err, res) {
                if (err) throw err;
                console.log(`Successfully removed role named ${deleteRole}!`);
                runEmployeeTracker();
            });
        });
}

function deleteEmployee() {
    inquirer.prompt({
        name: "deleteEmployee",
        type: "input",
        message: "Enter the ID of the employee you wish to remove:"
    })
        .then(function (answer) {
            connection.query("DELETE FROM employee WHERE id=?", [answer.deleteEmployee], function (err, res) {
                if (err) throw err;
                console.log(`Successfully removed employee named ${deleteEmployee}!`);
                runEmployeeTracker();
            });
        });
}