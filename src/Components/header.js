import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Header() {

  const handleNavigation = (id) => {
    const pageList = ["homeSection", "ProductSection", "cartSection"];
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
        <span className="brand-text" onClick={() => handleNavigation("homeSection")}>Andhra Sweets</span>
      </div>
      <div className="menu" onClick={toggleMenu}>
        <span>☰</span>
      </div>
      <div className="links" id="navLinks">

        <a href="#homeSection" className="list"  onClick={() => handleNavigation('homeSection')}>Home</a>
        <a href="#ProductSection" className="list"  onClick={() => handleNavigation('ProductSection')}>Products</a>

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

