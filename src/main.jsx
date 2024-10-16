import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { InventoryProvider } from './context/InventoryContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InventoryProvider>
      <CartProvider>
      <App />
      </CartProvider>
    
    </InventoryProvider>

  </StrictMode>,
)
