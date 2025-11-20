const minimist = require('minimist')

const args = minimist(process.argv.slice(2))

console.log(args)

const name = args['name']

const profissao = args['profissao']

console.log(name, profissao);

console.log(`O nome dele é ${name} e a profissão é ${profissao}`)
