const fs = require('fs');

console.log('Início do script');

fs.writeFile('arquivo.txt', 'Conteúdo do arquivo', function(err){
setTimeout(() => {
    console.log('Arquivo escrito com sucesso!');
}, 1000);
})