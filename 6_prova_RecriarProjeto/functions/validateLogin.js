import fs from "fs/promises";
// import fs from "fs";

import chalk from "chalk";
import { access } from "fs";

async function promptUser(User) {
  try {
    const path = `./database/AutenticateUsers/${User}.json`;
    await fs.access(path);
    return true;
  } catch (err) {
    console.log(chalk.bgRed.black(" Esse usuário não existe"));
    return;
  }
}

//-------------------------------------------------------------------------------------------------------------------------------------
// resgatar Nome

async function GetUsername(User) {
  try {
    const path = `./database/AutenticateUsers/${User}.json`;
    let data = await fs.readFile(path, {encoding: "utf-8"})
    let json = JSON.parse(data)
    let nome = json[0].nome
    return nome
  } catch (err) {
    console.error(err);
  }
}


//-------------------------------------------------------------------------------------------------------------------------------------

// forma Resgar senha

async function GetPasswordUser(User) {
  const path = `./database/AutenticateUsers/${User}.json`;
  try {
    const data = await fs.readFile(path, { encoding: "utf8" });
    let json = JSON.parse(data);
    const nameUser = json[0].senha;
    return nameUser;
  } catch (err) {
    console.error(err);
  }
}

//-------------------------------------------------------------------------------------------------------------------------------------

export { promptUser, GetPasswordUser, GetUsername };
