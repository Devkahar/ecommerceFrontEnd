

import axiosInstance from '../helpers/axios';
import store from '../store/store'
import { cartConstants } from './constants';

const getCartItems = ()=>{
    return async dispatch =>{
        try {
            dispatch({type: cartConstants.ADD_TO_CART__REQUEST});
            const res = await axiosInstance.get('/user/cart/getCartItems');
            if(res.status === 200){
                const {cartItems} = res.data;
                console.log({getCartItems: cartItems});
                if(cartItems){
                    dispatch({
                        type: cartConstants.ADD_TO_CART__SUCCESS,
                        payload: { cartItems}
                    })
                }
            }else{
                dispatch({type: cartConstants.ADD_TO_CART__FAILURE})
            }
        }catch (error) {
            console.log(error);
        }
    }
 }
 export const addToCart = (product, newQty = 1) => {
    return async (dispatch) => {
      const {
        cart: { cartItems },
        auth,
      } = store.getState();
      //console.log('action::products', products);
      //const product = action.payload.product;
      //const products = state.products;
      const qty = cartItems[product._id]
        ? parseInt(cartItems[product._id].qty + newQty)
        : 1;
      cartItems[product._id] = {
        ...product,
        qty,
      };
  
      if (auth.authenticate) {
        dispatch({ type: cartConstants.ADD_TO_CART__REQUEST });
        const payload = {
          // cartItems: Object.keys(cartItems).map((key, index) => {
          //     return {
          //         quantity: cartItems[key].qty,
          //         product: cartItems[key]._id
          //     }
          // })
          cartItems: [
            {
              product: product._id,
              quantity: qty,
            },
          ],
        };
        console.log(payload);
        const res = await axiosInstance.post(`/user/cart/addtocart`, payload);
        console.log(res);
        if (res.status === 201) {
          dispatch(getCartItems());
        }
      } else {
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }
  
      console.log("addToCart::", cartItems);
  
      dispatch({
        type: cartConstants.ADD_TO_CART__SUCCESS,
        payload: { cartItems },
      });
    };
  };


export const updateQty = (_id,qty)=>{
    return async dispatch =>{
        const {cartItems} = store.getState().cart;
        const data = cartItems[_id];
        data.qty = qty;
        cartItems[_id]={
            ...data
        }
        localStorage.setItem('cart',JSON.stringify(cartItems));
        dispatch({type:cartConstants.RESET_CART ,payload:{
            cartItems
        }})
    } 
}

export const updateCart = ()=>{
    return async dispatch =>{
        const {auth} = store.getState();
        let cartItems = localStorage.getItem('cart') ? 
        JSON.parse(localStorage.getItem('cart')) : null;

        console.log('upppp');

        if(auth.authenticate){
            localStorage.removeItem('cart');
            if(cartItems){
                const payload ={
                    cartItem: Object.keys(cartItems).map((key,index)=>{
                        return{
                            quantity: cartItems[key].qty,
                            product: cartItems[key]._id
                        }
                    })
                }
                if(Object.keys(cartItems).length >0){
                    const res = await axiosInstance.post('/user/cart/addToCart',payload);
                    if(res.status === 201){
                        dispatch(getCartItems());
                    }
                }else{
                    if(cartItems){
                        dispatch({
                            type: cartConstants.ADD_TO_CART__SUCCESS,
                            payload: { cartItems }
                        })
                    }
                }
            }
        }
    }
}

export {
    getCartItems
}