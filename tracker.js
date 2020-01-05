var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");
var data = "employee_DB"

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employees_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

console.table(data);

function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View all employees by department",
          "View all employees by manager",
          "Add employee",
          "Remove employee",
          "Update employee role",
          "Update employee manager",
          "View all roles",
          "Add role",
          "Remove role"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View all employees":
          viewEmployees();
          break;
  
        case "View all employees by department":
          viewDepartment();
          break;
  
        case "View all employees by manager":
          viewManager();
          break;
  
        case "Add employee":
          addEmployee();
          break;
  
        case "Remove employee":
          removeEmployee();
          break;

        case "Update employee role":
          updateRole();
          break;

        case "Update employee manager":
          updateManager();
          break;

        case "View all roles":
          viewRoles();
          break;
          
        case "Add role":
          addRole();
          break;

        case "Remove role":
          removeRole();
          break;
        }
    });
}

function viewEmployees() {
    // inquirer
    //   .prompt({
    //     name: "artist",
    //     type: "input",
    //     message: "What artist would you like to search for?"
    //   })
    //   .then(function(answer) {
    //     var query = "SELECT position, song, year FROM top5000 WHERE ?";
    //     connection.query(query, { artist: answer.artist }, function(err, res) {
    //       for (var i = 0; i < res.length; i++) {
    //         console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
    //       }
    //       runSearch();
    //     });
    //   });
  }


function viewDepartment() {
    // inquirer
    //   .prompt({
    //     name: "artist",
    //     type: "input",
    //     message: "What artist would you like to search for?"
    //   })
    //   .then(function(answer) {
    //     var query = "SELECT position, song, year FROM top5000 WHERE ?";
    //     connection.query(query, { artist: answer.artist }, function(err, res) {
    //       for (var i = 0; i < res.length; i++) {
    //         console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
    //       }
    //       runSearch();
    //     });
    //   });
  }

function viewManager() {
    // inquirer
    //   .prompt({
    //     name: "artist",
    //     type: "input",
    //     message: "What artist would you like to search for?"
    //   })
    //   .then(function(answer) {
    //     var query = "SELECT position, song, year FROM top5000 WHERE ?";
    //     connection.query(query, { artist: answer.artist }, function(err, res) {
    //       for (var i = 0; i < res.length; i++) {
    //         console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
    //       }
    //       runSearch();
    //     });
    //   });
  }

function addEmployee() {
    // inquirer
    //   .prompt({
    //     name: "artist",
    //     type: "input",
    //     message: "What artist would you like to search for?"
    //   })
    //   .then(function(answer) {
    //     var query = "SELECT position, song, year FROM top5000 WHERE ?";
    //     connection.query(query, { artist: answer.artist }, function(err, res) {
    //       for (var i = 0; i < res.length; i++) {
    //         console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
    //       }
    //       runSearch();
    //     });
    //   });
  }

function removeEmployee() {
    // inquirer
    //   .prompt({
    //     name: "artist",
    //     type: "input",
    //     message: "What artist would you like to search for?"
    //   })
    //   .then(function(answer) {
    //     var query = "SELECT position, song, year FROM top5000 WHERE ?";
    //     connection.query(query, { artist: answer.artist }, function(err, res) {
    //       for (var i = 0; i < res.length; i++) {
    //         console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
    //       }
    //       runSearch();
    //     });
    //   });
  }

function updateRole() {
    // inquirer
    //   .prompt({
    //     name: "artist",
    //     type: "input",
    //     message: "What artist would you like to search for?"
    //   })
    //   .then(function(answer) {
    //     var query = "SELECT position, song, year FROM top5000 WHERE ?";
    //     connection.query(query, { artist: answer.artist }, function(err, res) {
    //       for (var i = 0; i < res.length; i++) {
    //         console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
    //       }
    //       runSearch();
    //     });
    //   });
  }

function updateManager() {
    // inquirer
    //   .prompt({
    //     name: "artist",
    //     type: "input",
    //     message: "What artist would you like to search for?"
    //   })
    //   .then(function(answer) {
    //     var query = "SELECT position, song, year FROM top5000 WHERE ?";
    //     connection.query(query, { artist: answer.artist }, function(err, res) {
    //       for (var i = 0; i < res.length; i++) {
    //         console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
    //       }
    //       runSearch();
    //     });
    //   });
  }

function viewRoles() {
    // inquirer
    //   .prompt({
    //     name: "artist",
    //     type: "input",
    //     message: "What artist would you like to search for?"
    //   })
    //   .then(function(answer) {
    //     var query = "SELECT position, song, year FROM top5000 WHERE ?";
    //     connection.query(query, { artist: answer.artist }, function(err, res) {
    //       for (var i = 0; i < res.length; i++) {
    //         console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
    //       }
    //       runSearch();
    //     });
    //   });
  }

function addRole() {
    // inquirer
    //   .prompt({
    //     name: "artist",
    //     type: "input",
    //     message: "What artist would you like to search for?"
    //   })
    //   .then(function(answer) {
    //     var query = "SELECT position, song, year FROM top5000 WHERE ?";
    //     connection.query(query, { artist: answer.artist }, function(err, res) {
    //       for (var i = 0; i < res.length; i++) {
    //         console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
    //       }
    //       runSearch();
    //     });
    //   });
  }

function removeRole() {
    // inquirer
    //   .prompt({
    //     name: "artist",
    //     type: "input",
    //     message: "What artist would you like to search for?"
    //   })
    //   .then(function(answer) {
    //     var query = "SELECT position, song, year FROM top5000 WHERE ?";
    //     connection.query(query, { artist: answer.artist }, function(err, res) {
    //       for (var i = 0; i < res.length; i++) {
    //         console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
    //       }
    //       runSearch();
    //     });
    //   });
  }


  