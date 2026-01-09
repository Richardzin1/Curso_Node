const http = require("http");
const fs = require("fs");
const querystring = require("querystring");
const handleRoutes = require("./configRoutes"); // importa a função de routes
// const LoginValidation = require("./login");

const port = 3000;

const serve = http.createServer((req, res) => {
  // TRATAMENTO DO POST
  if (req.method === "POST") {
    console.log("POST recebido:", req.url); // <-- AQUI
    let body = [];

    req.on("data", (DadosInput) => {
      body += DadosInput;
    });

    req.on("end", () => {
      const parsedData = querystring.parse(body.toString());

      if (req.url === "/salvar-dados") {
        fs.readFile("dados.txt", "utf8", (err, data) => {
          let dadosExistentes = [];

          if (!err && data) {
            try {
              dadosExistentes = JSON.parse(data);
            } catch (e) {
              dadosExistentes = [];
            }
          }

          dadosExistentes.push(parsedData);

          fs.writeFile(
            "dados.txt",
            JSON.stringify(dadosExistentes, null, 2),
            (err) => {
              if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Erro ao salvar os dados.");
              } else {
                res.writeHead(302, { Location: "/" });
                res.end();
              }
            }
          );
        });
      } else if (req.url === "/login-dados") {
        fs.readFile("dados.txt", "utf-8", (err, dados) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Erro no servidor");
            return;
          }

          let dadosObjs = [];
          try {
            dadosObjs = JSON.parse(dados);
          } catch {
            dadosObjs = [];
          }

          const objComparacao = parsedData;

          const existeRegistro = dadosObjs.some(
            (registro) =>
              registro.username === objComparacao.username &&
              registro.password === objComparacao.password
          );

          if (existeRegistro) {
            const username = encodeURIComponent(objComparacao.username);
            res.writeHead(302, {
              Location: `/pageUser.html?username=${username}`,
            });
            res.end();
          } else {
            res.writeHead(401, { "Content-Type": "text/plain" });
            res.end("Login inválido");
          }
        });
      } else {
        res.writeHead(404);
        res.end("Rota POST não encontrada.");
      }
    });

    return; // ← impede que handleRoutes execute
  }

  // ROTAS NORMAIS
  handleRoutes(req, res);
});

serve.listen(port, () => {
  console.log("Servidor ativo na porta 3000");
});
