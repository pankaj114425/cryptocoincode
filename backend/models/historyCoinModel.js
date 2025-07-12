const mongoose = require('mongoose');

const historyCoinSchema = new mongoose.Schema({
  coinId: { type: String, required: true },
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  change24h: { type: Number },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('HistoryCoin', historyCoinSchema);