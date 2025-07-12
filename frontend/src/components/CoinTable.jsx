import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



const CoinTable = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState(' ');
  const [sortOrder, setSortOrder] = useState('desc');
   const [coins, setCoins] = useState([]);
  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredData = coins
    .filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });



  useEffect(() => {
    const fetchTopTenCoins = async () => {
      try {
        const res = await axios.get('https://cryptocoincode.onrender.com/api/coins');
        console.log(res.data)
        setCoins(res.data);
      } catch (err) {
        console.error('Error fetching top 10 coins:', err);
      }
    };

    fetchTopTenCoins(); 

    const interval = setInterval(fetchTopTenCoins, 5*60*1000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-base  mx-auto  md:text-2xl font-bold text-center text-black-700 mb-6 w-fit bg-gray-200 p-2 rounded-xl">
        Real-Time Top 10 Crypto Currency Tracker
    </h2>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="🔍 Search by coin name or symbol..."
          className="px-4 py-2 border rounded w-full sm:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex items-center justify-between gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded"
          >
            <option value="">Sort by</option>
            <option value="price">Price</option>
            <option value="marketCap">Market Cap</option>
            <option value="change24h">24h % Change</option>
          </select>

          <button
            onClick={handleSortToggle}
            className="bg-gray-400 text-white px-3 py-2 rounded hover:bg-indigo-500 w-[100px]"
          >
            {sortOrder === 'asc' ? '🔼 Asc' : '🔽 Desc'}
          </button>
        </div>
      </div>

    <div className="overflow-x-auto">
  <div className="max-h-[450px] overflow-y-auto">
    <table className="min-w-full bg-white border border-gray-200 rounded shadow-md">
      <thead className="bg-gray-200 text-gray-700 text-sm sticky top-0">
        <tr>
          <th className="p-3 text-left">Coin Name</th>
          <th className="p-3 text-left">Symbol</th>
          <th className="p-3 text-left">Price (USD)</th>
          <th className="p-3 text-left">Market Cap</th>
          <th className="p-3 text-left">24h % Change</th>
          <th className="p-3 text-left">Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((coin) => (
          <tr key={coin.coinId} className="border-t hover:bg-gray-50 transition">
            <td className="p-3 font-semibold"> <Link to={`/coinchart/${coin.coinId}`}>{coin.name}</Link></td>
            <td className="p-3 uppercase">{coin.symbol}</td>
            <td className="p-3">${coin.price.toLocaleString()}</td>
            <td className="p-3">${coin.marketCap.toLocaleString()}</td>
            <td
              className={`p-3 ${
                coin.change24h >= 0 ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {coin.change24h.toFixed(2)}%
            </td>
            <td className="p-3 text-sm text-gray-500">
              {new Date(coin.timestamp).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


      {filteredData.length === 0 && (
        <p className="text-center mt-6 text-gray-500">No coins match your search.</p>
      )}
    </div>
  );
};

export default CoinTable;
