// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import router from './router';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>   
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
