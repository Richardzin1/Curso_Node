const fs = require("fs");

function handleRoutes(req, res) {
  // Só processa rotas GET
  if (req.method !== "GET") {
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  let filename = url.pathname === "/" ? "index.html" : url.pathname.substring(1);

  if (filename.endsWith(".html")) {
    if (fs.existsSync(filename)) {
      fs.readFile(filename, (err, data) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    } else {
      fs.readFile("404.html", (err, data) => {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(data);
      });
    }
  }
}

module.exports = handleRoutes;
