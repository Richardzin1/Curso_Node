const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/dashboard", (req, res) => {
  const dados = {
    name: "Richard",
    surname: "Semo",
  };

  const items = ["item 1", "item 2", "item 3", "item 4"];

  res.render("dashboard", { user: dados, items });
});

app.get("/blogpost", (req, res) => {
  const post = {
    title: 'aprendendo node.js',
    category: 'javaScript',
    body: 'Este artigo vai te ajudar a aprender node.js',
    comments: 4
  };

  res.render("blogpost", {post})
});

app.get("/", (req, res) => {
  const dados = {
    name: "richard",
    surname: "Semo",
    age: 30,
  };

  const auth = true;
  const approved = false;

  res.render("home", { user: dados, auth, approved });
});

app.listen(3000, () => {
  console.log("App funcionando");
});
