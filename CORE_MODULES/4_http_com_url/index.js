const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {

    const infUrl = require('url').parse(req.url, true);

    const name = infUrl.query.name;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    if (!name) {
        res.end('<h1>Ola, preencha seu nome!</h1> <br> <form method="get"> <input type"text" name="name" placeholder"Name" /> <button type="submit">Eviar</button></form>');
    }
    else {
        res.end(`<h1>Bem vindo, ${name}!</h1>`);
    }
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})