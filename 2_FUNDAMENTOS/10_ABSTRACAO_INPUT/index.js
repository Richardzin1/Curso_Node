import inquirer from 'inquirer';

inquirer.prompt([
  {
    type: 'input',
    name: 'p1',
    message: 'Qual a primeira nota?'
  },
  {
    type: 'input',
    name: 'p2',
    message: 'Qual a segunda nota?'
  }
])
.then((answers) => {

    let media = (parseInt(answers.p1) + parseInt(answers.p2)) / 2;
  console.log(media);
})
.catch(err => console.log(err));
