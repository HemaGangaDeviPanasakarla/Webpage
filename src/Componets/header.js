import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const handleNavigation = (id) => {
    const pageList = ["homeSection", "productSection", "cartSection"];
    pageList.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
   
        element.style.display = sectionId === id ? "block" : "none";
      }
    });
  };

  const toggleMenu = () => {
    document.getElementById("navLinks").classList.toggle("show");
  };

  return (
    <div className="header">
      <div className="brand">
        <span className="brand-text">Andhra Sweets</span>
      </div>
      <div className="menu" onClick={toggleMenu}>
        <span>☰</span>
      </div>
      <div className="links" id="navLinks">
        <span className="list" onClick={() => handleNavigation("homeSection")}>
          Home
        </span>
        
        <span className="list" onClick={() => handleNavigation("productSection")}>
          Products
        </span>
        <span className="list cart-icon">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span id="cartCount" className="cart">
           0
          </span>
        </span>
      </div>
    </div>
  );
}

export default Header;

