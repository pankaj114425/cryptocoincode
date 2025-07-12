
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [currentTime, setCurrentTime] = useState('');
 const navigate=useNavigate()
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString(); 
      setCurrentTime(formattedTime);
    };

    updateTime(); 
    const interval = setInterval(updateTime, 1000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <header className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md py-4 px-6 flex items-center justify-between ">
   
      <div className=" cursor-pointer">
        <img src="/crypto.jpg" alt="Logo" className="w-10 h-10 rounded-full shadow-md" onClick={() => navigate('/')}/>
        
      </div>

      
      <div className="text-sm sm:text-base font-mono font-medium">
        🕒 <span className="inline-block  text-right">{currentTime}</span>
      </div>
    </header>
  );
};

export default Header;
