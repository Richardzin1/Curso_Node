
import chalk from "chalk";
import _ from "lodash"; //excluido


let a = [ 1,2,3,4,5,6,7]

let b = [ 2,4,6,7]



let diff = _.difference(a,b)

// console.log(chalk.red.bold(diff))
console.log(chalk.bgRed.bold(diff));

// removendo pacotes e dependencias com npm uninstall