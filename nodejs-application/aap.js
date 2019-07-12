const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const fs = require('fs');

const contractInfo = JSON.parse(fs.readFileSync('../smartContracts/build/contracts/Signup.json', 'utf8'));
var contractAddress = '0x7BF279c22160fd69A46ebA80b33C10e0be64C588';
var contract = new web3.eth.Contract(contractInfo.abi, contractAddress);

contract.methods.getUser('0x5E9D7c51408cfa236B65b34a476bF439eaD89aC7').call().then(console.log);
