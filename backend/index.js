const express = require('express');
const colors = require('colors'); 
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cryptoRoutes = require('./routes/cryptoRoute');
const {startHistoryCron,getTop10Coinsafter30Min} = require('./cron/crone');
const cors = require('cors');
dotenv.config(); 

const app = express();
app.use(express.json()); 
app.use(cors())
// Connect to MongoDB
connectDB();

// Routes
startHistoryCron()
getTop10Coinsafter30Min()
app.use('/api', cryptoRoutes);

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_MODE} mode on port ${port}`.bgCyan.white
  );
});
