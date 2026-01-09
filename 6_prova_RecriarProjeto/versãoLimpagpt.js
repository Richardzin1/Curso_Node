import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";
import {
  promptValidarNome,
  promptValidarNumeros,
  validarDataNascimento,
  promptValidarUsuarios,
  promptValidarPassword,
  checkAccount,
} from "./validateFunctions.js";

// Função principal de criação de conta
async function CreateAccount(next) {
  try {
    // 1️⃣ Nome completo
    let { NomeCompleto } = await inquirer.prompt([
      {
        name: "NomeCompleto",
        message: "Digite Seu Nome Completo!",
        validate: promptValidarNome,
      },
    ]);

    if (checkAccount(NomeCompleto)) {
      console.log(chalk.bgRed.black("Conta já existe! Tente outro nome."));
      return CreateAccount(next); // repete a pergunta
    }

    // 2️⃣ CPF
    let { cpf } = await inquirer.prompt([
      {
        name: "cpf",
        message: "Digite Seu CPF!",
        validate: promptValidarNumeros,
      },
    ]);

    // 3️⃣ Data de nascimento
    let { DataNascimento } = await inquirer.prompt([
      {
        name: "DataNascimento",
        message: "Digite sua data de nascimento (DD/MM/AAAA):",
        validate: validarDataNascimento,
      },
    ]);

    // 4️⃣ Usuário
    let { usuario } = await inquirer.prompt([
      {
        name: "usuario",
        message:
          "Crie um Usuário, Não permitido (Acentos, Espaços e Caracteres Especiais)!",
        validate: promptValidarUsuarios,
      },
    ]);

    // 5️⃣ Senha
    let { password } = await inquirer.prompt([
      {
        name: "password",
        message: "Crie uma senha Contendo 8 caracteres!",
        validate: promptValidarPassword,
      },
    ]);

    // 6️⃣ Confirmação de senha
    let senhaValida = false;
    while (!senhaValida) {
      let { passwordConfirmation } = await inquirer.prompt([
        {
          name: "passwordConfirmation",
          message: "Confirme a Senha",
          validate: promptValidarPassword,
        },
      ]);

      if (passwordConfirmation !== password) {
        console.log(
          chalk.bgRed.black("Senhas diferentes, tente novamente!")
        );
      } else {
        senhaValida = true;
        password = passwordConfirmation; // senha final
      }
    }

    // Salvar dados no JSON
    const DadosFinais = [
      { nome: NomeCompleto },
      { senha: password },
      { Date: DataNascimento },
      { CPF: cpf },
    ];

    fs.writeFileSync(
      `./database/AutenticateUsers/${usuario}.json`,
      JSON.stringify(DadosFinais, null, 2)
    );

    fs.writeFileSync(
      `./database/AccountsUsers/${NomeCompleto}.json`,
      '{"balance": 0}'
    );

    console.log(chalk.green("Conta criada com sucesso!"));

    // Chama o next (menu ou próximo passo)
    next && next();
  } catch (err) {
    console.log(err);
  }
}

export { CreateAccount };
