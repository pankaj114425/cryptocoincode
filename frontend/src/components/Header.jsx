// import { useEffect, useState } from 'react';

// const Header = () => {
//   const [currentTime, setCurrentTime] = useState('');

//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date();
//       const formattedTime = now.toLocaleTimeString(); // e.g., "2:30:05 PM"
//       setCurrentTime(formattedTime);
//     };

//     updateTime(); // set immediately
//     const interval = setInterval(updateTime, 1000); // update every second

//     return () => clearInterval(interval); // cleanup on unmount
//   }, []);

//   return (
//     <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between gap-2">
//       {/* Left - Image */}
//       <div className="flex items-center gap-2">
//         <img src="/crypto.jpg" alt="Logo" className="w-10 h-10" />
//       </div>

//       {/* Right - Current Time */}
//         <div className="text-sm text-gray-600 text-center">
//     <span className="block sm:inline">🕒 Current Time:</span>{' '}
//     <span
//       className="font-mono font-medium inline-block min-w-[100px] text-right"
//     >
//       {currentTime}
//     </span>
//   </div>
//     </header>
//   );
// };

// export default Header;
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
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
   
      <div className="flex items-center gap-3 cursor-pointer">
        <img src="/crypto.jpg" alt="Logo" className="w-10 h-10 rounded-full shadow-md" onClick={() => navigate('/')}/>
        
      </div>

      
      <div className="text-sm sm:text-base font-mono font-medium">
        🕒 Current Time: <span className="inline-block min-w-[100px] text-right">{currentTime}</span>
      </div>
    </header>
  );
};

export default Header;
