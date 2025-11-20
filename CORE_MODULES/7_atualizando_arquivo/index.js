const http = require('http');
const fs = require('fs');

const port = 3000;

const server = http.createServer((req, res) => {
  const urLInfo = require('url').parse(req.url, true);
  const name = urLInfo.query.name;
  const comidaFavorita = urLInfo.query.comidaFavorita;
  const culinaria = urLInfo.query.culinaria;
  const frequencia = urLInfo.query.frequencia;
  const comentario = urLInfo.query.comentario;

  if (!name) {
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });

  } else {
    const conteudo = `
      Nome: ${name}
      Comida favorita: ${comidaFavorita}
      Tipo de culinária: ${culinaria}
      Comentário: ${comentario}
      Frequência: ${frequencia}
      --------------------------
    `;

    fs.appendFile('arquivo.txt', conteudo, (err) => {
      if (err) {
        console.log('Erro ao gravar o arquivo:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erro ao salvar os dados.');
      } else {
        res.writeHead(302, { location: '/' }); // Redireciona para a página inicial
        res.end();
      }
    });
  }
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
