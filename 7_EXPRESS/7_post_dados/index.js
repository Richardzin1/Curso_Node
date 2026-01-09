const express = require("express");

const path = require("path");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));


app.use(express.json());

const basePath = path.join(__dirname, "templates");

app.get("/form", (req, res) => {
   res.sendFile(path.join(basePath, "form.html"));
});

app.post("/users/save", (req, res) => {
  console.log(req.body);

  let name = req.body.name
  let senha = req.body.senha

  console.log(`Nome é ${name} e sua senha é ${senha}`)
  res.sendFile(path.join(basePath, "form.html"));
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  // simulando leitura da tabela users, buscando usuário do banco de dados!
  console.log(`Estamos buscando usuário ${id}`);

  res.sendFile(path.join(basePath, "users.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(basePath, "index.html"));
});

app.listen(port, () => {
  console.log(`inicializou na porta ${port}`);
});
