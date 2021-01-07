import { cartConstants } from "../actions/constants"


const initState={
    cartItems: localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):{},
    updatingCart: false,
    error: null

}

export default (state =initState,action) =>{
    switch(action.type){
        case cartConstants.ADD_TO_CART__REQUEST:
            state ={
                ...state,
                updatingCart: true

            }
            return state;
        case cartConstants.ADD_TO_CART__SUCCESS:
            state ={
                ...state,
                cartItems: action.payload.cartItems,
                updatingCart: false
            }
            return state;
        case cartConstants.ADD_TO_CART__FAILURE:
            state ={
                ...state,
                updatingCart: false,
                error : action.payload.error
            }
            return state;
        case cartConstants.RESET_CART:
            state ={
                ...state,
                cartItems: action.payload.cartItems
            }
    }
    return state;
}