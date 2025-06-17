import "./Cart.css";
import { FaTimes, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { calculateCartTotal } from '../utils/cartTotal'
import { CartActions } from "../hooks/CartActions";
function Cart({ isOpen, onClose }) {
  const navigate = useNavigate();
  const {items,increment,decrement,removeItem,checkout,loading}=CartActions();
  const total =calculateCartTotal(items)
  

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

      {items.length === 0 ? (
        <div className="emptycart">
          <p>No Product in the Cart</p>
        </div>
      ) : (
        <>
          <div className="c3">
            {items.map((item) => (
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
              onClick={()=>checkout(onClose,navigate) }
              disabled={loading}
            >
          {loading ? "Processing..." :"Buy"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
