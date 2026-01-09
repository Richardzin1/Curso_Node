import fs from "fs";

// Function para validar Nome Completo!
function validateLettersOnly(texto) {
  const textValidate = texto.trim();
  const regex = /^[A-Za-zÀ-ÿ ]+$/;

  if (textValidate === "") {
    return { isValid: false, message: "Campo vazio!" };
  }

  return regex.test(textValidate)
    ? { isValid: true, message: "Válido!" }
    : { isValid: false, message: "Contém caracteres inválidos." };
}

//---------------------------------------------------------------------------------------------------------------------------------------//

// Function para validar Usuário!

function validateCharactersUser(texto) {
  const textValidate = texto.trim();
  const regex = /^[a-z0-9._-]+$/;



  if (textValidate === "") {
    return { isValid: false, message: "Campo vazio!" };
  }

  return regex.test(textValidate)
    ? { isValid: true, message: "Válido!" }
    : { isValid: false, message: "Contém caracteres inválidos." };
}

//---------------------------------------------------------------------------------------------------------------------------------------//

// Function pra validar Numeros
function validateCPF(texto) {
  const textValidate = texto.trim();
  const regex = /^[0-9]+$/;

  if (textValidate === "") {
    return { isValid: false, message: "Campo vazio!" };
  }
   
     if(textValidate.length !== 11){
        return { isValid: false, message: "CPF invalido Apenas 11 digitos!" };
     }

  return regex.test(textValidate)
    ? { isValid: true, message: "Válido!" }
    : { isValid: false, message: "Contém caracteres especiais ou letras CPF inválidos." };
}

//---------------------------------------------------------------------------------------------------------------------------------------//

function validateDateOfBirth(input){
         // valida formato
          const regex = /^\d{2}\/\d{2}\/\d{4}$/;
          if (!regex.test(input)) {
            return "Formato inválido. Use DD/MM/AAAA.";
          }

          // separa dia, mês e ano
          const [dia, mes, ano] = input.split("/").map(Number);

          // cria a data
          const data = new Date(ano, mes - 1, dia);

          // valida se a data existe de verdade
          if (
            data.getFullYear() !== ano ||
            data.getMonth() !== mes - 1 ||
            data.getDate() !== dia
          ) {
            return "Data inválida.";
          }

          // impede data futura
          const hoje = new Date();
          if (data > hoje) {
            return "A data não pode ser no futuro.";
          }

          return true;
}

//---------------------------------------------------------------------------------------------------------------------------------------//
function validatePassword(texto) {
  const textValidate = texto.trim();
  const regex = /^[A-Za-z0-9@$!%*#?&._-]+$/;


  if (textValidate === "") {
    return { isValid: false, message: "Campo vazio!" };
  }

  if(textValidate.length < 8){
    return { isValid: false, message: "Mínimo 8 caracteres!" };
  }

  return regex.test(textValidate)
    ? { isValid: true, message: "Válido!" }
    : { isValid: false, message: "Senha Invalida!" };
}
//---------------------------------------------------------------------------------------------------------------------------------------//
// checar se o cpf existe para n repetir !
function checkAccount(FullName) {
  let checkAccount = fs.existsSync(`./database/AccountsUsers/${FullName}.json`);
  if (checkAccount) {
    // console.log("essa Conta já existe");
    return true;
  }
}
//---------------------------------------------------------------------------------------------------------------------------------------//

// filtrar para passar no validate
function promptValidateName(input){
    const result = validateLettersOnly(input)
    return result.isValid || result.message;
}

function promptValidateNumber(input){
    const result = validateCPF(input)
    return result.isValid || result.message;
}

function promptValidateUsers(input){
    const result = validateCharactersUser(input)
    return result.isValid || result.message;
}

function promptValidarPassword(input){
    const result = validatePassword(input)
    return result.isValid || result.message;
}

//---------------------------------------------------------------------------------------------------------------------------------------//

export {promptValidateName, promptValidateNumber, validateDateOfBirth, promptValidateUsers, promptValidarPassword, checkAccount}