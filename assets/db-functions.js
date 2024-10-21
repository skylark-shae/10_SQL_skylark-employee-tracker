const inquirer = require("inquirer");
const Table = require('cli-table');
const { Pool } = require('pg');

const pool = new Pool(
  {
    user: 'postgres',
    host: 'localhost',
    database: 'employee_db',
    password: 'SkKl!@0666',
    port: 5432,
  },
  console.log('You have entered the employee database.')
);

async function departments() {
  const getSql = `SELECT department.dept_name AS "Department", 
  id AS "Department ID" 
  FROM department 
  ORDER BY department.dept_name`;

  try {
    const result = await pool.query(getSql);
    const table = new Table({
      head: ['Department', 'Department ID']
    });

    result.rows.forEach(row => {
      table.push([row['Department'], row['Department ID']]);
    });
    console.log(table.toString());
  } catch (err) {
    console.error('Having this issue: ', err);
  }
}

async function deleteDepartment() {
  await departments();
  const userResponse = await inquirer.prompt({
    type: "input",
    message: "Please enter an ID number of what department you would like to delete.",
    name: "deleteId"
  });

  const deleteSql = `DELETE FROM department WHERE id = $1`;
  try {
    await pool.query(deleteSql, [userResponse.deleteId]);
    console.log('Department deleted successfully.');
  } catch (err) {
    console.error('Error deleting department:', err);
  }
}

async function roles() {
  const getSql = `SELECT role.title AS "Title", 
  role.id AS "Title ID", 
  department.dept_name AS "Department", 
  role.salary AS "Salary" 
  FROM role 
  LEFT JOIN department ON department.id = role.dept_id 
  ORDER BY department.dept_name ASC`;

  try {
    const result = await pool.query(getSql);
    const table = new Table({
      head: ['Title', 'Title ID', 'Department', 'Salary']
    });

    result.rows.forEach(row => {
      table.push([row['Title'], row['Title ID'], row['Department'], row['Salary']]);
    });
    console.log(table.toString());
  } catch (err) {
    console.error('Having this issue: ', err);
  }
}

async function deleteRole() {
  await roles();
  const userResponse = await inquirer.prompt({
    type: "input",
    message: "Please enter an ID number of the role you would like to delete.",
    name: "deleteId"
  });

  const deleteSql = `DELETE FROM role WHERE id = $1`;
  try {
    await pool.query(deleteSql, [userResponse.deleteId]);
    console.log('Role deleted successfully.');
  } catch (err) {
    console.error('Error deleting role:', err);
  }
}

async function employees() {
  const getSql = `SELECT employee.id AS "Employee ID", 
  employee.first_name AS "First Name", 
  employee.last_name AS "Last Name", 
  department.dept_name AS "Department", 
  role.title AS "Title", 
  role.salary AS "Salary", 
  CONCAT(manager.first_name, ' ', manager.last_name) AS "Manager Name" 
  FROM employee 
  LEFT JOIN role ON role.id = employee.role_id 
  LEFT JOIN department ON department.id = role.dept_id 
  LEFT JOIN employee manager ON manager.id = employee.manager_id 
  ORDER BY department.dept_name ASC, employee.last_name ASC`;

  try {
    const result = await pool.query(getSql);
    const table = new Table({
      head: ['Employee ID', 'First Name', 'Last Name', 'Department', 'Title', 'Salary', 'Manager Name']
    });

    result.rows.forEach(row => {
      const managerName = row['Manager Name'] ? row['Manager Name'] : '';
      table.push([row['Employee ID'], row['First Name'], row['Last Name'], row['Department'], row['Title'], row['Salary'], managerName]);
    });
    console.log(table.toString());
  } catch (err) {
    console.error('Having this issue: ', err);
  }
}

async function deleteEmployee() {
  await employees();
  const userResponse = await inquirer.prompt({
    type: "input",
    message: "Please enter an ID number of the employee you would like to delete.",
    name: "deleteId"
  });

  const deleteSql = `DELETE FROM employee WHERE id = $1`;
  try {
    await pool.query(deleteSql, [userResponse.deleteId]);
    console.log('Employee deleted successfully.');
  } catch (err) {
    console.error('Error deleting employee:', err);
  }
}

async function managerEmployees() {
  const getManagerSql = `SELECT employee.id AS "Manager ID",
  CONCAT(employee.first_name, ' ', employee.last_name) AS "Manager Name"
  FROM employee
  WHERE employee.id IN (SELECT DISTINCT manager_id FROM employee)`;

  try {
    const managerResult = await pool.query(getManagerSql);
    const managers = managerResult.rows.map(row => ({ name: row['Manager Name'], value: row['Manager ID'] }));

    const selectManager = [
      {
        type: "list",
        message: "Please choose a manager to see their employees.",
        name: "managerId",
        choices: managers
      }
    ];
    
    const chosenManager = await inquirer.prompt(selectManager);
    const employeesByManager = chosenManager.managerId;
    const getEmplSql = `SELECT employee.id AS "Employee ID", 
    employee.first_name AS "First Name", 
    employee.last_name AS "Last Name", 
    department.dept_name AS "Department", 
    role.title AS "Title", 
    role.salary AS "Salary"
    FROM employee 
    LEFT JOIN role ON role.id = employee.role_id 
    LEFT JOIN department ON department.id = role.dept_id 
    WHERE employee.manager_id = $1
    ORDER BY employee.last_name ASC`;

    const emplResult = await pool.query(getEmplSql, [employeesByManager]);
    const table = new Table({
      head: ['Employee ID', 'First Name', 'Last Name', 'Department', 'Title', 'Salary']
    });

    emplResult.rows.forEach(row => {
      table.push([row['Employee ID'], row['First Name'], row['Last Name'], row['Department'], row['Title'], row['Salary']]);
    });
    console.log(table.toString());
  } catch (err) {
    console.error('Having this issue: ', err);
  }
}

async function deptEmployees() {
  const getDeptSql = `SELECT department.dept_name AS "Department", 
  id AS "Department ID" 
  FROM department 
  ORDER BY department.dept_name`;
  const getEmplSql = `SELECT employee.id AS "Employee ID", 
  employee.first_name AS "First Name", 
  employee.last_name AS "Last Name", 
  department.dept_name AS "Department", 
  role.title AS "Title", 
  role.salary AS "Salary", 
  CONCAT(manager.first_name, ' ', manager.last_name) AS "Manager Name" 
  FROM employee 
  LEFT JOIN role ON role.id = employee.role_id 
  LEFT JOIN department ON department.id = role.dept_id 
  LEFT JOIN employee manager ON manager.id = employee.manager_id 
  ORDER BY department.dept_name ASC, employee.last_name ASC`;

  try {
    const deptResult = await pool.query(getDeptSql);
    const allDept = deptResult.rows.map(row => row.Department);

    const viewByDept = [
      {
        type: "list",
        message: "Please choose the department you'd like to see.",
        name: "deptName",
        choices: allDept
      }
    ];

    const emplResult = await pool.query(getEmplSql);
    const chosenDept = await inquirer.prompt(viewByDept);
    const employeesInDept = emplResult.rows.filter(row => row.Department === chosenDept.deptName);

    const table = new Table({
      head: ['Employee ID', 'First Name', 'Last Name', 'Department', 'Title', 'Salary', 'Manager Name']
    });
    
    employeesInDept.forEach(row => {
      const managerName = row['Manager Name'] ? row['Manager Name'] : '';
      table.push([row['Employee ID'], row['First Name'], row['Last Name'], row['Department'], row['Title'], row['Salary'], managerName]);
    });
    console.log(table.toString());
  } catch (err) {
    console.error('Having this issue: ', err);
  }
}

async function departmentSalaryTotal() {
  const getDeptSql = `SELECT department.dept_name AS "Department", 
  id AS "Department ID" 
  FROM department 
  ORDER BY department.dept_name`;
  const getEmplSql = `SELECT employee.id AS "Employee ID", 
  employee.first_name AS "First Name", 
  employee.last_name AS "Last Name", 
  department.dept_name AS "Department", 
  role.title AS "Title", 
  role.salary AS "Salary", 
  CONCAT(manager.first_name, ' ', manager.last_name) AS "Manager Name" 
  FROM employee 
  LEFT JOIN role ON role.id = employee.role_id 
  LEFT JOIN department ON department.id = role.dept_id 
  LEFT JOIN employee manager ON manager.id = employee.manager_id 
  ORDER BY department.dept_name ASC, employee.last_name ASC`;

  try {
    const deptResult = await pool.query(getDeptSql);
    const allDept = deptResult.rows.map(row => row.Department);

    const viewByDept = [
      {
        type: "list",
        message: "Please choose the department you'd like to see the total salary for.",
        name: "deptName",
        choices: allDept
      }
    ];

    const chosenDept = await inquirer.prompt(viewByDept);
    const employees = await pool.query(getEmplSql);
    const filteredEmpl = employees.rows.filter(row => row.Department === chosenDept.deptName);
    
    const totalSalary = filteredEmpl.reduce((total, row) => total + row.Salary, 0);
    console.log(`Total salary for ${chosenDept.deptName}: $${totalSalary}`);
  } catch (err) {
    console.error('Having this issue: ', err);
  }
}

async function addDepartment() {
  const userResponse = await inquirer.prompt({
    type: "input",
    message: "Please enter a new department name.",
    name: "deptName"
  });

  const insertSql = `INSERT INTO department (dept_name) VALUES ($1) RETURNING id`;
  try {
    const result = await pool.query(insertSql, [userResponse.deptName]);
    console.log(`Department '${userResponse.deptName}' added with ID: ${result.rows[0].id}`);
  } catch (err) {
    console.error('Error adding department:', err);
  }
}

async function addRole() {
  const departmentsResult = await pool.query('SELECT * FROM department');
  const departments = departmentsResult.rows.map(row => ({ name: row.dept_name, value: row.id }));

  const userResponse = await inquirer.prompt([
    {
      type: "input",
      message: "Please enter the title for the new role.",
      name: "roleTitle"
    },
    {
      type: "input",
      message: "Please enter the salary for the new role.",
      name: "roleSalary"
    },
    {
      type: "list",
      message: "Please choose the department for this role.",
      name: "roleDepartment",
      choices: departments
    }
  ]);

  const insertSql = `INSERT INTO role (title, salary, dept_id) VALUES ($1, $2, $3) RETURNING id`;
  try {
    const result = await pool.query(insertSql, [userResponse.roleTitle, userResponse.roleSalary, userResponse.roleDepartment]);
    console.log(`Role '${userResponse.roleTitle}' added with ID: ${result.rows[0].id}`);
  } catch (err) {
    console.error('Error adding role:', err);
  }
}

async function addEmployee() {
  try {
    // Fetching roles from the database
    const rolesResult = await pool.query('SELECT * FROM role');
    const roles = rolesResult.rows.map(row => ({ name: row.title, value: row.id }));

    // Debugging: Log the fetched roles to ensure they are being retrieved correctly
    console.log("Fetched roles:", roles);

    // Fetching employees from the database
    const employeesResult = await pool.query('SELECT * FROM employee');
    const employees = employeesResult.rows.map(row => ({ name: `${row.first_name} ${row.last_name}`, value: row.id }));

    // Prompting user for employee details
    const userResponse = await inquirer.prompt([
      {
        type: "input",
        message: "Please enter the employee's first name.",
        name: "firstName"
      },
      {
        type: "input",
        message: "Please enter the employee's last name.",
        name: "lastName"
      },
      {
        type: "list",
        message: "Please choose the role for this employee.",
        name: "roleId",
        choices: roles.length ? roles : [{ name: "No roles available", value: null }] // Fallback if no roles exist
      },
      {
        type: "list",
        message: "Please choose the manager for this employee.",
        name: "managerId",
        choices: employees.length ? employees : [{ name: "No managers available", value: null }] // Fallback if no managers exist
      }
    ]);

    // Inserting the new employee into the database
    const insertSql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING id`;
    const result = await pool.query(insertSql, [userResponse.firstName, userResponse.lastName, userResponse.roleId, userResponse.managerId]);
    console.log(`Employee '${userResponse.firstName} ${userResponse.lastName}' added with ID: ${result.rows[0].id}`);
  } catch (err) {
    console.error('Error adding employee:', err);
  }
}

//TESTING TO SEE IF THIS WORKS
// Update an employee role
async function updateEmployeeRole() {
  // Fetch existing employees
  const employeesResult = await pool.query('SELECT id, first_name, last_name FROM employee');
  const employees = employeesResult.rows.map(row => ({
    name: `${row.first_name} ${row.last_name}`,
    value: row.id
  }));

  // Fetch existing roles
  const rolesResult = await pool.query('SELECT id, title FROM role');
  const roles = rolesResult.rows.map(row => ({
    name: row.title,
    value: row.id
  }));

  // Prompt user for employee and new role
  const userResponse = await inquirer.prompt([
    {
      type: "list",
      message: "Please choose an employee to update their role.",
      name: "employeeId",
      choices: employees
    },
    {
      type: "list",
      message: "Please choose a new role for the employee.",
      name: "roleId",
      choices: roles
    }
  ]);

  // Update employee role in the database
  const updateSql = `UPDATE employee SET role_id = $1 WHERE id = $2`;
  try {
    await pool.query(updateSql, [userResponse.roleId, userResponse.employeeId]);
    console.log('Employee role updated successfully.');
  } catch (err) {
    console.error('Error updating employee role:', err);
  }
}

module.exports = {
  departments,
  deleteDepartment,
  roles,
  deleteRole,
  employees,
  deleteEmployee,
  managerEmployees,
  deptEmployees,
  departmentSalaryTotal,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole, //TESTING TO SEE IF THIS WORKS
};
