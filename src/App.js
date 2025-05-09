
import './App.css';
import React from 'react';
import Header from './Componets/header';
import Footer from './Componets/Footer';
import Products from './Componets/Product'
import Home from './Componets/Home'
function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Home  />
        <Products />
      </main>
      <Footer />
    </div>
  );
}

export default App;