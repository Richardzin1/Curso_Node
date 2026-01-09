const fs = require('fs');

fs.unlink('arquivo.txt', (err) => {
    if (err) {
        console.log('Erro ao remover o arquivo:', err);
    }
});