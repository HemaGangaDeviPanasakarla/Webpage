
import './App.css';
import React from 'react';
import Header from './Components/header';
import Footer from './Components/Footer';
import Product from './Components/Product'
import Home from './Components/Home'
function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Home  />
        <Product />
      </main>
      <Footer />
    </div>
  );
}

export default App;