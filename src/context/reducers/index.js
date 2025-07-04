import { combineReducers } from 'redux';
import { productReducer } from './productReducer';
import { cartReducer } from './cartReducer';

const rootReducer = combineReducers({
   allProducts: productReducer,
   cart: cartReducer,
 
});

export default rootReducer;
