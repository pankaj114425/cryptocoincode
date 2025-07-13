import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CoinsContext = createContext();

export const CoinsProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
      
    const savecoinhistory=async()=>{
     try {
         const res = await axios.post('https://cryptocoincode.onrender.com/api/history');
         console.log(` History saved: ${res.data.count} coins`);
       } catch (error) {
         console.error(' Failed to save history:', error.message);
       }
    }
    const fetchCoins = async () => {
      try {
        const res = await axios.get(
          "https://cryptocoincode.onrender.com/api/coins"
        );
        setCoins(res.data);
        console.log("Coins fetched:", res.data);
      } catch (error) {
        console.error("Failed to fetch coins:", error);
      }
    };

    const delay = 30 * 60 * 1000 - (Date.now() % (30 * 60 * 1000));
    const timeout = setTimeout(() => {
      fetchCoins();
      setInterval(fetchCoins, 30 * 60 * 1000);
    }, delay);

    fetchCoins();
    savecoinhistory();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <CoinsContext.Provider value={{ coins }}>{children}</CoinsContext.Provider>
  );
};

export const useCoins = () => useContext(CoinsContext);
