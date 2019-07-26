'use strict';

//get libraries

const express = require('express');
const app = express();
const exportcsv = require('./export-to-cvs');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const setting = require('./settings');

//Web3 Decleration for Ethereum Connectivity.
const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const fs = require('fs');

//Contract Connection
const contractInfo = JSON.parse(fs.readFileSync('../smartContracts/build/contracts/Signup.json', 'utf8'));
var contractAddress = contractInfo.networks['5777'].address;

var privateKey = setting.privateKeyForGivenMnemonics;

var contract = new web3.eth.Contract(contractInfo.abi, contractAddress);
var accounts = [];
var emptyAccounts = [];
getEmptyAccounts();
var loginAccount = '' ;

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
   var Increment = (function(n) {
     var f = function() {}; // Only serves as constructor
       f.prototype.toString = function() {
        n += 1;
        return n;
    }
    return f;
  }(-1));
  
app.get('/api/createuser', async function (req, res) {

    var increment = new Increment();
    
    if( emptyAccounts.length > 0 ){
        contract.methods.createUser(emptyAccounts[0],req.query.username,req.query.password,privateKey[increment]).send({from: accounts[0],gas:3000000}).on('transactionHash', (hash) => {
            getEmptyAccounts();
            var resp = {
                address : emptyAccounts[0],
                key : privateKey[increment]
            };
            res.status(200).send(resp);
        }).on('error', (_error) => {
            getEmptyAccounts();

            //res.status(500).send(_error);
            console.log(_error);
        });
    }
    else{
        getEmptyAccounts();
        res.status(200).send("No Empty Accounts Left On Ganache Blockchain");
    }
    
});

app.get('/api/setUserDetail', async function (req, res) {

    console.log(req.query);
    var increment = new Increment();
    contract.methods.setUserDetail(req.query.address,req.query.name,req.query.dob,req.query.gender,req.query.nic,req.query.designation).send({from: accounts[0],gas:3000000}).on('transactionHash', (_hash) => {
        var resp = {
            address : req.query.address,
            name : req.query.name,
            hash : _hash
        };
        res.status(200).send(resp);
    }).on('error', (_error) => {
        res.status(500).send(_error);
        console.log(_error);
    });
    
});

app.get('/api/exportcsv',async function (req,res) {
    exportcsv.writecsv(req.query.username,req.query.password,req.query.address,req.query.privateKey);
    res.status(200).send("Csv Created");
});

app.get('/api/login',async function (req,res){
    web3.eth.getAccounts().then(function(_account){
        accounts = _account
        let k = 0;
        for(let i = 0 ; i < _account.length; i++){
            contract.methods.login(_account[i],req.query.username,req.query.password).call().then(function(_response){
                if (_response != '0x0000000000000000000000000000000000000000'){
                    loginAccount = _response;
                    var resp = {
                        accountAddress : loginAccount
                     };
                     k =  1; 
                    res.status(200).send(resp);
                }
                else if(i == 9 && k != 1)
                {
                    res.status(400).send("User Not Found");
                }
            });
        }
    });
});

app.get('/api/getUserDetails',async function (req ,res){
    console.log(req.query.address);

    contract.methods.getUserDetails(req.query.address).call().then(function(__response){
        var resp = {
            name : __response.t[0] , 
            desg : __response.t[4] 
        };
        res.status(200).send(resp);
   })

});

app.get('/api/receiveNotification',async function(req ,res){

    

        contract.methods.receiveNotification(req.query.to_address,req.query.from_address).send({from: accounts[0],gas:3000000}).on('transactionHash', (_hash) => {
        
            res.status(200).send("success");
        })
            
});

app.get('/api/getTransactionDetail',async function (req ,res){
        
    contract.methods.getTransactionDetail(req.query.address).call().then(function(_resp){
        var resp ={
            _address : _resp[0],
            from_address: _resp[1],
            state : _resp[2],
            date :_resp[3]
        };
        res.status(200).send(resp);
    });

});

app.get('/api/acceptNotification',async function (req , res ){

    contract.methods.acceptNotification(req.query.address , req.query.date ).send({from: accounts[0],gas:3000000}).on('transactionHash', (_hash) => {

        res.status(200).send("success");
    })
});

app.get('/api/rejectNotification',async function (req , res ){

    contract.methods.rejectNotification(req.query.address , req.query.date ).send({from: accounts[0],gas:3000000}).on('transactionHash', (_hash) => {

        res.status(200).send("success");
    })
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



        