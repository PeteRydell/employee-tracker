DROP DATABASE IF EXISTS employees_DB;
CREATE database employees_DB;

USE employees_DB;

CREATE TABLE department (
  id int AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (position)
);

CREATE TABLE employee_role (
  id int AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL
  PRIMARY KEY (position)
);

CREATE TABLE employee (
  id int AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL
  manager_id INT NULL
  PRIMARY KEY (position)
);

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Salesperson", 80000, 1);

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Accountant", 125000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Shane", "Falco", 4, 0);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Francisco", "Lindor", 1, 0);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Woody", "Harrelson", 2, 0);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Pekka", "Rinne", 5, 0);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andre", "Giant", 6, 0);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Baby", "Yoda", 7, 0);