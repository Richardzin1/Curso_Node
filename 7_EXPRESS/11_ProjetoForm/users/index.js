import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { WriteAdd } from "../Controllers/Users.js";
import fs from "fs/promises";

const router = express.Router();

// recria o __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = path.join(__dirname, "../templates");

router.get("/form", (req, res) => {
  res.sendFile(path.join(basePath, "form.html"));
});

router.post("/save", async (req, res) => {
  let fullName = req.body.fullName;
  let email = req.body.email;
  let password = req.body.password;

  let dados = {
    fullName,
    email,
    password,
  };

  await WriteAdd(fullName, dados);

  res.redirect("/users/form");

});

export default router;
