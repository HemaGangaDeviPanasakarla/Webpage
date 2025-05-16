
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function Header({ toggleCart }) {
  const [MenuOpen, MenuClosed] = useState(false);
  const [cartCount, NewCount] = useState(0);

  const toggleMenu = () => {
    MenuClosed(!MenuOpen);
  };

  const handleNavigation = (id) => {
    const pageList = ["homeSection", "ProductSection"];
    pageList.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.style.display = sectionId === id ? "block" : "none";
      }
    });
    MenuClosed(false);
  };

  useEffect(() => {
    const storedCartCount = localStorage.getItem("cartCount");
    if (storedCartCount) {
      NewCount(Number(storedCartCount));
    }

    const handleCountChange = (event) => {
      NewCount(event.detail);
    };

    window.addEventListener("cartCountChanged", handleCountChange);

    return () => {
      window.removeEventListener("cartCountChanged", handleCountChange);
    };
  }, []);

  return (
    <div className="header">
      <div className="brand">
        <span className="brand-text" onClick={() => handleNavigation("homeSection")}>
          Our Styles
        </span>
      </div>

      <div className="menu" onClick={toggleMenu}>
        <span>☰</span>
      </div>

      <div className={`links ${MenuOpen ? "show" : ""}`} id="navLinks">
        <a href="#homeSection" className="list" onClick={() => handleNavigation("homeSection")}>
          Home
        </a>

        <a href="#ProductSection" className="list" onClick={() => handleNavigation("ProductSection")}>
          Products
        </a>

        <span className="list cart-icon" onClick={toggleCart}>
          <FontAwesomeIcon icon={faShoppingCart} />
          {cartCount > 0 && <span className="cart">{cartCount}</span>}
        </span>
      </div>
    </div>
  );
}

export default Header;
