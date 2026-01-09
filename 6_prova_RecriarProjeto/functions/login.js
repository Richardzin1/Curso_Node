import inquirer from "inquirer";
import fs from "fs";

// importa de validate login
import { promptUser, GetPasswordUser, GetUsername } from "./validateLogin.js";
import { loginFeatures } from "./loginFuncionalidades.js";
import chalk from "chalk";

async function login(next) {
  try {
    let { User } = await inquirer.prompt([
      {
        name: "User",
        message: "Digite Seu usuário",
        validate: promptUser,
      },
    ]);

    //--------------------------------

Password()

    async function Password() {
      try {
        const answer = await inquirer.prompt([
          {
            name: "password",
            message: "Digite sua Senha",
          },
        ]);

        let PasswordPrompt= answer.password;

        let passwordUser = await GetPasswordUser(User);
        let nameUser = await GetUsername(User)


        if (PasswordPrompt === passwordUser) {
          console.log(chalk.gray.bold(`Seja Bem vindo  ${chalk.blue.bold(nameUser)}`) )
          return loginFeatures(nameUser)
        } else {
          console.log(chalk.bgRed.black("Senha errada!"));
          return Password()
        }
      } catch (err) {
        console.error(err);
      }
    }

    // console.log(`seu usuario é : ${usuario}, Sua senha é ${senha}, Senha Resgatada: ${senhaResgatada}`);
  } catch (err) {
    console.error(`Erro: ${err}`);
  }
}

export { login };
