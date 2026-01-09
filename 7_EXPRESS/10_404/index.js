const express = require("express");

const path = require("path");

const users = require("./users")

const app = express();
const port = 3000;

// Ler o body
app.use(express.urlencoded({ extended: true }));


app.use(express.json());

//Arquivos estáticos
app.use(express.static("public"))

const basePath = path.join(__dirname, "templates");

app.use("/users", users)

app.get("/", (req, res) => {
  res.sendFile(path.join(basePath, "index.html"));
});

app.use((req,res,next)=>{
  res.status(404).sendFile(path.join(basePath, "404.html"))
})

app.listen(port, () => {
  console.log(`inicializou na porta ${port}`);
});
