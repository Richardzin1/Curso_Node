const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {

   const dados = {
    name: "richard",
    surname: "Semo"
   }

  res.render("home", {user: dados});
});

app.listen(3000, () => {
    console.log("App funcionando")
});
