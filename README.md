<a id="title"></a>
# Employee Tracker


## Table of Contents
- [Title](#title)
- [Description](#description)
- [Badges and Resources Used](#badges)
- [Visuals](#visuals)
- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [Questions](#questions)
- [Future Development](#development)
- [Contributing](#contributing)
- [Authors and Acknowledgment](#acknowledgment)
- [License](#license)
- [Project Status](#status)


<a id="description"></a>
## Description

**USES AND FUNCTIONS**
The Employee Tracker application is a command-line interface (CLI) content management system (CMS) designed to manage and maintain an employee database. It is built using Node.js, Inquirer, and PostgreSQL, allowing users to interact seamlessly with their company's departments, roles, and employees.

**KEY USES:**
   1. Database Management: The application provides an easy way to view, add, and update employee information. It allows companies to track their organizational structure, including which employees belong to which department, their job roles, salaries, and who they report to.

   2. Department and Role Organization: By keeping departments and job roles up-to-date, users can manage the structure of the company, helping with budgeting, promotions, and role allocations within different departments.

   3. Employee Record Keeping: The Employee Tracker allows for centralized management of employee records, which is crucial for both small and large businesses to maintain accurate data.

**CORE FUNCTIONS:**

1. **View All Departments**
   - Lists all departments within the company.
   - Useful for obtaining an overview of how the company is structured by department.

2. **View All Roles:**
   - Displays all available job titles along with their associated salaries and departments.
   - This helps HR departments ensure that roles and salaries are correctly managed.

3. **View All Employees:**
   - Provides a complete list of employees along with their roles and managers.
   - This feature makes it easy to see reporting relationships and overall staffing.

4. **Add a Department:**
   - Allows the user to add a new department to the database.
   - Facilitates company growth by ensuring new departments are properly recorded and tracked.

5. **Add a Role:**
   - Enables the creation of new job roles, including title, salary, and department association.
   - This helps manage organizational changes and ensure every department has the necessary roles.

6. **Add an Employee:**
   - Adds new employees by prompting the user for first name, last name, role, and manager.
   - Ensures that employee records are always up-to-date with new hires.

7. **Update an Employee's Role:**
   - Updates an existing employee's job role to reflect promotions, transfers, or organizational restructuring.
   - This helps keep the database current and ensures accurate reflection of company hierarchy.

This application is designed to be a fast and efficient tool for managing employee records and company structure, allowing for better operational management and decision-making in real-time.


<a id="badges"></a>
## Badges and Resources Used

   [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
   [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
   [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
   [![Inquirer.js](https://img.shields.io/badge/Inquirer.js-000000?style=for-the-badge&logo=inquirer&logoColor=white)](https://www.npmjs.com/package/inquirer)
   [![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
   [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/skylark-shae)
   [![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


<a id="installation"></a>
## Installation
To set up the Employee Tracker application on your local machine, follow these steps:

1. **Clone the Repository**: Use the following command to clone the repository to your local machine.
   ```
   git clone <repository-url>
   ```
You are also welcome to download the original code as a ZIP file.

2. **Navigate to the Project Directory**: Change into the project directory:
   ```
   cd <naviget/to/file/location/skylar-employee-tracker>
   ```

3. **Install Dependencies**: Install the required dependencies using npm:
   ```
   npm install
   ```

4. **Run PostgreSQL in CLI**: Ensure that you have the seeds.sql and schema.sql file in the db folder loaded:
   ```
   psql -U postgres
   postgres> \i schema.sql
   postgres> \i seeds.sql
   postgres> \q
   ```

<a id="usage"></a>
## Usage
To run the Employee Tracker follow the Installation Instruction above then:

1. **Navigate to file location**
   ```
   cd <navigate/to/file/location/skylar-employee-tracker>
   ```

2. **Start Application in CLI**: In your CLI, execute the following command:
   ```
   node index.js
   ```

3. **Follow the Prompts**: The application will prompt you to follow a set of prompts. You can choose from the following options:
      - "View all departments",
      - "View all roles",
      - "View all employees",
      - "View all employees under specified manager",
      - "View all employees in specified department",
      - "View the salary total in a department",
      - "Add a department",
      - "Add a role",
      - "Add an employee",
      - "Update an employee role",
      - "Delete a department",
      - "Delete a role",
      - "Delete an employee",
      - "Exit"

4. Add, remove, and view employees, departments, managers, and roles are all available options.

<a id="Visuals"></a>
## Visuals
[Video Walkthrough Link](https://drive.google.com/file/d/1qJNTB8XETVyZ68BDanbTWcsz2vVJ6gy_/view)

<a id="tests"></a>
## Tests
I ran this code in my terminal with node. Did have issues getting databases loaded. Was able to manually force the <emplyee_db> to load by running PostgreSQL in the command line and manually loading the seeds.sql and schema.sql files.

<a id="questions"></a>
## Questions
If you have any questions about the contents please feel free to reach out!
- Email: [skylarkline16@gmail.com](mailto:skylarkline16@gmail.com)
- GitHub: [skylark-shae](https://github.com/skylark-shae)

<a id="development"></a>
## Future Development
I'd like for it to loop smoothly and be more visually appealing. Also, would like to go through and simplify the code more. Additionally, I would like to be able to find a way to load the seeded databases without <psql -U postgres> then <\i schema.sql> and <\i seeds.sql>. This may have been an issue with my database on my local machine.

<a id="contributing"></a>
## Contributing
Contributions are welcome. If you have contributions you would like to make, please follow these guidelines.

1. **Fork the Repository**: Click "Fork" on the top right corner of the repository page on GitHub.

2. **Make Your Changes**: Implement your changes and commit them with a clear message:
   ```bash
   git checkout -b feature/YourFeature

3. **Make Your Changes**: Implement your changes and commit them with a clear message:
   ```bash
   git commit -m "Add your feature description"

4. **Push to Your Fork**: Push your changes to your forked repository:
   ```bash
   git push origin feature/YourFeature

5. **Submit a Pull Request**: Navigate to the original repository and submit a pull request with a description of your changes.

<a id="acknowledgment"></a>
## Authors and Acknowledgment
I wrote this code from scratch by reviewing data given in <10-SQL\01-Activities> .

<a id="license"></a>
## License
MIT License © 2024 Skylark
Please refer to this link, [License: MIT](https://opensource.org/licenses/MIT) for more information.

  ![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)  

<a id="status"></a>
## Project Status
In progress

[back to top](#title)


