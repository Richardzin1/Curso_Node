const fs = require('fs'); // Importa o módulo 'fs' (file system).

// Lê o conteúdo do arquivo 'arquivo.txt' de forma assíncrona.
// fs.readFile('arquivo.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.log(err);
//         return;
//     }

//     console.log(data);
// })

fs.appendFile('arquivo.txt', ' teste 2', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    fs.readFile('arquivo.txt', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log(data);
    })

});


