const fs = require("fs");

if (!fs.existsSync("./minhapasta")) {
  console.log("Not exist !");
  fs.mkdirSync("minhapasta");
  if (fs.existsSync) {
    console.log("Folder create with Sucess !");
  }
}
