import inquirer from "inquirer";
import fs from "fs";

// exportar functions de validações
import {
  promptValidateName,
  promptValidateNumber,
  validateDateOfBirth,
  promptValidateUsers,
  promptValidarPassword,
  checkAccount,
} from "./validateFunctions.js";
import chalk from "chalk";
//---------------------------------------------------------------------------------------------------------------------------------------//

// 1 - Fluxo de pergunta Principal
function CreateAccount(next) {
  inquirer
    .prompt([
      {
        name: "FullName",
        message: "Digite Seu Nome Completo!",
        validate: promptValidateName,
      },
    ])
    .then((answer) => {
      let FullName = answer.FullName;
      let AccountExist = checkAccount(FullName)
      if (AccountExist) {
        console.log(chalk.bgRed.black("Esse Nome já esta em uso!"));
        return CreateAccount();
      }
      CreateCPF(answer.FullName, next);
    })
    .catch((err) => console.log(err));
}
//---------------------------------------------------------------------------------------------------------------------------------------//

// 2 - Fluxo de pergunta function para Criar cpf
function CreateCPF(FullName, next) {
  inquirer
    .prompt([
      {
        name: "cpf",
        message: "Digite Seu CPF !",
        validate: promptValidateNumber,
      },
    ])
    .then((answer) => {
      CreateDateOfBirth(answer.cpf, FullName, next);
    })
    .catch((err) => console.log(err));
}
//---------------------------------------------------------------------------------------------------------------------------------------//

// 3 - Fluxo Data De Nascimento

function CreateDateOfBirth(cpf, FullName, next) {
  inquirer
    .prompt([
      {
        name: "DateOfBirth",
        message: "Digite sua data de nascimento (DD/MM/AAAA):",
        validate: validateDateOfBirth,
      },
    ])
    .then((answer) => {
      createUser(answer.DateOfBirth, FullName, cpf, next);
    })
    .catch((err) => console.log(err));
}
//---------------------------------------------------------------------------------------------------------------------------------------//

// 4 - Fluxo Usuario

function createUser(DateOfBirth, FullName, cpf, next) {
  inquirer
    .prompt([
      {
        name: "User",
        message:
          "Crie um Usuário, Não permitido (Acentos, Espaços e Caracteres Especiais)!",
        validate: promptValidateUsers,
      },
    ])
    .then((answer) => {
      createPassword(answer.User, DateOfBirth, FullName, cpf, next);
    })
    .catch((err) => console.log(err));
}
//---------------------------------------------------------------------------------------------------------------------------------------//

// 5 - Fluxo Create password

function createPassword(User, DateOfBirth, FullName, cpf, next) {
  inquirer
    .prompt([
      {
        name: "password",
        message: "Crie uma senha Contendo 8 caracteres!",
        validate: promptValidarPassword,
      },
    ])
    .then((answer) => {
      console.log(answer.password);
      passwordConfirmation(
        answer.password,
        User,
        DateOfBirth,
        FullName,
        cpf,
        next
      );
    })
    .catch((err) => console.log(err));
}
//---------------------------------------------------------------------------------------------------------------------------------------//

// 6 - Fluxo Confirmation password

function passwordConfirmation(
  password,
  User,
  DateOfBirth,
  FullName,
  cpf,
  next
) {
  inquirer
    .prompt([
      {
        name: "passwordConfirmation",
        message: "Confirmar Senha",
        validate: promptValidarPassword,
      },
    ])
    .then((answer) => {
      if (answer.passwordConfirmation !== password) {
        console.log(chalk.bgRed.black("Senhas Diferentes, Tente Novamente!"));
        return createPassword();
      }
      let Finalpassword = answer.passwordConfirmation;
      // let DadosFinais = [answer.passwordConfirmation, DateOfBirth, FullName, cpf];
      let DadosFinais = [
        {
          nome: FullName,
          senha: Finalpassword,
          Date: DateOfBirth,
          CPF: cpf,
        },
      ];
      fs.writeFileSync(
        `./database/AutenticateUsers/${User}.json`,
        JSON.stringify(DadosFinais, null, 2),
        (err) => console.log(err)
      );

      fs.writeFileSync(
        `./database/AccountsUsers/${FullName}.json`,
        '{"balance": 0}',
        (err) => {
          console.log(err);
        }
      );

      console.log(chalk.green("Conta Criada com sucesso!"));
      next && next(); // chama next no final
    })
    .catch((err) => console.log(err));
}

//---------------------------------------------------------------------------------------------------------------------------------------//

// Sugestões de melhorias futuras
//    1 - Não deixar pessoas menor de idade criar contas, filtrar idades
//    2 - Colocar telefone e tmbm tentar colocar opção de transferencia via pix
//    3 - Talves eu não coloque hash nas senhas por agora, irei pensa em melhorias pro futuro!
//    4 - Irei usar nome completo para criar a conta, não é a melhor opção mas no momento irei manter até pensar em algo melhor!
//    5 - Pensar em algo pra validar o CPF e n ter repetidos !


//---------------------------------------------------------------------------------------------------------------------------------------//

// function que estou exportando
export { CreateAccount, checkAccount };
