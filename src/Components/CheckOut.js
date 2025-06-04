import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './CheckOut.css';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentOption: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false); 

  const navigate = useNavigate();
  const nameRef = useRef(null);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedItems);

    if (nameRef.current) {
      nameRef.current.focus();
    }

    if (storedItems.length === 0) {
      toast.error("Your cart is empty!");
      navigate('/products');
    }

  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    try
     {
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      localStorage.removeItem("cartItems");
      localStorage.setItem("cartCount", "0");

      const cartCountChangedEvent = new CustomEvent("cartCountChanged", { detail: 0 });
      window.dispatchEvent(cartCountChangedEvent);

      toast.success("Thank you! Your order has been placed successfully", {
        autoClose: 4000,
         onClose: () => {
        navigate('/home')
    }
      });
 
      setOrderConfirmed(true); 

    } 
    
    catch (error) {
      toast.error("Something went wrong. Please try again.");
    } 
    
    finally {
      setIsSubmitting(false);
    }
  };


  if (orderConfirmed) {
    console.log(orderConfirmed)
    return (
      <div className="checkout">
        <br/> <br /> <br/>  <br/> <br /> <br/>
        <div className="confirmation">
          <h2>Order Delivered!</h2>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Address:</strong> {formData.address}</p>
          <p><strong>Payment Method:</strong> {formData.paymentOption}</p>
          {/* <p><strong>Total Items:</strong> {cartItems.length}</p> */}
          <p><strong>Total Amount:</strong> Rs.{total.toFixed(2)}</p>
         
        </div>
      </div>
    );
  }


  return (
    <div className="checkout">
      <br />
      <div className="checkout1">
        <h1>Checkout</h1>
        <div className="summary">
          <h2>Order Summary</h2>
          <div className="orders">
            {cartItems.map(item => (
              <div key={item.id} className="item">
                <img src={item.image} alt={item.title} />
                <div className="details">
                  <h4>{item.title}</h4>
                  <p>Rs.{item.price} × {item.quantity} = Rs.{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="ordertotal">
            <strong>Total: Rs.{total.toFixed(2)}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <h2>Billing Information</h2>

          <div className="form1">
            <label htmlFor="name">Full Name</label>
            <input
              ref={nameRef}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="errormessage">{errors.name}</span>}
          </div>

          <div className="form1">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="errormessage">{errors.email}</span>}
          </div>

          <div className="form1">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={errors.address ? 'error' : ''}
              placeholder="Enter your complete address"
              rows="3"
            />
            {errors.address && <span className="errormessage">{errors.address}</span>}
          </div>

          <div className="form1">
            <label htmlFor="paymentOption">Payment Method</label>
            <select
              id="paymentOption"
              name="paymentOption"
              value={formData.paymentOption}
              onChange={handleInputChange}
            >
              <option value="select any option">select any option</option>
            <option value="Phone Pay">Phone Pay</option>
              <option value="Gpay">Gpay</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
        
            </select>
          </div>

          <div className="formactions">
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="button1"
            >
              Back to Shopping
            </button>
            <button
              type="submit"
             className="button1"
            >
              {isSubmitting ? 'Processing...' : `Place Order (Rs.${total.toFixed(2)})`}
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
}

export default Checkout;
