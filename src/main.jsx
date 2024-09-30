import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import CoinContextProvider from './Context/CoinContex.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
<CoinContextProvider>
<App />
</CoinContextProvider>
  </BrowserRouter>
  </StrictMode>
   
 
)
