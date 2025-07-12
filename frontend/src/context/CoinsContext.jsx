import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';


const CoinsContext = createContext();


export const CoinsProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get('https://cryptocoincode.onrender.com/api/coins');
        setCoins(res.data);
        console.log("Coins fetched:", res.data);
      } catch (error) {
        console.error("Failed to fetch coins:", error);
      }
    };

 
    const delay = 30 * 60 * 1000 - (Date.now() % (30 * 60 * 1000));
    const timeout = setTimeout(() => {
      fetchCoins();
      setInterval(fetchCoins, 5 * 60 * 1000);
    }, delay);

    fetchCoins();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <CoinsContext.Provider value={{ coins }}>
      {children}
    </CoinsContext.Provider>
  );
};


export const useCoins = () => useContext(CoinsContext);
