import { userConstants } from "../actions/constants";


const initState ={
    address: [],
    error: null,
    loading: false
}

export default (state = initState,action) =>{
    switch (action.type) {
        case userConstants.GET_USER_ADDRESS__REQUEST:
            return state = {
                ...state,
                loading: true,
            }
        case userConstants.GET_USER_ADDRESS__SUCCESS:
            return state = {
                ...state,
                address: action.payload.address,
                loading: false,
            }
        case userConstants.GET_USER_ADDRESS__FAILURE:
            return state = {
                ...state,
                error: action.payload.error,
                loading: false,
            }
        case userConstants.ADD_USER_ADDRESS__REQUEST:
            return state={
                
                    ...state,
                    loading: true,
            }
        case userConstants.ADD_USER_ADDRESS__SUCCESS:
            return state = {
                ...state,
                address: action.payload.address,
                loading: false,
            }
        case userConstants.GET_USER_ADDRESS__FAILURE:
            return state = {
                ...state,
                error: action.payload.error,
                loading: false,
            }
    
    }
    return state;
}   