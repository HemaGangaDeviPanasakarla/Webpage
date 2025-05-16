

// import './App.css';
// import React, { useState } from 'react';
// import Header from './Components/header';
// import Footer from './Components/Footer';
// import Product from './Components/Product';
// import Home from './Components/Home';
// import Cart from './Components/Cart';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function App() {
//   const [cartItems, setCartItems] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   const addToCart = (product) => {
//     setCartItems(prevItems => {
//       const existingItem = prevItems.find(item => item.id === product.id);
//       if (existingItem) {
//         return prevItems.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevItems, { ...product, quantity: 1 }];
//     });
//   };



//   const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <div className="app">
//       <ToastContainer position="top-center" autoClose={1000} />
//       <Header 
//         cartCount={cartCount}
//         toggleCart={() => setIsCartOpen(!isCartOpen)} 
//       />
//       <main className="main-content">
//         <Home />
//         <Product addToCart={addToCart} />
//       </main>
//       <Footer />
//       <Cart
//         isOpen={isCartOpen}
//         onClose={() => setIsCartOpen(false)}
//         cartItems={cartItems}
//       />
//     </div>
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);


  return (
    <div className="app">
      <ToastContainer position="top-center" autoClose={1000} />
      <Header 
        toggleCart={() => setIsCartOpen(!isCartOpen)} 
      />
      <main className="main-content">
        <Home />
        <Product />
      </main>
      <Footer />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}

export default App;


