import chalk from "chalk";
import inquirer from "inquirer";
import {
  validateNumber,
  depositValue,
  withdrawValue,
  getValueAccount,
  promptTransactionCheck,
} from "./ValidateFuncionalidades.js";

function loginFeatures(nameUser) {
  let userBankName = nameUser;
  HomeLogin(userBankName);
}

function HomeLogin(userBankName) {
  inquirer
    .prompt([
      {
        type: "rawlist",
        name: "actions",
        message: "Oque você deseja fazer ? ",
        choices: [
          "Depositar",
          "Sacar",
          "Consultar Saldo",
          "Transferir",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
      let action = answer.actions;
      // criar os if de cada funcionalidade
      if (action === "Depositar") {
        deposit(userBankName);
      } else if (action === "Sacar") {
        withdraw(userBankName);
      } else if (action === "Consultar Saldo") {
        checkBalance(userBankName);
      } else if (action === "Transferir") {
        transaction(userBankName);
      }
       else if (action === "Sair") {
        console.log(chalk.bgBlue.black("Sessão encerrada. Obrigado por utilizar o Account."))
      }
    })
    .catch((err) => {
      console.error(`Erro: ${err}`);
    });
}
//-------------------------------------------------------------------------------------------------------
// deposit

function deposit(userBankName) {
  inquirer
    .prompt([
      {
        name: "deposit",
        message: "Qual Valor deseja Depositar ? ",
        validate: validateNumber,
      },
    ])
    .then(async (answer) => {
      let value = Number(answer.deposit.replace(",", "."));
      if (value <= 0) {
        console.log(chalk.bgRed.black("Valor invalido!"));
        return deposit(userBankName);
      } else {
        await depositValue(value, userBankName);
        console.log(
          chalk.gray.bold(
            `Banco Account   User Authenticate:${chalk.blue.bold(
              userBankName
            )}`
          )
        );
        return HomeLogin(userBankName);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

//-------------------------------------------------------------------------------------------------------
// withdraw

function withdraw(userBankName) {
  inquirer
    .prompt([
      {
        name: "withdraw",
        message: "Qual valor deseja sacar ? ",
        validate: validateNumber,
      },
    ])
    .then(async (answer) => {
      // verificar se o valor de saque solicitado equivale oque tem em conta
      let userBalance = await getValueAccount(userBankName);
      let saldoClienteValidate = Number(userBalance.balance)
      let value = Number(answer.withdraw.replace(",", "."));
      if (value <= 0 || value > saldoClienteValidate ) {
        console.log(chalk.bgRed.black("Saldo insuficiente !!"));
        return withdraw(userBankName);
      } else {
        await withdrawValue(value, userBankName);
        console.log(
          chalk.gray.bold(
            `Banco Account   User Authenticate:${chalk.blue.bold(
              userBankName
            )}`
          )
        );
        return HomeLogin(userBankName);
      }
    })
    .catch((err) => console.log(err));
}
//-------------------------------------------------------------------------------------------------------
//Consultar Saldo
async function checkBalance(userBankName) {
  let data = await getValueAccount(userBankName);
  let userBalance = Number(data.balance);
  console.log(chalk.green.bold(`Seu Saldo é de ${userBalance}R$`));
  console.log(
    chalk.gray.bold(
      `Banco Account   User Authenticate:${chalk.blue.bold(userBankName)}`
    )
  );
  return HomeLogin(userBankName);
}
//-------------------------------------------------------------------------------------------------------
// Trnasferir saldo
function transaction(userBankName) {
  inquirer
    .prompt([
      {
        type: "rawlist",
        name: "transaction",
        message: "Oque você deseja fazer",
        choices: ["Transferências", "Voltar"],
      },
    ])
    .then(async (answer) => {
      if (answer.transaction === "Transferências") {
        let result = await promptTransactionCheck(userBankName);
        if (!result) {
          return transaction(userBankName);
        }
        console.log(
          chalk.gray.bold(
            `Banco Account   User Authenticate:${chalk.blue.bold(
              userBankName
            )}`
          )
        );
        return HomeLogin(userBankName);

      } else if (answer.transaction === "Voltar") {
        console.log(
          chalk.gray.bold(
            `Banco Account   User Authenticate:${chalk.blue.bold(
              userBankName
            )}`
          )
        );
        return HomeLogin(userBankName);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
//-------------------------------------------------------------------------------------------------------

export { loginFeatures };
