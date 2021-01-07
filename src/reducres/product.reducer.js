import { productConstants } from "../actions/constants"

const initState ={
    products: [],
    productByPrice:{
        under5k: [],
        under10k: [],
        under15k: [],
        under20k: [],
        under25k: [],
    },
    pageRequest: false,
    page:{},
    productDetails:{},
    loading: false,
    error: null,
}

export default (state =initState,action) =>{
    switch(action.type){
        case productConstants.GET_PRODUCTS_BY_SLUG:
            state = {
                ...state,
                products : action.payload.products,
                productByPrice: action.payload.productByPrice
            }
            return state
        case productConstants.GET_PRODUCT_PAGE_REQUEST:
            state = {
                ...state,
                pageRequest:true,
            }
            return state
        case productConstants.GET_PRODUCT_PAGE_SUCCESS:
            state = {
                ...state,
                pageRequest:false,
                page: action.payload.page
            }
            return state
        case productConstants.GET_PRODUCT_PAGE_FAILURE:
            state = {
                ...state,
                pageRequest:false,
                error: action.payload.error
            }
            return state
        case productConstants.GET_PRODUCT_DETAILS_BY_EID_REQUEST:
            state ={
                ...state,
                loading: true
            }
            return state
        case productConstants.GET_PRODUCT_DETAILS_BY_EID_SUCCESS:
            state ={
                ...state,
                loading: false,
                productDetails: action.payload.productDetails
            }
            return state
        case productConstants.GET_PRODUCT_DETAILS_BY_EID_FAILURE:
            state ={
                ...state,
                loading: false,
                error: action.payload.error
            }
            return state;
    }
    return state;
}