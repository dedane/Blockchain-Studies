const Tx = require('ethereumjs-tx').Transaction;
require('dotenv').config();
const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/e34d06b5141e4e5d8f2df2e3e567aabd');

const account1 = '0xb8F89f090854CD45bfA7165904BAc38C3eB42236';
const account2 = '0x028e8438FCFAcABE7fD5C8d049B1b0aAd1fDDD29';

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1,'hex');
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex');

web3.eth.getBalance(account1, (err,bal) =>
 {console.log('Account 1 balance is:', web3.utils.fromWei(bal, 'ether'))});

web3.eth.getBalance(account2, (err,bal) => 
{console.log('Account 2 balance is:', web3.utils.fromWei(bal, 'ether'))});



web3.eth.getTransactionCount(account1, (err,txCount) => {

    //Build the transaction

    const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: account2,
        value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }
    console.log(txObject);
    //Sign The transaction
const tx = new Tx(txObject, { chain: 'ropsten', hardfork: 'petersburg' })
tx.sign(privateKey1);

const serializedTransaction = tx.serialize()
const raw = '0x' + serializedTransaction.toString('hex')

//Broadcast the transaction
web3.eth.sendSignedTransaction(raw, (err, txHash) => {

console.log('txHash:', txHash)
})
    
    
})




