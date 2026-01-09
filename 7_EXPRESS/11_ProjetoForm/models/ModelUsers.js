import fs from "fs/promises";

async function verificarCaminho(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}


export {verificarCaminho}