// const express = require(express) // jeito antigo 
import express from "express" // jeito antigo 

//inicializar express;
//criar a porta
//criar a rota com a aplicação
//executar listen para ouvir essa porta

//inicializando
let app = express();

// Criando porta
const port = 3000;

app.get('/', (req,res) => {
    res.send("Hello Word")
})

app.listen(port, () =>{
    console.log(`Porta inicializada ${port}`)
})
