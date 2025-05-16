
import "./Cart.css";
import { useEffect, useState } from "react";
import { FaTimes, FaTrashAlt } from 'react-icons/fa';

function Cart({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedItems);
  }, [isOpen]);

  const calculateCartCount = (items) =>
    items.reduce((sum, item) => sum + item.quantity, 0);

  // const updateCart = (items) => {
  //   const newCount = calculateCartCount(items);
  //   console.log(newCount)
  //   localStorage.setItem("cartItems", JSON.stringify(items));
  //   localStorage.setItem("cartCount", newCount);
  //   setCartItems(items);
  // };

  const updateCart = (items) => {
  const newCount = calculateCartCount(items);
  localStorage.setItem("cartItems", JSON.stringify(items));
  localStorage.setItem("cartCount", newCount);
  setCartItems(items);

  // Dispatch the custom event to notify the Header component
  const cartCountChangedEvent = new CustomEvent("cartCountChanged", { detail: newCount });
  window.dispatchEvent(cartCountChangedEvent); // Trigger the event to notify the Header
};

  const increment = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const decrement = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    console.log(updated)
    updateCart(updated);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div  className={`c1 ${isOpen ? "open" : ""}`}>
      <div className="c2">
        <h2>Your Cart</h2>
        <button onClick={onClose} className="cross">
          <FaTimes size={24} color="black" />
        </button>
      </div>

      <br /><br />
      <hr />
      <br /><br />

      {cartItems.length === 0 ? (
        // <p>No Product in the Cart</p>
        <div className="empty-cart">
  <p>No Product in the Cart</p>

</div>

        
      ) : (
        <>
          <div className="c3">
            {cartItems.map((item) => (
              <div key={item.id} className="item">
                <img src={item.image} alt={item.title} />
                <div>
                  <h4>{item.title}</h4>
                  <p>Rs.{item.price} × {item.quantity}</p>
                  <br />
                  <div className="c4">
                    <button onClick={() => decrement(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increment(item.id)}>+</button>
                    <span className="remove" onClick={() => removeItem(item.id)}>
                      <FaTrashAlt />
                    </span>
                  </div>
                  <div className="separator">
                    <div className="line"></div>
                    <span className="separator-text"></span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <strong>Total: Rs.{total.toFixed(2)}</strong>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;


// import { useEffect, useState } from "react";
// import { FaTimes, FaTrashAlt } from "react-icons/fa";

// function Cart({ isOpen, onClose }) {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//     setCartItems(storedItems);
//   }, [isOpen]);

//   const calculateCartCount = (items) =>
//     items.reduce((sum, item) => sum + item.quantity, 0);

//   const updateCart = (items) => {
//     const newCount = calculateCartCount(items); // Calculate total quantity of items
//     localStorage.setItem("cartItems", JSON.stringify(items)); // Save updated cart items
//     localStorage.setItem("cartCount", items.length); // Save number of items in cart for badge (not quantity)
//     setCartItems(items); // Update state with new cart items
//   };

//   const increment = (id) => {
//     const updated = cartItems.map((item) =>
//       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//     );
//     updateCart(updated); // Only update cart page state, cart badge stays the same
//   };

//   const decrement = (id) => {
//     const updated = cartItems.map((item) =>
//       item.id === id && item.quantity > 1
//         ? { ...item, quantity: item.quantity - 1 }
//         : item
//     );
//     updateCart(updated); // Only update cart page state, cart badge stays the same
//   };

//   const removeItem = (id) => {
//     const updated = cartItems.filter((item) => item.id !== id);
//     updateCart(updated); // Update the cart page after item removal
//   };

//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className={`c1 ${isOpen ? "open" : ""}`}>
//       <div className="c2">
//         <h2>Your Cart</h2>
//         <button onClick={onClose} className="cross">
//           <FaTimes size={24} color="black" />
//         </button>
//       </div>
//       <br />
//       <br />
//       <hr />
//       <br />
//       <br />
//       {cartItems.length === 0 ? (
//         <div className="empty-cart">
//           <p>No Product in the Cart</p>
//         </div>
//       ) : (
//         <>
//           <div className="c3">
//             {cartItems.map((item) => (
//               <div key={item.id} className="item">
//                 <img src={item.image} alt={item.title} />
//                 <div>
//                   <h4>{item.title}</h4>
//                   <p>Rs.{item.price} × {item.quantity}</p>
//                   <br />
//                   <div className="c4">
//                     <button onClick={() => decrement(item.id)}>-</button>
//                     <span>{item.quantity}</span>
//                     <button onClick={() => increment(item.id)}>+</button>
//                     <span
//                       className="remove"
//                       onClick={() => removeItem(item.id)}
//                     >
//                       <FaTrashAlt />
//                     </span>
//                   </div>
//                   <div className="separator">
//                     <div className="line"></div>
//                     <span className="separator-text"></span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="total">
//             <strong>Total: Rs.{total.toFixed(2)}</strong>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Cart;
