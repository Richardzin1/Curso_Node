const express = require("express");
const router = express.Router();
const path = require("path");

const basePath = path.join(__dirname, "../templates");

router.get("/form", (req, res) => {
  res.sendFile(path.join(basePath, "form.html"));
});

router.post("/save", (req, res) => {
  console.log(req.body);

  let name = req.body.name;
  let senha = req.body.senha;

  console.log(`Nome é ${name} e sua senha é ${senha}`);
  res.sendFile(path.join(basePath, "form.html"));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  // simulando leitura da tabela users, buscando usuário do banco de dados!
  console.log(`Estamos buscando usuário ${id}`);

  res.sendFile(path.join(basePath, "users.html"));
});

module.exports = router;
