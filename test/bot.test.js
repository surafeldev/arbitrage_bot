const bot = require('../bot');

test('performArbitrage - no arbitrage opportunity', async () => {
  jest.spyOn(bot, 'getPriceFromExchange').mockResolvedValue(1);
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  await bot.performArbitrage();

  expect(consoleSpy).toHaveBeenCalledWith('No arbitrage opportunity found.');
  consoleSpy.mockRestore();
});

test('performArbitrage - mint and sell', async () => {
  jest.spyOn(bot, 'getPriceFromExchange').mockResolvedValue(1.5);
  const mintSpy = jest.spyOn(bot, 'mintDollarToken').mockResolvedValue();
  const sellSpy = jest.spyOn(bot, 'sellDollarToken').mockResolvedValue();
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  await bot.performArbitrage();

  expect(consoleSpy).toHaveBeenCalledWith('Arbitrage Opportunity: Mint and Sell');
  expect(mintSpy).toHaveBeenCalled();
  expect(sellSpy).toHaveBeenCalled();
  mintSpy.mockRestore();
  sellSpy.mockRestore();
  consoleSpy.mockRestore();
});

test('performArbitrage - buy and redeem', async () => {
  jest.spyOn(bot, 'getPriceFromExchange').mockResolvedValue(0.5);
  const buySpy = jest.spyOn(bot, 'buyDollarToken').mockResolvedValue();
  const redeemSpy = jest.spyOn(bot, 'redeemDollarToken').mockResolvedValue();
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  await bot.performArbitrage();

  expect(consoleSpy).toHaveBeenCalledWith('Arbitrage Opportunity: Buy and Redeem');
  expect(buySpy).toHaveBeenCalled();
  expect(redeemSpy).toHaveBeenCalled();
  buySpy.mockRestore();
  redeemSpy.mockRestore();
  consoleSpy.mockRestore();
});
