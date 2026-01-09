import fs from "fs/promises";


//Caso queria trocar nome do usuário ou algum parametro
async function readFile(namePath) {
  let json = await fs.readFile(`../Data/${namePath}.json`);
  let data = JSON.parse(json);

  return data;
}

async function WriteAdd(namePath, data) {
  await fs.writeFile(
    `./Data/${namePath}.json`,
    JSON.stringify(data, null, 2)
  );
}
export {WriteAdd}