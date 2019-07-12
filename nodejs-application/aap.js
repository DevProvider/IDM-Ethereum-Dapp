'use strict';

//get libraries
const express = require('express');
const app = express();
const exportcsv = require('./export-to-cvs');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');

//Web3 Decleration for Ethereum Connectivity.
const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const fs = require('fs');

//Contract Connection
const contractInfo = JSON.parse(fs.readFileSync('../smartContracts/build/contracts/Signup.json', 'utf8'));
var contractAddress = '0x44Ee292fF9fff7c2d1D204E6Ce62d48E1d9C42E7';
var contract = new web3.eth.Contract(contractInfo.abi, contractAddress);
var accounts = [];
var emptyAccounts = [];
getEmptyAccounts();

//declare port
var port = process.env.PORT || 8000;
if (process.env.VCAP_APPLICATION) {
  port = process.env.PORT;
}

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//run app on port
app.listen(port, function () {
  console.log('app running on port: %d', port);
});

//-------------------------------------------------------------
//----------------------  GET API'S  --------------------------
//-------------------------------------------------------------

app.get('/api/createuser', async function (req, res) {
    
    if( emptyAccounts.length > 0 ){
        contract.methods.createUser(emptyAccounts[0],req.query.username,req.query.password,'privateKEy').send({from: accounts[0],gas:3000000}).on('transactionHash', (hash) => {
            getEmptyAccounts();
            res.status(200).send(emptyAccounts[0]);
        }).on('error', (_error) => {
            getEmptyAccounts();
            res.status(500).send(_error);
            console.log(_error);
        });
    }
    else{
        getEmptyAccounts();
        res.status(200).send("No Empty Accounts Left On Ganache Blockchain");
    }
    
});

app.get('/api/exportcsv',async function (req,res) {
    exportcsv.writecsv(req.query.username,req.query.password,req.query.address,req.query.privateKey);
    res.status(200).send("Csv Created");
});

function getEmptyAccounts() {

    web3.eth.getAccounts().then(function(_accounts){
        accounts = _accounts;
        emptyAccounts = [];
        for(let i = 0 ; i < _accounts.length; i++){
            contract.methods.getUser(_accounts[i]).call().then(function(response){
                if ((response._hex).toString() != '0x01')
                {
                    {
                        emptyAccounts.push(_accounts[i]);
                    }
                }
            });
        }
        
    
    
    });
    console.log(emptyAccounts.length);
    console.log(accounts[0]);
}