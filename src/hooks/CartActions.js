import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyProduct, removeFromCart, updateCartItem } from "../context/Actions/CartActions";
import {toast} from 'react-toastify';
import {useState} from 'react'


export function CartActions(){
    const dispatch=useDispatch();
    const items=useSelector((state)=>state.cart.items);
    const [loading,setLoading] = useState(false);


    const increment=useCallback((id)=>{
        const item =items.find(item =>item.id === id);
        if(item){
            dispatch(updateCartItem(id,item.quantity +1));
        }
    },[items,dispatch]);

    const decrement =useCallback((id)=>{
        const item =items.find(item =>item.id ===id);
        if(item && item.quantity >1){
           dispatch(updateCartItem(id,item.quantity -1));
        }
    },[items,dispatch]);


    const removeItem =useCallback((id)=>{
      dispatch(removeFromCart(id));
      toast.info("Item removed from cart",{autoClose:1000});
    },[dispatch])


   const checkout =useCallback(async (onclose,navigate)=>{
    setLoading(true);
    try {
       await dispatch(buyProduct(items));
       onclose();
       navigate("/checkout");
        
    } catch (error) {

        toast.error("Something went wrong")
        
    } finally{
        setLoading(false);
    }
   },[dispatch,items])
    return{
        items,
        increment,
        decrement,
        removeItem,
        checkout,
        loading
    }


}
