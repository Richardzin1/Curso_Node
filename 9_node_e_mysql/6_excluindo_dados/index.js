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


//-----------------------------------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.render("home");
});

//-----------------------------------------------------------------------------------------------------------------------
// Rota adicionar livros
app.post("/books/insertbook", (req, res) => {
  const { title, pagesqty } = req.body;

  if (!title || !pagesqty) {
    return res.redirect("/?error=Preencha todos os campos!");
  }

  // preciso salvar isso banco de dados
  const sql = `INSERT INTO book (title, pageqty) VALUES (?,?) `;

  conn.query(sql, [title, pagesqty], (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/books?success=Cadastrado com sucesso!");
  });
});

//-----------------------------------------------------------------------------------------------------------------------
// Rota para resgatar dados Banco de dados

app.get("/books", (req, res) => {
  const { success, error } = req.query;
  const sql = `SELECT * FROM book`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const book = data;
    res.render("books", { book, success, error });
  });
});

//-----------------------------------------------------------------------------------------------------------------------
// buscas individuais com id
app.get("/books/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM book WHERE id = ?`;
  conn.query(sql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const book = data[0];
    res.render("book", { book });
  });
});
//-----------------------------------------------------------------------------------------------------------------------
// editar registros
app.get("/books/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM book WHERE id = ?`;

  conn.query(sql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const bookEdit = data[0];
    res.render("edicao", { bookEdit });
  });
});
//------- ----------------------------------------------------------------------------------------------------------------
// criar a rota update pra salvar os dados editados
app.post("/books/update", (req, res) => {
  const { id, title, pagesqty } = req.body;

  if (!id || !title || !pagesqty) {
    return res.redirect(`/books/edit/${id}?error=Preencha todos os campos`);
  }
  const sql = `
  UPDATE book
  SET title = ?, pageqty = ?
  WHERE id = ?
`;

  conn.query(sql, [title, pagesqty, id], (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/books?success=Atualizado com sucesso");
  });
});

//------- ----------------------------------------------------------------------------------------------------------------
// teste para deletar usuários
app.post("/books/delete", (req, res) => {
  const { id } = req.body;
  const sql = `DELETE FROM book WHERE id = ?`;

  conn.query(sql, [id], (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/books?success=Deletado Com sucesso!");
  });
});
//------- ----------------------------------------------------------------------------------------------------------------
conn.getConnection((err, connection) => {
  if (err) {
    console.error("Erro crítico ao conectar no MySQL");
    console.error(err.message);
    process.exit(1); // mata a aplicação
  }

  console.log(" MySQL conectado com sucesso!");
  connection.release();

  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
  });
});
