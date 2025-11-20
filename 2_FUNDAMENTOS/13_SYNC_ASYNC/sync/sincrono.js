const fs = require("fs");

console.log('inicio')

// fs.writeFileSync('arquivo.txt','conteudo ')
fs.appendFileSync('arquivo.txt','mais conteudo \n')

console.log('fim')