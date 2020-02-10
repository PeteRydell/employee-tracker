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
        type: "list",
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

function viewEmployees(){
  let query = "SELECT employee.EmployeeID, employee.first_name, employee.last_name, roles.title, department.dep_name, roles.salary, employee.ManagerID";
  query += " FROM roles"; 
  query += " LEFT OUTER JOIN department ON department.DepartmentID=roles.DepartmentID";
  query += " LEFT OUTER JOIN employee ON roles.RoleID=employee.RoleID"; 
  query += " ORDER BY EmployeeID;";

  connection.query(query, async function(err, res){
      if(err) throw err;
      try{
          console.table(res);
          await runTool();
      }
      catch(e) {
         console.log(e);
      }
      
  }); 
}

function allEmpDep() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What department would you like to search?",
      choices: [
          "Sales",
          "Legal",
          "Engineering",
          "Finance"
      ]
    })
    .then(function(answer) {
      let depChoice = answer.action;
      let query = "SELECT employee.EmployeeID, employee.first_name, employee.last_name, roles.title, department.dep_name, roles.salary, employee.ManagerID"; 
      query += " FROM department";  
      query += " LEFT OUTER JOIN roles ON roles.DepartmentID=department.DepartmentID";
      query += " LEFT OUTER JOIN employee ON employee.RoleID=roles.RoleID"; 
      query += " WHERE ?;"      
      
      connection.query(query, { dep_name: depChoice }, async function(err, res) {
          if(err) throw err;
          try{
              console.table(res);
              await runTool();
          }
          catch(e){
              console.log(e);
          }
        
      });
    });
}

function addEmployee() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "first_name",
            validate: function validateFirst(name) {
                return name !== '';
            }
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "last_name",
            validate: function validateLast(name) {
                return name !== '';
            }
        },
        {
            type: "list",
            message: "What is the employee's role?",
            choices: roles,
            name: "role_id"
        },
        {
            type: "list",
            message: "Who is the employee's manager?",
            choices: manager_id,
            name: "manager_id"
        }
    ]).then(function ({ first_name, last_name, role_id, manager_id }) {

        var queryString = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', ${role_id}, ${manager_id})`;
        connection.query(queryString, function (err, result) {
            if (err) throw err;
            console.log(result);
            viewAllEmployees();
            promptUser();
        });
    })
}


function viewRoles() {
  var queryString = "SELECT roles.title as position, roles.salary, department.name FROM roles LEFT JOIN department on roles.id = department.id";
  connection.query(queryString, function (err, result) {
      if (err) throw err;
      console.table(result);
      promptUser();
  });
};

function addRole() {
    
  inquirer.prompt([
      {
          type: "input",
          message: "What is the name of the role?",
          name: "title",
          validate: function validateTitle(name) {
              return name !== '';
          }
      },
      {
          type: "input",
          message: "What is the salary of the role?",
          name: "salary",
          validate: function validateSalary(name) {
              return name !== '';
          }
      },
      {
          type: "list",
          message: "Which department does this role belong to? (1-sales, 2-engineering, 3-finance, 4-legal)",
          choices: ["sales", "legal", "engineering"],
          name: "department_id",

      }
  ]).then(function ({ title, salary, department_id }) {
      if (department_id === "sales"){
          department_id = 1
      } else if (department_id === "engineering"){
          department_id = 2
      } else if (department_id === "finance"){
          department_id = 3
      } else if (department_id === "legal"){
        department_id = 4
      }
      var queryString = `INSERT INTO roles (title, salary, department_id) VALUES ('${title}', ${salary}, ${department_id})`;
      connection.query(queryString, function (err, result) {
          if (err) throw err;
          console.log(result);
          viewAllRoles();
          promptUser();
      })
  })
}

function viewDepartment() {
  var queryString = "SELECT * FROM department";
  connection.query(queryString, function (err, result) {
      if (err) throw err;
      console.table(result);
      promptUser();
  });
};



  