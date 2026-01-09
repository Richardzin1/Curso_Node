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

//converter pra json a captura dos campos
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

const conn = mysql.createConnection({
  host: "localhost",
  user: "app_user",
  password: "password_example_123",
  database: "database_example",
});


app.get("/", (req, res) => {
  const { success, error } = req.query;
  res.render("home", { success, error });
});

app.post("/books/insertbook", (req, res) => {
  const { title, pagesqty } = req.body;

  if (!title || !pagesqty) {
    return res.redirect("/?error=Preencha todos os campos!");
  }

  // preciso salvar isso banco de dados
  const sql = `INSERT INTO book (title, pageqty) VALUES (?,?) `;

  conn.query(sql, [title, pagesqty], (err) => {
    if (err && title === '') {
      res.redirect("/?error=Erro ao cadastrar o livro.");
    }
    res.redirect("/?success=Cadastrado com sucesso!");
  });
});

conn.connect((err) => {
  if (err) {
    console.error(err);
    throw new Error("Erro crítico ao conectar no MySQL");
  }

  console.log("Conectou ao MySQL!");
  app.listen(3000);
});
