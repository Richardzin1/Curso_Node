const fs = require('fs');

const arquivoAntigo = 'novo_nome_arquivo.txt';
const arquivoNovo = 'novo.txt';


fs.rename(arquivoAntigo, arquivoNovo, (err) => {
    if (err) {
        console.log('Erro ao renomear o arquivo:', err);
        return;
    }   

    console.log('Arquivo renomeado com sucesso!');
});