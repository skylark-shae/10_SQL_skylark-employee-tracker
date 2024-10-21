const inquirer = require("inquirer");
const { 
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
  updateEmployeeRole // TESTING -- Update an employee role --
} = require('./assets/db-functions');

const userPrompt = [
  {
    type: "list",
    message: '\nPlease choose from the following to access and edit the database.',
    name: "userChoice",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "View all employees under specified manager",
      "View all employees in specified department",
      "View the salary total in a department",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Delete a department",
      "Delete a role",
      "Delete an employee",
      "Exit"
    ]
  }
];

// Async function to handle user choices
async function handleUserChoice(userInput) {
  try {
    switch (userInput.userChoice) {
      case "View all departments":
        await departments();
        break;
      case "View all roles":
        await roles();
        break;
      case "View all employees":
        await employees();
        break;
      case "View all employees under specified manager":
        await managerEmployees();
        break;
      case "View all employees in specified department":
        await deptEmployees();
        break;
      case "View the salary total in a department":
        await departmentSalaryTotal();
        break;
      case "Add a department":
        await addDepartment();
        break;
      case "Add a role":
        await addRole();
        break;
      case "Add an employee":
        await addEmployee();
        break;
      case "Update an employee role":
        await updateEmployeeRole();
        break;
      case "Delete a department":
        await deleteDepartment();
        break;
      case "Delete a role":
        await deleteRole();
        break;
      case "Delete an employee":
        await deleteEmployee();
        break;
      case "Exit":
        console.log("Exiting application...");
        process.exit(0); // Exit the process
      default:
        console.log("Invalid choice");
        break;
    }
    // After handling the choice, prompt the user again unless they chose Exit
    await init();
  } catch (error) {
    console.error('Error handling user choice:', error);
  }
}

// Initialization function with async user input
async function init() {
  try {
    const userInput = await inquirer.prompt(userPrompt);
    await handleUserChoice(userInput);
  } catch (error) {
    console.error('Error initializing application:', error);
  }
}

// Start the application
init();

module.exports = { init };
