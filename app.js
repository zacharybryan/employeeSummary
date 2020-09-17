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
            console.log(employees);
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

        // async function generateHtml() {
//     try {
//         const html = render(employees);
//         await fs.writeFileAsync(outputPath, html);
//         console.log("Successfully written HTML page!")
//     } catch (err) {
//         console.log(err);
//     }
// }


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
            }
        ])
        .then(function (answers) {
            const engineer = new Engineer(answers.name, answers.id, answers.email);
            employees.push(engineer);
            console.log(employees);
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
            }
        ])
        .then(function (answers) {
            const inturn = new Intern(answers.name, answers.id, answers.email);
            employees.push(inturn);
            console.log(employees);
            generateNewEmployee();
        
        })
}

// async function generateHtml() {
//     try {
//         const html = render(employees);
//         await fs.writeFileAsync(outputPath, html);
//         console.log("Successfully written HTML page!")
//     } catch (err) {
//         console.log(err);
//     }
// }


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
