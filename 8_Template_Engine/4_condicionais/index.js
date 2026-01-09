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

  res.render("dashboard", {user: dados});
});

app.get("/", (req, res) => {
  const dados = {
    name: "richard",
    surname: "Semo",
    age: 30,
  };

  const auth = true;

  res.render("home", { user: dados, auth });
});

app.listen(3000, () => {
  console.log("App funcionando");
});
