const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choice = require("inquirer/lib/objects/choice");


// const writeFile = util.promisify(fs.writeFile);


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employees = [];

startUp();

function startUp() {
    inquirer
        .prompt([
            {
                name: 'name',
                type: 'input',
                message: 'What is this Managers name? \n'
            },
            {
                name: 'id',
                type: 'input',
                message: 'What is this Managers ID? \n'
            },
            {
                name: 'email',
                type: 'input',
                message: 'What is this Managers email? \n'
            },
            {
                name: 'officeNumber',
                type: 'input',
                message: 'What is this Managers Office Number? \n'
            }
        ])
        .then(function (answers) {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            employees.push(manager);
            //console.log(employees);
            generateNewEmployee();
        })
}

function generateNewEmployee() {
    inquirer
        .prompt([
            {
                name: 'role',
                type: 'list',
                message: 'Select the role for the Employee:',
                choices: [
                    "Manager",
                    "Engineer",
                    "Inturn",
                    "None"
                ]
            }
        ])
    .then(function (answers) {
        if (answers.role === "Manager") {
            startUp();
        } else if (answers.role === "Engineer") {
            generateEngineer();

        } else if (answers.role === "Inturn") {
            generateInturn();
        } else  {
            console.log("All Team Members Entered. Now generating roster!");
            let data = render(employees);
            fs.writeFile(outputPath, data, (err) => {
                if (err) throw err;
            })
            }
        }
    )
}

function generateEngineer() {
    inquirer
        .prompt([
            {
                name: 'name',
                type: 'input',
                message: 'What is this Engineers name? \n'
            },
            {
                name: 'id',
                type: 'input',
                message: 'What is this Engineers ID? \n'
            },
            {
                name: 'email',
                type: 'input',
                message: 'What is this Engineers email? \n'
            },
            {
                name: 'github',
                type: 'input',
                message: 'What is this Engineers Github? \n'
            }
        ])
        .then(function (answers) {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            employees.push(engineer);
            //console.log(employees);
            generateNewEmployee();
        })
}

function generateInturn() {
    inquirer
        .prompt([
            {
                name: 'name',
                type: 'input',
                message: 'What is this Inturns name? \n'
            },
            {
                name: 'id',
                type: 'input',
                message: 'What is this Inturns ID? \n'
            },
            {
                name: 'email',
                type: 'input',
                message: 'What is this Inturns email? \n'
            },
            {
                name: 'school',
                type: 'input',
                message: 'What is this Interns School? \n'
            }
        ])
        .then(function (answers) {
            const inturn = new Intern(answers.name, answers.id, answers.email, answers.school);
            employees.push(inturn);
            //console.log(employees);
            generateNewEmployee();
        
        })
}
