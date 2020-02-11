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
          "Update employee department",
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
          viewEmployeeManager();
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

        case "Update employee department":
          updateDepartment();
          break;
        }
    });
}

function viewEmployees(){
  let query = "SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.name, employee_role.salary, employee.manager_id";
  query += " FROM employee_role"; 
  query += " LEFT OUTER JOIN department ON department.id=employee_role.id";
  query += " LEFT OUTER JOIN employee ON employee_role.id=employee.id"; 
  query += " ORDER BY employee.id;";

  connection.query(query, async function(err, res){
      if(err) throw err;
      try{
          console.table(res);
          await runSearch();
      }
      catch(e) {
         console.log(e);
      }
      
  }); 
}

function viewDepartment() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What department would you like to search?",
      choices: [
          "Sales",
          "Engineering",
          "Finance",
          "Legal"
      ]
    })
    .then(function(answer) {
      let depChoice = answer.action;
      let query = "SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.name, employee_role.salary, employee.manager_id"; 
      query += " FROM department";  
      query += " LEFT OUTER JOIN employee_role ON employee_role.id=department.id";
      query += " LEFT OUTER JOIN employee ON employee.id=employee_role.id"; 
      query += " WHERE ?;"      
      
      connection.query(query, { name: depChoice }, async function(err, res) {
          if(err) throw err;
          try{
              console.table(res);
              await runSearch();
          }
          catch(e){
              console.log(e);
          }
        
      });
    });
}

function viewEmployeeManager(){
  let query = "SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.name, employee_role.salary, employee.manager_id"
  query += " FROM employee_role"; 
  query += " LEFT OUTER JOIN department ON department.id=employee_role.id";
  query += " LEFT OUTER JOIN employee ON employee_role.id=employee.id"; 
  query += " ORDER BY id;";

  connection.query(query, async function(err, res){
      if(err) throw err;
      try{
          for (let i = 0; i<res.length; i++){
              managers.push(JSON.stringify(res[i].first_name));
          }
      }
      catch(e) {
         console.log(e);
      }
      
  }); 

}
function addEmployee() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "first_name",
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "last_name",
        },
        {
            type: "list",
            message: "What is the employee's role?",
            choices: employee_role,
            name: "role_id"
        },
        {
            type: "list",
            message: "Who is the employee's manager?",
            choices: manager_id,
            name: "manager_id"
        }
    ]).then(function(answer) {
      let firstName = answer.firstName;
      let lastName = answer.lastName;
      let role_id = answer.role_id;
      let manager_id = answer.manager_id;

      let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id)"; 
      query += ` VALUES ("${firstName}", "${lastName}", ${role_id}, ${manager_id}); `; 
    
          
      
      connection.query(query, async function(err, res) {
          if(err) throw err;
          try{
              await viewEmployees();
          }
          catch(e){
              console.log(e);
          }
        
      });
    });
}


function updateRole() {
  inquirer
    .prompt([
      
      {
      name: "updateRole",
      type: "input",
      message: "Which employee would you like to update?"
      },

      {
      name: "newRole",
      type: "input",
      message: "What is their new role?"
      }
  ])
    .then(function(answer) {
      let updateRole = answer.updateRole;
      let newRole = answer.newRole;
      let query = "UPDATE employee_role";
      query += " LEFT OUTER JOIN department ON department.id=employee_role.id";
      query += " LEFT OUTER JOIN employee ON employee_role.id=employee.id"; 
      query += ` SET title = "${newRole}"`;
      query += ` WHERE first_name = "${updateRole}";`; 
      
      connection.query(query, async function(err, res) {
          if(err) throw err;
          try{
              await viewEmployees();
          }
          catch(e){
              console.log(e);
          }
        
      });
    });
}

function updateManager() {
  inquirer
    .prompt([
      
      {
      name: "updateManager",
      type: "input",
      message: "Which employee would you like to update?"
      },

      {
      name: "newManID",
      type: "input",
      message: "What is their new manager? (Suggestion: view all employees to idenfify the employee ID you would like to use to update the manager)"
      }
  ])
    .then(function(answer) {
      let updateManager = answer.updateManager;
      let newManID = answer.newManID;
      let query = "UPDATE employee";
      query += " LEFT OUTER JOIN employee_role ON employee_role.id=employee.id"; 
      query += " LEFT OUTER JOIN department ON department.id=employee_role.id";
      query += ` SET ManagerID = "${newManID}"`;
      query += ` WHERE first_name = "${updateManager}";`; 
      
      connection.query(query, async function(err, res) {
          if(err) throw err;
          try{
              await viewEmployees();
          }
          catch(e){
              console.log(e);
          }
        
      });
    });
}

function removeEmployee() {
  inquirer
    .prompt(
      
      {
      name: "employeeName",
      type: "input",
      message: "Which employee would you like to remove?"
      }
  )
    .then(function(answer) {
      let employeeName = answer.employeeName;
      let query = "DELETE FROM employee";
      query += ` WHERE first_name = "${employeeName}";`; 
      
      connection.query(query, async function(err, res) {
          if(err) throw err;
          try{
              await viewEmployees();
          }
          catch(e){
              console.log(e);
          }
        
      });
    });
}

function updateDepartment() {
  inquirer
    .prompt([
      
      {
      name: "upDep",
      type: "input",
      message: "Which employee would you like to update?"
      },

      {
      name: "newDep",
      type: "input",
      message: "What is their new department?"
      }
  ])
    .then(function(answer) {
      let upEmp = answer.upEmp;
      let newDep = answer.newDep;
      let query = "UPDATE department";
      query += " LEFT OUTER JOIN roles ON department.id=employee_role.id";
      query += " LEFT OUTER JOIN employee ON employee_role.id=employee.role_id"; 
      query += ` SET dep_name = "${newDep}"`;
      query += ` WHERE first_name = "${upEmp}";`; 
      
      connection.query(query, async function(err, res) {
          if(err) throw err;
          try{
              await viewEmployees();
          }
          catch(e){
              console.log(e);
          }
        
      });
    });
}



  