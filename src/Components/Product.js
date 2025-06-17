import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSearch, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, addToCart } from "../context/Actions/ProductActions";
import { filterProducts } from "../utils/filterProducts";
import useDropdownClose from "../hooks/Dropdown"; 
import ProductCard from './ProductCard';

function Product() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.allProducts);

  const [search, setSearchValue] = useState('');
  const [category, setCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);

  const categoryDropdownRef = useRef(null);
  const priceDropdownRef = useRef(null);
  const ratingDropdownRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  useDropdownClose(
    [categoryDropdownRef, priceDropdownRef, ratingDropdownRef],
    [setShowCategoryDropdown, setShowPriceDropdown, setShowRatingDropdown]
  );

  const filteredProducts = filterProducts(products, {
    search,
    category,
    priceFilter,
    ratingFilter
  });

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Item added to cart");
  };

  const handleCustomSelect = (setter, value, toggleSetter) => {
    setter(value);
    toggleSetter(false);
  };

  const categories = [
    { label: 'All Categories', value: 'All' },
    { label: "Men's Clothing", value: "men's clothing" },
    { label: "Women's Clothing", value: "women's clothing" },
    { label: "Jewelry", value: "jewelery" },
    { label: "Electronics", value: "electronics" },
  ];

  const priceFilters = [
    { label: 'All Prices', value: 'All' },
    { label: 'Under ₹500', value: '<500' },
    { label: '₹500 - ₹1000', value: '500-1000' },
    { label: 'Above ₹1000', value: '>1000' },
  ];

  const ratingFilters = [
    { label: 'All Ratings', value: 'All' },
    { label: '4⭐ & above', value: '4' },
    { label: '3⭐ & above', value: '3' },
    { label: '2⭐ & above', value: '2' },
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error loading products: {error}</p>
        <button onClick={() => dispatch(fetchProducts())}>Retry</button>
      </div>
    );
  }

  return (
    <div id="ProductSection">
      <div className="p1">
        <h2 className="p2">Our Styles - Fashion that speaks for you</h2>

        <div className="filters">
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

          <div className="dropdown1" ref={categoryDropdownRef}>
            <div className="dropdown2" onClick={() => setShowCategoryDropdown(prev => !prev)}>
              <span>{categories.find(c => c.value === category)?.label}</span>
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
            {showCategoryDropdown && (
              <ul className="dropdownlist">
                {categories.map(option => (
                  <li
                    key={option.value}
                    className="dropdownlistitem"
                    onClick={() => handleCustomSelect(setCategory, option.value, setShowCategoryDropdown)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

         
          <div className="dropdown1" ref={priceDropdownRef}>
            <div className="dropdown2" onClick={() => setShowPriceDropdown(prev => !prev)}>
              <span>{priceFilters.find(p => p.value === priceFilter)?.label}</span>
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
            {showPriceDropdown && (
              <ul className="dropdownlist">
                {priceFilters.map(option => (
                  <li
                    key={option.value}
                    className="dropdownlistitem"
                    onClick={() => handleCustomSelect(setPriceFilter, option.value, setShowPriceDropdown)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

      
          <div className="dropdown1" ref={ratingDropdownRef}>
            <div className="dropdown2" onClick={() => setShowRatingDropdown(prev => !prev)}>
              <span>{ratingFilters.find(r => r.value === ratingFilter)?.label}</span>
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
            {showRatingDropdown && (
              <ul className="dropdownlist">
                {ratingFilters.map(option => (
                  <li
                    key={option.value}
                    className="dropdownlistitem"
                    onClick={() => handleCustomSelect(setRatingFilter, option.value, setShowRatingDropdown)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

       
 <div className="p3">
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
      <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
    ))
  ) : (
    <div className="results">
      <p className="side">Sorry, no results found!</p>
      <p>Please check the spelling or try searching for something else.</p>
    </div>
  )}
</div>



      </div>
    </div>
  );
}

export default Product;

