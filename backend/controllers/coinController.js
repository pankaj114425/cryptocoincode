const axios = require('axios');
const CurrentCoin = require('../models/currentCoinModel');
const HistoryCoin = require('../models/historyCoinModel');

//get the top 10 coin

const getTop10Coins = async (req, res) => {
  try {
    const coins = await CurrentCoin.find();
    if (coins.length > 0) {
      return res.status(200).json(coins); 
    }

   
    const { data } = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 10,
          page: 1,
        },
      }
    );

    const mapped = data.map((coin) => ({
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      price: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h,
      timestamp: new Date(),
    }));

    await CurrentCoin.deleteMany({});
    await CurrentCoin.insertMany(mapped);

    res.status(200).json(mapped);
  } catch (err) {
    console.error('Error fetching top 10 coins:', err.message);
    res.status(500).json({ error: 'Failed to fetch coins' });
  }
};
const saveHistorySnapshot = async (req, res) => {
  try {
    const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
      },
    });

    const historyData = data.map((coin) => ({
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      price: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h,
      timestamp: new Date(),
    }));

    await HistoryCoin.insertMany(historyData);

    res.status(201).json({ message: 'History saved successfully', count: historyData.length ,historyData});
  } catch (err) {
    console.error('Error saving history:', err.message);
    res.status(500).json({ error: 'Failed to save history' });
  }
};

const getCoinHistory = async (req, res) => {
  try {
    const coinId = req.params.coinId;
    const history = await HistoryCoin.find({ coinId }).sort({ timestamp: 1 });

    if (!history.length) {
      return res.status(404).json({ message: 'No history found for this coin' });
    }

    res.json(history);
  } catch (err) {
    console.error('Error fetching history:', err.message);
    res.status(500).json({ error: 'Failed to get coin history' });
  }
};

module.exports={getTop10Coins,saveHistorySnapshot,getCoinHistory}