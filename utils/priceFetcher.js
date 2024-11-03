const axios = require('axios');

async function getPriceFromExchange() {
  try {
    const response = await axios.get(process.env.PRICE_FEED_URL); // Replace with actual API URL
    return response.data.price;
  } catch (error) {
    console.error('Error fetching price from exchange:', error);
    throw error;
  }
}

module.exports = {
  getPriceFromExchange,
};