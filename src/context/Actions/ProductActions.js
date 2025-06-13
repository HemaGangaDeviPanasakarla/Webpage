import { ActionTypes } from "../Constant/action-type";

export const setProducts = (products) => ({
    type: ActionTypes.SET_PRODUCTS,
    payload: products
});

export const selectedProduct = (product) => ({
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product
});

export const addToCart = (product) => ({
    type: ActionTypes.ADD_TO_CART,
    payload: product
});


export const fetchProducts = () => async (dispatch) => {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        const formattedProducts = data.map(p => ({
            id: p.id,
            title: p.title,
            image: p.image,
            price: p.price,
            category: p.category,
            rating: p.rating?.rate || 0
        }));
        dispatch(setProducts(formattedProducts));
    } catch (error) {
        console.error("Error fetching products:", error);
        dispatch({ 
            type: ActionTypes.FETCH_PRODUCTS_ERROR, 
            payload: error.message 
        });
    }
};