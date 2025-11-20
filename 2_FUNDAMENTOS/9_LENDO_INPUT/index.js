const { read } = require('fs');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Qual sua linguagem preferida ? ', (language) => {
    if (language === 'python') {
        console.log('Isso nem é linguage !')
    } else {
        console.log(`A minha linguagem preferida é: ${language}`);
    }
   
    readline.close();
});