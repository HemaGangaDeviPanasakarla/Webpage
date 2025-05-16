

import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState} from "react"; 
import { faCartPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function Product() {
  const [products, setProducts] = useState([]);
  const [search, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        const apiData = data.map(p => ({
          id: p.id,
          title: p.title,
          image: p.image,
          price: p.price,
          category: p.category
        }));
        setProducts(apiData);
        setIsLoading(false);
       
      })
      .catch(err => {
        toast.error("Failed to load products.");
        setIsLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (product) => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const index = cartItems.findIndex(item => item.id === product.id);

    if (index !== -1) {
      toast.info(`Item is already in Your cart`);
    } else {
      cartItems.push({ ...product, quantity: 1 });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
      localStorage.setItem("cartCount", cartCount);

      const cartCountChangedEvent = new CustomEvent("cartCountChanged", { detail: cartCount });
      window.dispatchEvent(cartCountChangedEvent);

      toast.success(`Item added to cart`);
    }
  };

  return (
    <div id="ProductSection">
      <div className="p1">
        <h2 className="p2">Our Styles - Fashion that speaks for you</h2>

        <div className="search">
          <FontAwesomeIcon icon={faSearch} className="icon" />
          <input
            className="input"
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearchValue(e.target.value)}
            autoFocus
          />
        </div>

        {!isLoading && (
          <div className="p3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product.id} className="p4">
                  <img src={product.image} alt={product.title} className="p5" />
                  <span className="p6">{product.title}</span>
                  <span className="pp">Rs.{product.price}</span>
                  <button className="addcart" onClick={() => handleAddToCart(product)}>
                    <FontAwesomeIcon icon={faCartPlus} className="cartbutton" />
                    <h6>Add to Cart</h6>
                  </button>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p className="side">Sorry, no results found!</p>
                <p>Please check the spelling or try searching for something else.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
