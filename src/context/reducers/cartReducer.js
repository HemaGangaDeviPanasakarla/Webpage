import { ActionTypes } from "../Constant/action-type";

const initialState = {
  items: [],
  count: 0,
  checkOutItems: [],
   orderDetails: {},
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case ActionTypes.ADD_TO_CART:
      const existingItem = state.items.find((item) => item.id === payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          count: state.count + 1,
        };
      }
      return {
        ...state,
        items: [...state.items, { ...payload, quantity: 1 }],
        count: state.count + 1,
      };

    case ActionTypes.REMOVE_FROM_CART:
      const itemToRemove = state.items.find((item) => item.id === payload);
      return {
        ...state,
        items: state.items.filter((item) => item.id !== payload),
        count: state.count - (itemToRemove?.quantity || 0),
      };

    case ActionTypes.UPDATE_CART_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === payload.productId
            ? { ...item, quantity: payload.quantity }
            : item
        ),
        count: state.items.reduce(
          (total, item) =>
            total +
            (item.id === payload.productId
              ? payload.quantity
              : item.quantity),
          0
        ),
      };

    case ActionTypes.CLEAR_CART:
      return {
        ...state,
        items: [],
        count: 0,
        checkOutItems: [],
      };

    case ActionTypes.BUY_PRODUCT:
      return {
        ...state,
        checkOutItems: payload,
      };


    case ActionTypes.SET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails:payload,
      } 

    default:
      return state;
  }
};
