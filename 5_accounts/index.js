// Começar com modulos externos !
import inquirer from "inquirer";
import chalk from "chalk";

// Modulos interno !
import fs from "fs";
import { error } from "console";

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "rawlist",
        name: "action",
        message: "O que vc deseja fazer ?",
        choices: [
          "Criar Conta",
          "Consultar Saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];

      if (action == "Criar Conta") {
        createAccount();
      } else if (action === "Consultar Saldo") {
        getAccountBalance();
      } else if (action === "Depositar") {
        deposit();
      } else if (action === "Sacar") {
        withdraw();
      } else if (action === "Sair") {
        console.log(chalk.bgBlue.black("Obrigado Por usar o Accounts."));
      }
    })
    .catch((err) => console.log(err));
}

function createAccount() {
  console.log(chalk.bgGreen.black("Parabéns por escolher o nosso banco!"));
  console.log(chalk.green("Defina as opções da sua conta a seguir!"));
  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para sua conta:",
      },
    ])
    .then((answer) => {
      let accountName = answer["accountName"];
      console.info(accountName);

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black("Essa conta já existe"));
        buildAccount();
        return;
      }
      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance": 0}',
        (err) => {
          console.log(err);
        }
      );

      console.log(
        chalk.green(`Parabens sua conta foi criada com sucesso ${accountName}!`)
      );
      operation();
    })
    .catch((err) => console.log(err));
}

// Add an amount to user account

function deposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual conta deseja depositar ? ",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      // verify is account exists
      if (!checkAccount(accountName)) {
        return deposit();
      }

      // deposit in account user
      depositAccount(accountName)
    })
    .catch((err) => console.log(err));
}

function depositAccount(accountName){
inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto você deseja depositar? ",
          },
        ])
        .then((answer) => {
          const amount = parseFloat(answer.amount);
          if(isNaN(amount)|| amount <= 0){
            console.log(chalk.bgRed.black("Valor invalido!"))
            return depositAccount(accountName);
          }
          addAmount(accountName, amount);
          operation();
        })
        .catch((err) => console.log(err));
}



function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black("Essa conta não existe, Tente novamente!"));
    return false;
  }
  return true;
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    (err) => {
      console.log(err);
    }
  );

  console.log(chalk.green(`Valor de R$${amount} Depositado Com sucesso !`));
}

function getAccount(accountName) {
  const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf-8",
    flag: "r",
  });

  return JSON.parse(accountJson);
}

// checar o saldo na conta
function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite nome da sua conta !",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      // validacao se estiver vazio!
      if (accountName === "") {
        console.log(chalk.bgRed.black("Erro, Tente novamente!"));
        return getAccountBalance();
      }

      // verificar se aconta existe !
      if (!checkAccount(accountName)) {
        console.log(chalk.bgRed.black("Erro, Conta não encontrada !"));
        return getAccountBalance();
      }

      let accountData = getAccount(accountName);
      console.log(
        chalk.green(
          `Olá ${accountName}, Seu saldo é de R$${accountData.balance}`
        )
      );
      return operation();
    })
    .catch((err) => console.log(err));
}

// withdraw founds from the users's account

function withdraw() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite Nome da Sua conta!",
      },
    ])
    .then((answer) => {
      let accountName = answer["accountName"];

      // verify if the account exists!
      if (!checkAccount(accountName)) {
        return withdraw();
      }
      askWithdrawValue(accountName);
    });
}

// função de retirada de saque
function withdrawBalance(accountName, withdrawCashValue) {
  let account = getAccount(accountName);

  // fazer uma validação pra caso o valor de ritirada seja maior que o saque existente.
  if (account.balance < withdrawCashValue) {
    console.log(chalk.bgRed.black("Saldo insuficiente!"));
    return askWithdrawValue();
  }

  account.balance = parseFloat(account.balance) - parseFloat(withdrawCashValue);

  fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(account));

  console.log(chalk.bgBlue.black(`Saque no valor de R$${withdrawCashValue} retirado com sucesso !`));
  return operation();
}

// criar perguna do valor que deseja sacar separado pra poder criar endpont.
function askWithdrawValue(accountName) {
  inquirer
    .prompt([
      {
        name: "withdrawMoney",
        message: "Qual valor deseja sacar?",
      },
    ])
    .then((answer) => {
      const withdrawCashValue = parseFloat(answer.withdrawMoney);
      if (isNaN(withdrawCashValue) || withdrawCashValue <= 0) {
        console.log(chalk.bgRed.black("Digite um valor válido!"));
        return askWithdrawValue(accountName);
      }
      withdrawBalance(accountName, withdrawCashValue);
    })
    .catch((err) => console.log(err));
}