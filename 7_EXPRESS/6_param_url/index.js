const express = require("express")

const path = require("path");

const app = express()
const port = 3000;

const basePath = path.join(__dirname, 'templates')

app.get("/users/:id", (req,res) => {

    const id = req.params.id

    // simulando leitura da tabela users, buscando usuário do banco de dados!
    console.log(`Estamos buscando usuário ${id}`)

   res.sendFile(path.join(basePath, "users.html"))
})

app.get("/", (req,res) => {
   res.sendFile(path.join(basePath, "index.html"))
})


app.listen(port, ()=>{
    console.log(`inicializou na porta ${port}`)
})