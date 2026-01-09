import express from "express"
import exphbs from "express-handlebars"
let app = express()

const hbs = exphbs.create({
    partialsDir: ["views/partials"]
})

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")


app.get("/", (req,res) => {
    
    res.render("home")
})


app.listen(3000, ()=>{
    console.log("App rodando")
})