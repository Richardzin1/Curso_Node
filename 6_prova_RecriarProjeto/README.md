# Projeto: Sistema Bancário

## Sobre o Projeto
Este projeto consiste em um **sistema bancário** desenvolvido com **Node.js puro**, onde clientes podem criar contas e utilizar funcionalidades básicas de um banco, tudo através do **terminal/linha de comando**.  

O objetivo é criar uma aplicação **simples e funcional**, servindo como base para futuras evoluções, como interface gráfica, banco de dados real e funcionalidades avançadas.

---

## Tecnologias Utilizadas
- **Node.js** (JavaScript no backend)  
- **Módulo FS** para manipulação de arquivos JSON  
- **Inquirer.js** (opcional) para prompts interativos no terminal  

> Observação: Inicialmente tudo será feito com **prompt no terminal** e arquivos JSON como armazenamento de dados. Futuramente, será possível migrar para banco de dados e frontend visual.

> Como objetivo de estudo e boas praticas será tudo em linha terminal com prompt de comandos no backend.

---

## Funcionalidades

### Funcionalidades fora do sistema
- Login com usuário e senha  
- Criação de conta

### Funcionalidades dentro do sistema
- Depositar saldo  
- Consultar saldo  
- Sacar saldo  
- Transferir saldo  
- Logout (encerrar sessão)

---

## Estrutura de Arquivos JSON

O sistema utiliza **dois arquivos JSON** para armazenar dados:

1. `usuarios.json`  
   - Armazena informações pessoais do usuário:  
     - ID (único)  
     - Nome completo  
     - CPF  
     - Data de nascimento  
     - Telefone  
     - ID do banco associado  

2. `contas.json`  
   - Armazena informações bancárias:  
     - ID (único)  
     - Número da conta  
     - Saldo  
     - Nome do usuário  
     - ID do cliente

---
