-- View all departments
SELECT * FROM department;

-- View all roles with job title, role ID, department, and salary
SELECT role.id, role.title, role.salary, department.dept_name 
FROM role 
JOIN department ON role.dept_id = department.id;

-- View all employees with detailed info
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.dept_name, role.salary, 
COALESCE(manager.first_name || ' ' || manager.last_name, 'No Manager') AS manager
FROM employee 
JOIN role ON employee.role_id = role.id 
JOIN department ON role.dept_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id;

-- Add a department
INSERT INTO department (dept_name) VALUES ($1);

-- Add a role
INSERT INTO role (title, salary, dept_id) VALUES ($1, $2, $3);

-- Add an employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);

-- Update an employee's role
UPDATE employee SET role_id = $1 WHERE id = $2;
