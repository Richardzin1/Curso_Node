// --- External and Interna Dependencies ---
import express from "express";
import fs from "fs/promises";
import path from "path";
import users from "./users/index.js";
import {verificarCaminho} from "./models/ModelUsers.js" 
import { fileURLToPath } from "url";

//---------------------------------------------------------------------------------------------------------------------

// Define the base directory for view templates
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
const basePath = path.join(__dirname, "templates")


// Initialize Express application
let app = express();

// Defined port 5000
let port = 5000;

//* Middleware Configuration
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static("public"))
app.use("/users", users)

// Create path data
const caminho = "./data";

let verificação = await verificarCaminho(caminho)

if(!verificação){
   await fs.mkdir("Data", { recursive: true });
}

//---------------------------------------------------------------------------------------------------------------------

// Routes

app.get("/", (req,res) =>{
    res.sendFile(path.join(basePath, "index.html"))
})

app.use((req,res,next)=>{
  res.status(404).sendFile(path.join(basePath, "404.html"))
})
//---------------------------------------------------------------------------------------------------------------------

app.listen(port, () =>{
    console.log(`🚀 Server is running on port ${port}`);
})