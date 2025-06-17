import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const ProductCard = React.memo(function ProductCard({ product, onAddToCart }) {
  return (
    <div className="p4">
      <img src={product.image} alt={product.title} className="p5" />
      <span className="p6">{product.title}</span>
      <span className="pp">Rs.{product.price}</span>
      <span className="rating">⭐ {product.rating}</span>
      <button className="addcart" onClick={() => onAddToCart(product)}>
        <FontAwesomeIcon icon={faCartPlus} className="cartbutton" />
        <h6>Add to Cart</h6>
      </button>
    </div>
  );
});

export default ProductCard;

