



import "./Cart.css";
import { useEffect, useState, useCallback } from "react";
import { FaTimes, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cart({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedItems);
  }, [isOpen]);

  const calculateCartCount = (items) =>
    items.reduce((sum, item) => sum + item.quantity, 0);

  const updateCart = useCallback((items) => {
    const newCount = calculateCartCount(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
    localStorage.setItem("cartCount", newCount);
    setCartItems(items);

    const cartCountChangedEvent = new CustomEvent("cartCountChanged", {
      detail: newCount,
    });
    window.dispatchEvent(cartCountChangedEvent);
  }, []);

  const increment = useCallback((id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  }, [cartItems, updateCart]);

  const decrement = useCallback((id) => {
    const updated = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(updated);
  }, [cartItems, updateCart]);

  const removeItem = useCallback((id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCart(updated);
    toast.info("Item removed from cart", { autoClose: 1500 });
  }, [cartItems, updateCart]);



  const goToCheckout = () => {
    onClose();
    navigate("/checkOut");
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={`c1 ${isOpen ? "open" : ""}`}>
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
        <div className="emptycart">
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
                    <button onClick={() => decrement(item.id)} disabled={item.quantity <= 1}>-</button>
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
            <br /> <br /> <br />
            <button
              className="buybutton"
              onClick={goToCheckout}
            >
              Buy
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;