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

  const items = [
    "item 1", "item 2", "item 3", "item 4"
  ]

  res.render("dashboard", {user: dados, items});
});

app.get("/", (req, res) => {
  const dados = {
    name: "richard",
    surname: "Semo",
    age: 30,
  };

  const auth = true;
  const approved = false

  res.render("home", { user: dados, auth, approved });
});

app.listen(3000, () => {
  console.log("App funcionando");
});
