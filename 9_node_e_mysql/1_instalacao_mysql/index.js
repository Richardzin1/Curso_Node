const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql2");

const app = express();

// executar a função handlebars
app.engine("handlebars", exphbs.engine());

// configurando template engine na aplicação
app.set("view engine", "handlebars");

//ponte para os arquivos estáticos
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

const conn = mysql.createConnection({
  host: "localhost",
  user: "app_user",
  password: "password_example_123",
  database: "database_example",
});


conn.connect((err) => {
 if (err) {
  console.error(err)
  throw new Error("Erro crítico ao conectar no MySQL")
}

  console.log("Conectou ao MySQL!")
  app.listen(3000)
});
