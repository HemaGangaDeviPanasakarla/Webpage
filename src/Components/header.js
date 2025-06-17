import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux"; 

function Header({ toggleCart }) {
  const [MenuOpen, setMenuOpen] = useState(false);
  const cartCount = useSelector((state) => state.cart.count); 

  const toggleMenu = () => {
    setMenuOpen(!MenuOpen);
  };

  return (
    <div className="header">
      <div className="brand">
        <span className="brand-text">
          <Link to="/home" className="list">Our Styles</Link>
        </span>
      </div>

      <div className="menu" onClick={toggleMenu}>
        <span>☰</span>
      </div>

      <div className={`links ${MenuOpen ? "show" : ""}`} id="navLinks">
        <Link to="/home" className="list">Home</Link>
        <Link to="/products" className="list">Products</Link>
        <span className="list cart-icon" onClick={toggleCart}>
          <FontAwesomeIcon icon={faShoppingCart} />
          {cartCount > 0 && <span className="cart">{cartCount}</span>} 
        </span>
      </div>
    </div>
  );
}

export default Header;
