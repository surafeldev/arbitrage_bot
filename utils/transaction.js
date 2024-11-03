const web3 = require('./web3')();

  async function sendTransaction(tx, privateKey) {
     // Sign the transaction with the provided private key
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    // Send the signed transaction to the Ethereum network
    return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
}

module.exports = {
  sendTransaction, // Export the sendTransaction function
};