const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/hdkey');
const wallet = require('ethereumjs-wallet');

let mnemonic = "broccoli umbrella reunion obey express permit leopard dose crime arrow art draw";

const seed = bip39.mnemonicToSeed("broccoli umbrella reunion obey express permit leopard dose crime arrow art draw"); // mnemonic is the string containing the words
const hdk = hdkey.fromMasterSeed((seed).toString());
const addr_node = hdk.derivePath("m/44'/60'/0'/0/0"); //m/44'/60'/0'/0/0 is derivation path for the first account. m/44'/60'/0'/0/1 is the derivation path for the second account and so on
const addr = addr_node.getWallet().getAddressString(); //check that this is the same with the address that ganache list for the first account to make sure the derivation is correct
const private_key = addr_node.getWallet().getPrivateKey();

console.log(addr);
console.log(private_key);
