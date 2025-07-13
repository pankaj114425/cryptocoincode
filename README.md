1. Tech Stack Used
Frontend: React.js (with Tailwind CSS for styling)
Backend: Node.js + Express.js
Database: MongoDB Atlas
API Source: CoinGecko Public API
Scheduler: node-cron (for automating history saving)
Deployment:
Frontend: Vercel
Backend: Render

2. Setup and Installation Steps
git clone https://github.com/pankaj114425/cryptocoincode.git
cd cryptocoin
Backend Setup (/backend)
cd backend
npm init -y
npm install express dotenv cors mongoose node-cron axios

Create a .env file in /backend and add your MongoDB URI and any environment variables:
PORT=8080
MONGO_URI=your_mongodb_connection_string

Start the server
npm run server

Frontend Setup (/frontend)
cd ../
npm create @latest vite frontend
cd frontend
npm install
start the frontend
npm run dev



3. How your cron job works
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
The startHistoryCron function sets up a scheduled task using node-cron that runs every hour.
 It fetches the top 10 cryptocurrencies from the CoinGecko API and saves a snapshot
  (including name, price, market cap, 24h change, etc.) into the HistoryCoin MongoDB collection.
   This helps track historical price data for charts. The cron job is triggered automatically when 
   the backend starts. You can change the frequency (e.g., every 5 minutes) by updating the cron expression.

4. Links
Frontend Link: https://cryptocoincode.vercel.app/
backend Link:  https://cryptocoincode.onrender.com


