const path = require("path");


// path absoluto
// console.log(path.resolve("arquivo.txt"))

// formar path

const MidFolder = "Relatorios";

const NameFile = "Richard.txt";

const FinalFile = path.join('/', 'Arquivos', MidFolder, NameFile);

console.log(path.resolve(FinalFile))
console.log(path.extname(FinalFile))
console.log(path.basename(FinalFile))



