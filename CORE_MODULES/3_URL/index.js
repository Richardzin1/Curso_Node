const url = require('url');

const adress = new URL('https://www.meusite.com/catalogo?produto=cadeira');

const parsedURL = new url.URL(adress);

console.log(parsedURL.host);
console.log(parsedURL.pathname);
console.log(parsedURL.search);
console.log(parsedURL.searchParams);
console.log(parsedURL.searchParams.get('produto'));