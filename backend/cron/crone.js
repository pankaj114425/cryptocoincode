const cron = require('node-cron');
const axios = require('axios');
const HistoryCoin=require('../models/historyCoinModel')
const startHistoryCron = () => {
  
  cron.schedule('0 * * * *', async () => {
    console.log('Running hourly history save...');
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
    
      
      } catch (err) {
        console.error('Error saving history:', err.message);      
      }
  });
};

// const getTop10Coinsafter30Min = () => {
//   cron.schedule('*/2 * * * *', async () => {
//     try {
//       const { data } = await axios.get(
//         'https://api.coingecko.com/api/v3/coins/markets',
//         {
//           params: {
//             vs_currency: 'usd',
//             order: 'market_cap_desc',
//             per_page: 10,
//             page: 1,
//           },
//         }
//       );

//       const mapped = data.map((coin) => ({
//         coinId: coin.id,
//         name: coin.name,
//         symbol: coin.symbol,
//         price: coin.current_price,
//         marketCap: coin.market_cap,
//         change24h: coin.price_change_percentage_24h,
//         timestamp: new Date(),
//       }));

//       await CurrentCoin.deleteMany({});
//       await CurrentCoin.insertMany(mapped);

//       console.log('Top 10 coins updated in DB.');
//     } catch (err) {
//       console.error(' Error fetching top 10 coins:', err.message);
//     }
//   });
// };

module.exports = {startHistoryCron};
