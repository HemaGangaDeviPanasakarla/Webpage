
import { ActionTypes } from "../Constant/action-type";

export const removeFromCart = (productId) => ({
    type: ActionTypes.REMOVE_FROM_CART,
    payload: productId
});

export const updateCartItem = (productId, quantity) => ({
    type: ActionTypes.UPDATE_CART_ITEM,
    payload: { productId, quantity }
});

export const buyProduct = (cartItems) => {
  return {
    type: ActionTypes.BUY_PRODUCT,
    payload: cartItems,
  };
};

export const clearCart = () => {
  return {
    type: ActionTypes.CLEAR_CART,
  };
};

export const setOrderDetails = (formData) => ({
  type: ActionTypes.SET_ORDER_DETAILS,
  payload: formData,
});