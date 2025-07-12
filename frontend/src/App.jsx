import { useState } from 'react'
import Home from './pages/Home'

import { Routes, Route, Link } from 'react-router-dom'
import CoinChart from './components/CoinChart'

function App() {


  return (
    <>
     
     <Routes>
      <Route path={'/'} element={<Home />}/>
       <Route path={'/coinchart/:id'} element={<CoinChart />}/>
     </Routes>
     
    </>
  )
}

export default App
