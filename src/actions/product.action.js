import ProductDetailsPage from "../containers/ProductDetailsPage/ProductDetailsPage";
import axios from "../helpers/axios"
import { productConstants } from "./constants";

export const getProductBySlug = (slug)=>{
    return async dispatch =>{
        const res = await axios.get(`/products/${slug}`);
        if(res.status===200){
            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG,
                payload: res.data,
            })
        }
        console.log(res);
    }
}
export const getProductPage = (payload)=>{
    return async dispatch =>{
        try {
            const {cid,type}= payload;
            dispatch({type: productConstants.GET_PRODUCT_PAGE_REQUEST});
            const res = await axios.get(`/page/${cid}/${type}`);
            console.log(res);
            if(res.status===201){
                const {page} = res.data;

                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
                    payload: {page},
                })
            }else{
                const {error} = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_FAILURE,
                    payload: {error},
                })
            }
            console.log(res);
        } catch (error) {
            console.log(error)
        }
        
    }
}

export const getProductDetailsById = (payload)=>{
    return async dispatch =>{
        dispatch({type: productConstants.GET_PRODUCT_DETAILS_BY_EID_REQUEST});
        let res;
        try {
            const {productId} = payload.params;
            res = await axios.get(`/product/${productId}`);
            console.log(res);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_EID_SUCCESS,
                payload: {productDetails: res.data.product}
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_EID_FAILURE,
                payload: {error: error}
            });
        }
    }
}