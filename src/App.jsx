import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Import Routes
import 'react-toastify/dist/ReactToastify.css'; // Add this in your main file
import './App.css';
import Header from './Layout/Header';
import Home from './PAGES/Home/Home';
import Index from './PAGES/Write/Index';
import Update from './PAGES/Write/Update';
import Footer from './Layout/Footer';
import SignIn from './PAGES/Home/Signin';
import SignUp from './PAGES/Home/Signup';
import ContactUs from './PAGES/Home/Contect';
import PrivateRoute from './PAGES/Home/PrivateRoute';
import { CssBaseline } from '@mui/material';
import Inventory from './PAGES/Write/Inventory';
import ItemDetailsPage from './PAGES/Home/ItemDetailsPage';
import SupplierManagement from './PAGES/Home/SupplierManagement';

import CartPage from './PAGES/Home/CartPage';
import { CartProvider } from './context/CartContext';
import OrderHistory from './PAGES/Home/OrderHistory';
import InventoryList from './PAGES/Home/InventoryList';


function App() {

  return (
    <>
      <Router>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            path="/"
            element={
              <CartProvider>
              <PrivateRoute>
                <Home />
              </PrivateRoute>
              </CartProvider>
            }
          />
          
          <Route path="/Index" element={<PrivateRoute><Index /></PrivateRoute>} />
          <Route path="/ItemDetails/:id" element={<CartProvider><PrivateRoute><ItemDetailsPage /></PrivateRoute></CartProvider>} />
          <Route path="/edit/:id" element={<PrivateRoute><Update /></PrivateRoute>} />
          <Route path="/add" element={<PrivateRoute><Inventory /></PrivateRoute>} />
          <Route path="/InventoryList" element={<CartProvider><PrivateRoute><InventoryList /></PrivateRoute></CartProvider>} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/SupplierManagement" element={<PrivateRoute><SupplierManagement /></PrivateRoute>} />
          <Route path="/cart" element={<CartProvider><CartPage /></CartProvider>} />
          <Route path="/orderhistory" element={<CartProvider><OrderHistory /></CartProvider>} />


        </Routes>
        <Footer />
      </Router >
    </>
  )
}

export default App

