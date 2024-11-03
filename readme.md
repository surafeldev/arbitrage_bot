# Arbitrage Bot

This README file will guide you on how to run the Arbitrage Bot.

This is an arbitrage bot for maintaining the Dollar token USD peg. The bot monitors the price of the Dollar token and performs arbitrage actions to keep the price stable.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js
- npm
- axios
- dotenv
- web3

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/surafeldev/arbitrage_bot.git
   ```
2. Navigate to the project directory:
   ```sh
   cd arbitrage_bot
   ```
3. Install the dependencies:
   ```sh
   pip install -r requirements.txt
   ```

# Usage

## Running the Bot

To run the bot, follow these steps:

1. Ensure you have configured the necessary API keys and settings in the `config.json` file.

2. Run the bot using the following command:
   ```sh
   node bot.js
   ```

## Usage

- The bot will start scanning for arbitrage opportunities and execute trades based on the configured parameters.
- Monitor the console output for real-time updates and logs.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Environment Variables

The bot uses environment variables to manage sensitive information such as API keys. You need to create a `.env` file in the root directory of the project with the following content:

Install the `dotenv` package:

```sh
npm install dotenv
```

```env
INFURA_API_KEY=
PRIVATE_KEY=
CONTRACT_ADDRESS=
PRICE_FEED_URL=
```

Make sure to replace `your_private_key_here`.` price feed url`, `contract address` and `your_seed_phrase_here` with your actual contract address, price feed URL, private key and seed phrase.
