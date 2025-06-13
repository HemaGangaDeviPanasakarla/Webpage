

// import './App.css';
// import React, { useState } from 'react';
// import Header from './Components/header';
// import Footer from './Components/Footer';
// import Product from './Components/Product';
// import Home from './Components/Home';
// import Cart from './Components/Cart';
// import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import Checkout from './Components/CheckOut'

// function App() {
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   return (
//     <Router>
//       <div className="app">
//         <ToastContainer position="top-center" autoClose={1000} />
        
//         <Header toggleCart={() => setIsCartOpen(!isCartOpen)} />
        
//         <main className="main">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/products" element={<Product />} />
//             <Route path="/checkout" element={<Checkout />} />
//           </Routes>
//         </main>
        
//         <Footer />
        
//         <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
//       </div>
//     </Router>
//   );
// }

// export default App;

import './App.css';
import React, { useState } from 'react';
import Header from './Components/header';
import Footer from './Components/Footer';
import Product from './Components/Product';
import Home from './Components/Home';
import Cart from './Components/Cart';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from './Components/CheckOut';
import { Provider } from 'react-redux';
import store from './context/store'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <ToastContainer position="top-center" autoClose={1000} />
          
          <Header toggleCart={() => setIsCartOpen(!isCartOpen)} />
          
          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Product />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          
          <Footer />
          
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;