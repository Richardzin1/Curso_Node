import chalk from "chalk";
import fs from "fs/promises";
import inquirer from "inquirer";
import { checkAccount } from "./validateFunctions.js";

function validateNumber(str) {
  // A regex /^\d+$/ verifica se a string começa (^) com um ou mais (+) dígitos (\d) e termina ($) [3, 9].
  const isValid = /^\d+([.,]\d{1,2})?$/.test(str);
  if (!isValid) {
    console.log(chalk.bgRed.black("Erro valor invalido!! Apenas numero"));
    return false;
  }
  return true;
}
// se o nome do banco esta chegando, agr preciso resgatar o banco do cliente com base no seu nome

// criar a function que vai resgatar banco do cliente;

//-------------------------------------------------------------------------------------------------------

// function deposit
async function depositValue(valor, userBankName) {
  //   funcao que pega o valor do saldo com base nome do banco do cliente
  let data = await getValueAccount(userBankName);

  data.balance = parseFloat(valor) + parseFloat(data.balance);

  await fs.writeFile(
    `./database/AccountsUsers/${userBankName}.json`,
    JSON.stringify(data, null, 2),
    "utf-8"
  );
  console.log(chalk.bgGreen.bold("Depositado com sucesso"));
}

// Pegar a conta pra poder escrever e alterar o valor
async function getValueAccount(nomeConta) {
  let account = await fs.readFile(
    `./database/AccountsUsers/${nomeConta}.json`,
    "utf-8"
  );
  let json = JSON.parse(account);

  return json;
}

//-------------------------------------------------------------------------------------------------------

async function withdrawValue(valor, userBankName) {
  let data = await getValueAccount(userBankName);
  data.balance = parseFloat(data.balance) - parseFloat(valor);
  await fs.writeFile(
    `./database/AccountsUsers/${userBankName}.json`,
    JSON.stringify(data, null, 2)
  );
  console.log(chalk.bgGreen.bold("Saque realizado com sucesso"));
}

//-------------------------------------------------------------------------------------------------------
// Prompt transferencia
async function promptTransactionCheck(userBankName) {
  try {
    const answer = await inquirer.prompt([
      {
        name: "NameAccountTransaction",
        message: "Digite o nome de quem vai receber a transferência",
      },
    ]);

    const nameAccount = answer.NameAccountTransaction;
    const nameAccountExist = checkAccount(nameAccount);
    if (!nameAccountExist) {
      console.log(chalk.bgRed.black("Conta não encontrada, tente novamente !"));
      return false;
    }
    if (nameAccount === userBankName) {
      console.log(
        chalk.bgRed.black("Erro, Proibido Transferir na Própria conta!")
      );
      return false;
    }
    return withdrawValueAccount(userBankName, nameAccount);
  } catch (err) {
    console.error(err);
    return false;
  }
}

//-------------------------------------------------------------------------------------------------------
async function withdrawValueAccount(userBankName, nameAccount) {
  try {
    const answer = await inquirer.prompt([
      {
        name: "transferValue",
        message: "Qual valor deseja transferir ?",
        validate: validateNumber,
      },
    ]);
    let transferValue = Number(answer.transferValue.replace(",", "."));
    let statusWithdrawBalance = await withdrawBalance(
      userBankName,
      transferValue,
      nameAccount
    );
    if (!statusWithdrawBalance) {
      console.log(chalk.bgRed.black("Erro no Saldo"));
    }

    let transferStatus = await transferValueAccount(
      transferValue,
      nameAccount
    );
    if (!transferStatus) {
      console.log(chalk.bgRed.black("Erro ao transferir"));
    }
    console.log(chalk.green.bold(`Transferência realizada com sucesso! Valor: R$ ${transferValue} para ${nameAccount}`))
    return true;
  } catch (err) {
    console.error(err);
  }
}
//-------------------------------------------------------------------------------------------------------
// retirar saldo da conta que ira transferir
async function withdrawBalance(userBankName, transferValue, nameAccount) {
  let data = await getValueAccount(userBankName);
  if (transferValue <= 0) {
    console.log(chalk.bgRed.black("Valor inválido"));
    return withdrawValueAccount(userBankName, nameAccount);
  }

  if (transferValue > data.balance) {
    console.log(chalk.bgRed.black("Saldo insuficiente"));
    return withdrawValueAccount(userBankName, nameAccount);
  }
  data.balance = Number(data.balance) - transferValue;
  await fs.writeFile(
    `./database/AccountsUsers/${userBankName}.json`,
    JSON.stringify(data, null, 2),
    "utf-8"
  );
  return true;
}
//-------------------------------------------------------------------------------------------------------
// transferir o saldo para conta do outro cliente selecionado
async function transferValueAccount(transferValue, nameAccount) {
  let data = await getValueAccount(nameAccount);
  data.balance = Number(data.balance) + transferValue;

  await fs.writeFile(
    `./database/AccountsUsers/${nameAccount}.json`,
    JSON.stringify(data, null, 2),
    "utf-8"
  );
  return true;
}
//-------------------------------------------------------------------------------------------------------
export {
  validateNumber,
  depositValue,
  withdrawValue,
  getValueAccount,
  promptTransactionCheck,
  withdrawValueAccount,
};
