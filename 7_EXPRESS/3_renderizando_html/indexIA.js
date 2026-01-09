// const express = require(express) // jeito antigo 
import express from "express" // jeito antigo 
import path from "path"
import {fileURLToPath} from "url"

// aqui usei o type: "module" do package.json, precisa mudar prq deve estar "commonjs"

// simula o __dirname no ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//inicializar express;
//criar a porta
//criar a rota com a aplicação
//executar listen para ouvir essa porta

//inicializando
let app = express();

// Criando porta
const port = 3000;

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.listen(port, () =>{
    console.log(`Porta inicializada ${port}`)
})
