import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CoinsProvider } from './context/CoinsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CoinsProvider>
    <BrowserRouter>
     <App />
    </BrowserRouter>
    </CoinsProvider>
   
  </StrictMode>,
)
