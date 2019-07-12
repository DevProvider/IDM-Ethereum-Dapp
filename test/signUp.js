const TodoList = artifacts.require('SignUP')
const assert = require('assert')

const assert = require(‘assert’);
const ganache = require(‘ganache-cli’);
const Web3 = require(‘web3’);
const web3 = new Web3(ganache.provider());
const json = require(‘./../build/contracts/SignUp.json’);


const interface = json[‘abi’];
const bytecode = json[‘bytecode’];

let contractInstance

contract('SignUp', (accounts) => {

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  manager = accounts[0];
  auction = await new web3.eth.Contract(interface)
      .deploy({ data: bytecode })
      .send({ from: manager, gas: ‘1000000’ });
});


describe('SignUp', () => {
  it('deploys a contract', async () => {
    const signManager = await signup.methods.manager().call();
    assert.equal(manager, signManager, "The manager is the one who   launches the smart contract.");
  });
  

it('SignUP', async () => {
  
  await signup.methods.createUser.send("Bilal","abc");
  




});
});


})
