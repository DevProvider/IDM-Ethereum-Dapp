const web3 = require('web3');

var _web3 = new web3(new web3.providers.HttpProvider('http://localhost:7545'));

console.log(_web3.eth.accounts);