const Tx = require('ethereumjs-tx').Transaction;
require('dotenv').config();
const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/e34d06b5141e4e5d8f2df2e3e567aabd');

const account1 = '0xb8F89f090854CD45bfA7165904BAc38C3eB42236';
const account2 = '0x028e8438FCFAcABE7fD5C8d049B1b0aAd1fDDD29';
/* 


console.log(dapptokenContract); */
const contractAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_initialSupply","type":"uint256"}],"name":"dappToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
const contractAddress = '0x072a62B76EDfB30d62Ec4eFC936dC493442c2F34';
const dapptokenContract = new web3.eth.Contract(contractAbi, contractAddress);
const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex');
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex');

/* web3.eth.getBalance(account1, (err,bal) =>
 {console.log('Account 1 balance is:', web3.utils.fromWei(bal, 'ether'))}); */

/* web3.eth.getBalance(account2, (err,bal) => 
{console.log('Account 2 balance is:', web3.utils.fromWei(bal, 'ether'))}); */



web3.eth.getTransactionCount(account2, async(err,txCount) => {

    //Smart Contract data
            const data = dapptokenContract.methods.transfer(account1, 1000).encodeABI();

    //Build the transaction

    const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: contractAddress,
        //value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
        gasLimit: web3.utils.toHex(1000000), //Raise this
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        data: data
    }
    console.log(txObject);

//Sign The transaction
const tx = new Tx(txObject,{ chain: 'ropsten', hardfork: 'petersburg' },)
tx.sign(privateKey2);

const serializedTransaction = tx.serialize()
const raw = '0x' + serializedTransaction.toString('hex')

//Broadcast the transaction
await web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('err:',err, 'txHash:', txHash)
})
    
    .catch(
        console.log((err) => {
            console.log(err);
        })
    )
})





