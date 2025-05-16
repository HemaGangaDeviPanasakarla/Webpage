
import './App.css';
import React, { useState } from 'react';
import Header from './Components/header';
import Footer from './Components/Footer';
import Product from './Components/Product';
import Home from './Components/Home';
import Cart from './Components/Cart';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <div className="app">
        <ToastContainer position="top-center" autoClose={1000} />

        <Header toggleCart={() => setIsCartOpen(!isCartOpen)} />

        <main className="main-content">
          <Routes>
             <Route path="/Webpage" element={<Home />} />       
             <Route path="/home" element={<Home />} />
             <Route path="/products" element={<Product />} />
          </Routes>

        </main>

        <Footer />

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </Router>
  );
}

export default App;

