// Modulos externos
import chalk from "chalk";
import inquirer from "inquirer";

// Modulos interno
import fs, { mkdir } from "fs";

// functions imports
import { CreateAccount } from "./functions/listFunctions.js";
import {login} from  "./functions/login.js"

//---------------------------------------------------------------------------------------------------------------------------------------//

// verificar se existe os diretorios!
if (!fs.existsSync("./database")) {
  fs.mkdirSync("./database");
}
if (!fs.existsSync("./database/AccountsUsers")) {
  fs.mkdirSync("./database/AccountsUsers");
}
if (!fs.existsSync("./database/AutenticateUsers")) {
  fs.mkdirSync("./database/AutenticateUsers");
}

//---------------------------------------------------------------------------------------------------------------------------------------//

// start app
account();

function account() {
  inquirer
    .prompt([
      {
        type: "rawlist",
        name: "action",
        message: chalk.gray.bold("Seja Bem vindo " + chalk.blue("Account")),
        choices: ["Login", "Create Account", "Exit"],
      },
    ])
    .then((answer) => {
      const action = answer.action;

      if (action === "Create Account") {
        console.log(chalk.bgGreen.black("Create Account"))
        return CreateAccount(account); // PASSA O LOOP
      }

      else if(action === "Login"){
        login()
      }
      else if(action === "Exit"){
        console.log(chalk.bgBlue.black("Obrigado por usar o Account! Até logo."))
      }
    })
    .catch(console.log);
}

//---------------------------------------------------------------------------------------------------------------------------------------//