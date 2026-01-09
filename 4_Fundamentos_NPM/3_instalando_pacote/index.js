const _ = require('lodash');


let users = [
  { 'user': 'Leo', 'status': 'online' },
  { 'user': 'Maria', 'status': 'offline' },
  { 'user': 'João', 'status': 'online' },
  { 'user': 'Ana', 'status': 'online' }
];



let cont = _.countBy(users, 'status')


console.log(cont);