


// import "./Product.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useEffect, useState, useRef } from "react";
// import { faCartPlus, faSearch, faChevronDown } from "@fortawesome/free-solid-svg-icons"; 
// import { toast } from "react-toastify";
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchProducts } from '../context/Actions/ProductActions';

// function Product() {
//   const dispatch = useDispatch();
//   const { products, loading, error } = useSelector((state) => state.allProducts);
  
//   const [search, setSearchValue] = useState('');
//   const [category, setCategory] = useState('All');
//   const [priceFilter, setPriceFilter] = useState('All');
//   const [ratingFilter, setRatingFilter] = useState('All');
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
//   const [showPriceDropdown, setShowPriceDropdown] = useState(false);
//   const [showRatingDropdown, setShowRatingDropdown] = useState(false);

//   const categoryDropdownRef = useRef(null);
//   const priceDropdownRef = useRef(null);
//   const ratingDropdownRef = useRef(null);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
//         setShowCategoryDropdown(false);
//       }
//       if (priceDropdownRef.current && !priceDropdownRef.current.contains(event.target)) {
//         setShowPriceDropdown(false);
//       }
//       if (ratingDropdownRef.current && !ratingDropdownRef.current.contains(event.target)) {
//         setShowRatingDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const filteredProducts = products.filter(product => {
//     const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
//     const matchesCategory = category === 'All' || product.category.toLowerCase() === category.toLowerCase();
//     const matchesPrice = priceFilter === 'All' ||
//       (priceFilter === '<500' && product.price < 500) ||
//       (priceFilter === '500-1000' && product.price >= 500 && product.price <= 1000) ||
//       (priceFilter === '>1000' && product.price > 1000);
//     const matchesRating = ratingFilter === 'All' || product.rating >= parseFloat(ratingFilter);

//     return matchesSearch && matchesCategory && matchesPrice && matchesRating;
//   });

//   const handleAddToCart = (product) => {
//     let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//     const index = cartItems.findIndex(item => item.id === product.id);

//     if (index !== -1) {
//       toast.info(`Item already in Your cart`);
//     } else {
//       cartItems.push({ ...product, quantity: 1 });
//       localStorage.setItem("cartItems", JSON.stringify(cartItems));

//       const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
//       localStorage.setItem("cartCount", cartCount);

//       const cartCountChangedEvent = new CustomEvent("cartCountChanged", { detail: cartCount });
//       window.dispatchEvent(cartCountChangedEvent);

//       toast.success(`Item added to cart`);
//     }
//   };

//   const handleCustomSelect = (setter, value, toggleSetter) => {
//     setter(value);
//     toggleSetter(false);
//   };

//   const categories = [
//     { label: 'All Categories', value: 'All' },
//     { label: "Men's Clothing", value: "men's clothing" },
//     { label: "Women's Clothing", value: "women's clothing" },
//     { label: "Jewelry", value: "jewelery" },
//     { label: "Electronics", value: "electronics" },
//   ];

//   const priceFilters = [
//     { label: 'All Prices', value: 'All' },
//     { label: 'Under ₹500', value: '<500' },
//     { label: '₹500 - ₹1000', value: '500-1000' },
//     { label: 'Above ₹1000', value: '>1000' },
//   ];

//   const ratingFilters = [
//     { label: 'All Ratings', value: 'All' },
//     { label: '4⭐ & above', value: '4' },
//     { label: '3⭐ & above', value: '3' },
//     { label: '2⭐ & above', value: '2' },
//   ];

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//         <p>Loading products...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="error-container">
//         <p>Error loading products: {error}</p>
//         <button onClick={() => dispatch(fetchProducts())}>Retry</button>
//       </div>
//     );
//   }

//   return (
//     <div id="ProductSection">
//       <div className="p1">
//         <h2 className="p2">Our Styles - Fashion that speaks for you</h2>

//         <div className="filters">
//           <div className="search">
//             <FontAwesomeIcon icon={faSearch} className="icon" />
//             <input
//               className="input"
//               type="search"
//               placeholder="Search products..."
//               value={search}
//               onChange={e => setSearchValue(e.target.value)}
//               autoFocus
//             />
//           </div>

//           <div className="dropdown1" ref={categoryDropdownRef}>
//             <div className="dropdown2" onClick={() => setShowCategoryDropdown(prev => !prev)}>
//               <span>{categories.find(c => c.value === category)?.label}</span>
//               <FontAwesomeIcon icon={faChevronDown} />
//             </div>
//             {showCategoryDropdown && (
//               <ul className="dropdownlist">
//                 {categories.map(option => (
//                   <li
//                     key={option.value}
//                     className="dropdownlistitem"
//                     onClick={() => handleCustomSelect(setCategory, option.value, setShowCategoryDropdown)}
//                   >
//                     {option.label}
//                   </li>
//                 ))}
//               </ul>
//             )}
//             <select 
//               value={category} 
//               onChange={e => setCategory(e.target.value)} 
//               className="hidden-select" 
//               aria-hidden="true" 
//               tabIndex="-1"
//             >
//               {categories.map(option => (
//                 <option key={option.value} value={option.value}>{option.label}</option>
//               ))}
//             </select>
//           </div>

//           <div className="dropdown1" ref={priceDropdownRef}>
//             <div className="dropdown2" onClick={() => setShowPriceDropdown(prev => !prev)}>
//               <span>{priceFilters.find(p => p.value === priceFilter)?.label}</span>
//               <FontAwesomeIcon icon={faChevronDown} />
//             </div>
//             {showPriceDropdown && (
//               <ul className="dropdownlist">
//                 {priceFilters.map(option => (
//                   <li
//                     key={option.value}
//                     className="dropdownlistitem"
//                     onClick={() => handleCustomSelect(setPriceFilter, option.value, setShowPriceDropdown)}
//                   >
//                     {option.label}
//                   </li>
//                 ))}
//               </ul>
//             )}
//             <select 
//               value={priceFilter} 
//               onChange={e => setPriceFilter(e.target.value)} 
//               className="hidden-select" 
//               aria-hidden="true" 
//               tabIndex="-1"
//             >
//               {priceFilters.map(option => (
//                 <option key={option.value} value={option.value}>{option.label}</option>
//               ))}
//             </select>
//           </div>

//           <div className="dropdown1" ref={ratingDropdownRef}>
//             <div className="dropdown2" onClick={() => setShowRatingDropdown(prev => !prev)}>
//               <span>{ratingFilters.find(r => r.value === ratingFilter)?.label}</span>
//               <FontAwesomeIcon icon={faChevronDown} />
//             </div>
//             {showRatingDropdown && (
//               <ul className="dropdownlist">
//                 {ratingFilters.map(option => (
//                   <li
//                     key={option.value}
//                     className="dropdownlistitem"
//                     onClick={() => handleCustomSelect(setRatingFilter, option.value, setShowRatingDropdown)}
//                   >
//                     {option.label}
//                   </li>
//                 ))}
//               </ul>
//             )}
//             <select 
//               value={ratingFilter} 
//               onChange={e => setRatingFilter(e.target.value)} 
//               className="hidden-select" 
//               aria-hidden="true" 
//               tabIndex="-1"
//             >
//               {ratingFilters.map(option => (
//                 <option key={option.value} value={option.value}>{option.label}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="p3">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map(product => (
//               <div key={product.id} className="p4">
//                 <img src={product.image} alt={product.title} className="p5" />
//                 <span className="p6">{product.title}</span>
//                 <span className="pp">Rs.{product.price}</span>
//                 <span className="rating">⭐ {product.rating}</span>
//                 <button className="addcart" onClick={() => handleAddToCart(product)}>
//                   <FontAwesomeIcon icon={faCartPlus} className="cartbutton" />
//                   <h6>Add to Cart</h6>
//                 </button>
//               </div>
//             ))
//           ) : (
//             <div className="results">
//               <p className="side">Sorry, no results found!</p>
//               <p>Please check the spelling or try searching for something else.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Product;


import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faSearch, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../context/Actions/ProductActions";
import { addToCart } from "../context/Actions/ProductActions";

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
      if (priceDropdownRef.current && !priceDropdownRef.current.contains(event.target)) {
        setShowPriceDropdown(false);
      }
      if (ratingDropdownRef.current && !ratingDropdownRef.current.contains(event.target)) {
        setShowRatingDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || product.category.toLowerCase() === category.toLowerCase();
    const matchesPrice =
      priceFilter === 'All' ||
      (priceFilter === '<500' && product.price < 500) ||
      (priceFilter === '500-1000' && product.price >= 500 && product.price <= 1000) ||
      (priceFilter === '>1000' && product.price > 1000);
    const matchesRating = ratingFilter === 'All' || product.rating >= parseFloat(ratingFilter);

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
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
          {/* Search Input */}
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

          {/* Category Dropdown */}
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

          {/* Price Dropdown */}
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

          {/* Rating Dropdown */}
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

        {/* Products Grid */}
        <div className="p3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="p4">
                <img src={product.image} alt={product.title} className="p5" />
                <span className="p6">{product.title}</span>
                <span className="pp">Rs.{product.price}</span>
                <span className="rating">⭐ {product.rating}</span>
                <button className="addcart" onClick={() => handleAddToCart(product)}>
                  <FontAwesomeIcon icon={faCartPlus} className="cartbutton" />
                  <h6>Add to Cart</h6>
                </button>
              </div>
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
