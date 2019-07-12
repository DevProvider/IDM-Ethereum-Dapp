const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const fs = require('fs');

const contractInfo = JSON.parse(fs.readFileSync('../smartContracts/build/contracts/Signup.json', 'utf8'));
var contractAddress = '0x7BF279c22160fd69A46ebA80b33C10e0be64C588';
var contract = new web3.eth.Contract(contractInfo.abi, contractAddress);

web3.eth.getAccounts().then(function(accounts){    
     for(let i = 0 ; i < accounts.length; i++){
        contract.methods.getUser(accounts[i]).call().then(console.log);
    }
    
    contract.methods.createUser(accounts[3],'ASAD','TEST').send({from: accounts[0]}).on('transactionHash', (hash) => {
        console.log(hash);
    }).on('error', (_error) => {
        console.log('Address Already Exsists');
    });

});
