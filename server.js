'use strict'

const express = require('express');
const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');
const mysql = require('mysql');

//App Settings - Environment variables
const KEY_VAULT_URL = null || process.env['KEY_VAULT_URL'];
const SECRET_NAME = null || process.env['SECRET_NAME'];
const HOST = null || process.env['HOST'];
const USER = null || process.env['USER'];
const DATABASE = null || process.env['DATABASE'];

//Global variables
let app = express();
let connection = null;
global.messages = [];

//Connecting with MSI to get access token
async function GetSecret(){
    let credentials = new DefaultAzureCredential();
    let keyVaultClient = new SecretClient(KEY_VAULT_URL, credentials); //Passing credentials to KeyVault
    return await keyVaultClient.getSecret(SECRET_NAME);
}

//Connect to MySQL
async function Connect(){

   let secret = await GetSecret();
   console.log('Getting secret from Key Vault');

   connection = mysql.createConnection({
              host     : HOST,
              user     : USER,
              password : secret.value,
              database : DATABASE
    });

    connection.connect((err) => {
        if(err){
            console.log('Error connecting to Db');
          return;
        }
        console.log('Connection established');
      });
    }
   
//Drop Table Users
async function DropTable() { 
    const command = `DROP TABLE IF EXISTS Users;`;
    await connection.query(command);
    console.log("Table deleted");
}

//CreateTable Users
async function CreateTable(){
    const command = `CREATE TABLE Users (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50), lastname VARCHAR(50), PRIMARY KEY (id));`;
    await connection.query(command);
    console.log("Table created");
}

//Insert Random User
async function InsertRow(){
    const command = `INSERT INTO Users(name, lastname) VALUES ('Name- ${ randomString() }', 'LastName-${ randomString() }')`;
    await connection.query(command);
    console.log('Adding a new user');
}

//Get all Users
async function QueryAllRows(){
    return new Promise(function (resolve, reject) {
        var command = `SELECT * FROM Users;`;
        connection.query(command, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                resolve({
                    status: "error",
                    message: "Error Getting Data",
                    debug: err
                });
            }
        });
    });
}

//Create RandomString for Users
function randomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

app.get('/',async function (req, res) {
   try {
        await Connect();
        await DropTable();
        await CreateTable();
        await InsertRow();
        await InsertRow();
        await InsertRow();
        var users = await QueryAllRows();
        res.send(JSON.stringify(users))
    } catch (err) {
        console.log(err.stack)
        res.send(err)
    }
});

let port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server running at http://localhost:${port}`);
});