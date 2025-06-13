import { ActionTypes } from "../Constant/action-type";

const initialState = {
    products: [],
    loading: true,
    error: null
};

export const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_PRODUCTS:
            return {
                ...state,
                products: payload,
                loading: false,
                error: null
            };
        case ActionTypes.FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            };
        default:
            return state;
    }
};