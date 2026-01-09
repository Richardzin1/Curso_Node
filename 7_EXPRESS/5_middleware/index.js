const express = require("express")

const path = require("path");

const app = express()
const port = 3000;

//Simulando uma Middleware e utilizando use
const checkAuth = function(res,req,next){
    req.authStatus = true
    
    if(req.authStatus){
        console.log("Está logado, pode continuar")
        // next()
    } else {
        console.log("Usuário não está logado!!")
        // next()
    }
}
app.use(checkAuth)

const basePath = path.join(__dirname, 'templates')

app.get("/", (req,res) => {
   res.sendFile(path.join(basePath, "index.html"))
})


app.listen(port, ()=>{
    console.log(`inicializou na porta ${port}`)
})