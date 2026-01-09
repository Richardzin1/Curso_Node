// External modules
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

// MySQL
const pool = require("./config/conn");

//-------------------------------------------------------------------------------------------------------------
// Middleware for reading data from html forms and populating req.body
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
// executar a function handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//-------------------------------------------------------------------------------------------------------------
// - Routes Get home

app.get("/", (req, res) => {
  const { sucess } = req.query;
  res.render("home", { sucess });
});

//-------------------------------------------------------------------------------------------------------------
// - Routes Post register

app.post("/book/register", async (req, res) => {
  // capture data input in a req.body
  const { title, pagesqty } = req.body;

  // prepare the query
  const sql = `INSERT INTO books (title, pagesqty) VALUES (?,?)`;

  try {
    await pool.promise().query(sql, [title, pagesqty]);
    res.redirect("/?sucess=Livro cadastrado!");
  } catch (err) {
    console.log(err);
    return;
  }
});

//-------------------------------------------------------------------------------------------------------------
// - Routes Get List Books with actions

app.get("/books", async (req, res) => {
  const {sucess,deleted} = req.query;
  // Consult and List Books in a Database and  prepare the query
  const sql = `SELECT * FROM books`;

  try {
    const [rows] = await pool.promise().query(sql);
    res.render("books", { rows, sucess,deleted });
  } catch (err) {
    console.log(err);
    return;
  }
});

//-------------------------------------------------------------------------------------------------------------
// - Routes Get Edit individual Book
app.post("/books/edit", async (req, res) => {
  // To get a book through ID
  const id = req.body.id;

  // usar id pra filtrar a linha de dados apartir dele
  const sql = `SELECT *
FROM books
WHERE id = ?;
`;

  try {
    const [row] = await pool.promise().query(sql, [id]);
    const book = row[0];
    res.render("edit", { book });
  } catch (err) {
    console.log(err);
    return;
  }
});

//-------------------------------------------------------------------------------------------------------------
// - Routes Post save edit
app.post("/books/edit/save", async (req, res) => {
  const { id, title, pagesqty } = req.body;
  const sql = `UPDATE books
SET title = ?, pagesqty = ?
WHERE id = ?;
`;

  try {
    await pool.promise().query(sql, [title, pagesqty, id]);
    res.redirect("/books?sucess=Edited Successfully");
  } catch (err) {
    console.log(err);
    return;
  }
});

//-------------------------------------------------------------------------------------------------------------
// - Routes Delete Book
app.post("/books/delete", async (req, res) => {
  const id = req.body.id;
  const sql = `DELETE FROM books WHERE id = ?;
`;

  try {
    await pool.promise().query(sql, [id]);
    res.redirect("/books?deleted=Successfully Deleted");
  } catch (err) {
    console.log(err);
    return;
  }
});
//-------------------------------------------------------------------------------------------------------------

app.listen(3000);
//-------------------------------------------------------------------------------------------------------------
