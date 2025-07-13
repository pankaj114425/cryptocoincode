import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';

const CoinChart = () => {
  const [history, setHistory] = useState([]);
  const { id: coinId } = useParams();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`https://cryptocoincode.onrender.com/api/history/${coinId}`);
        setHistory(res.data);
      } catch (err) {
        console.error('Error fetching history:', err.message);
      }
    };

    fetchHistory();
  }, [coinId]);

  const formatted = history?.map((entry) => ({
    price: entry.price,
    time: new Date(entry.timestamp).toLocaleTimeString(),
  }));

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-200'>
    <Header/>
     <div className="max-w-5xl mt-10 mx-auto px-4 py-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-base sm:text-3xl font-bold text-center text-indigo-700 mb-6">
        📈 Price History of {coinId.charAt(0).toUpperCase() + coinId.slice(1)}
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={formatted}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
          <XAxis
            dataKey="time"
            stroke="#4B5563"
            tick={{ fontSize: 12 }}
            label={{ value: 'Time', position: 'insideBottomRight', offset: -5 }}
          />
          <YAxis
            stroke="#4B5563"
            domain={['auto', 'auto']}
            tick={{ fontSize: 12 }}
            label={{ value: 'Price ($)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}
            labelStyle={{ fontWeight: 'bold', color: '#374151' }}
            formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#6366f1"
            strokeWidth={3}
            activeDot={{ r: 6 }}
            dot={{ r: 3 }}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
    </div>
   
  );
};

export default CoinChart;
