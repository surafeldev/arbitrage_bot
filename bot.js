import 'dotenv/config';

import getWeb3 from './utils/web3';
import { getPriceFromExchange } from './utils/priceFetcher';
import { sendTransaction } from './utils/transaction';

// Initialize Web3
const web3 = getWeb3();
import contractABI from './contracts/contractABI.json';
const contractAddress = process.env.CONTRACT_ADDRESS;

// Create contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Main function for arbitrage logic
async function performArbitrage() {
  try {
    // Fetch account and setup transaction parameters
    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0];

    // Fetch price from exchange
    const priceOnSecondaryMarket = await getPriceFromExchange();

    // Decide whether to mint and sell or buy and redeem
    if (priceOnSecondaryMarket > 1) {
      console.log('Arbitrage Opportunity: Mint and Sell');
      await mintDollarToken(owner);
      await sellDollarToken(priceOnSecondaryMarket, owner);

    } else if (priceOnSecondaryMarket < 1) {
      console.log('Arbitrage Opportunity: Buy and Redeem');
      await buyDollarToken(priceOnSecondaryMarket, owner);
      await redeemDollarToken(owner);
    } else {
      console.log('No arbitrage opportunity found.');
    }
  } catch (error) {
    console.error('Error in arbitrage execution:', error);
  }
}

// Function to mint Dollar Token
async function mintDollarToken(account) {
  try {
    const mint = contract.methods.mint();
    const gas = await mint.estimateGas({ from: account });
    const gasPrice = await web3.eth.getGasPrice();
    const data = mint.encodeABI();
    const nonce = await web3.eth.getTransactionCount(account);

    const tx = {
      to: contractAddress,
      data,
      gas,
      gasPrice,
      nonce,
    };

    const receipt = await sendTransaction(tx, process.env.PRIVATE_KEY);
    console.log('Mint transaction successful:', receipt);
  } catch (error) {
    console.error('Minting error:', error);
  }
}

// Implement SellDollar Token functionality
async function sellDollarToken(price, account) {
  try {
    const sell = contract.methods.sell(price);
    const gas = await sell.estimateGas({ from: account });
    const gasPrice = await web3.eth.getGasPrice();
    const data = sell.encodeABI();
    const nonce = await web3.eth.getTransactionCount(account);

    const tx = {
      to: contractAddress,
      data,
      gas,
      gasPrice,
      nonce,
    };

    const receipt = await sendTransaction(tx, process.env.PRIVATE_KEY);
    console.log('Sell transaction successful:', receipt);
  } catch (error) {
    console.error('Selling error:', error);
  }
}

// Implement BuyDollar Token  functionality
async function buyDollarToken(price, account) {
  try {
    const buy = contract.methods.buy(price);
    const gas = await buy.estimateGas({ from: account });
    const gasPrice = await web3.eth.getGasPrice();
    const data = buy.encodeABI();
    const nonce = await web3.eth.getTransactionCount(account);

    const tx = {
      to: contractAddress,
      data,
      gas,
      gasPrice,
      nonce,
    };

    const receipt = await sendTransaction(tx, process.env.PRIVATE_KEY);
    console.log('Buy transaction successful:', receipt);
  } catch (error) {
    console.error('Buying error:', error);
  }
}

// Function to redeem Dollar Token
async function redeemDollarToken(account) {
  try {
    const redeem = contract.methods.redeem();
    const gas = await redeem.estimateGas({ from: account });
    const gasPrice = await web3.eth.getGasPrice();
    const data = redeem.encodeABI();
    const nonce = await web3.eth.getTransactionCount(account);

    const tx = {
      to: contractAddress,
      data,
      gas,
      gasPrice,
      nonce,
    };

    const receipt = await sendTransaction(tx, process.env.PRIVATE_KEY);
    console.log('Redeem transaction successful:', receipt);
  } catch (error) {
    console.error('Redeeming error:', error);
  }
}

// Execute the arbitrage function
setInterval(performArbitrage, 30000); // Run every 30 seconds