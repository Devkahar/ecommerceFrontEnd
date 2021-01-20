import axiosInstance from "../helpers/axios"
import { userConstants } from "./constants";


export const getAddress = ()=>{
    return async dispatch =>{
        try {
            dispatch({
                type: userConstants.GET_USER_ADDRESS__REQUEST})
            const res = await axiosInstance.get('/user/getAddress');
            if(res.status === 200){
                const address = res.data.userAddress.address;
                console.log(address);
                dispatch({
                    type: userConstants.GET_USER_ADDRESS__SUCCESS, payload: { address}
                })
            }else{
                const {error} = res.data;
                console.log(res.data);
                dispatch({
                    type: userConstants.GET_USER_ADDRESS__FAILURE,
                    payload: {error}
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}
export const addAddress = (payload)=>{
    return async dispatch =>{
        try {
            const res = await axiosInstance.post('/user/address/create',{payload});
            dispatch({type: userConstants.ADD_USER_ADDRESS__REQUEST})
            if(res.status === 201){
                console.log(res);
                const { address:{address}} = res.data;
                dispatch({
                    type: userConstants.ADD_USER_ADDRESS__SUCCESS, payload: { address}
                })
            }else{
                const {error} = res.data;
                dispatch({
                    type: userConstants.ADD_USER_ADDRESS__FAILURE,
                    payload: {error}
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}
export const addOrder = (payload)=>{
    return async dispatch =>{
        try {
            const res = await axiosInstance.post('/addOrder',payload);
            dispatch({type: userConstants.ADD_ORDER__REQUEST})
            if(res.status === 201){
                console.log(res);
                // const { address:{address}} = res.data;
                // dispatch({
                //     type: userConstants.ADD_ORDER__SUCCESS, payload: { address}
                // })
            }else{
                const {error} = res.data;
                // dispatch({
                //     type: userConstants.ADD_ORDER__FAILURE,
                //     payload: {error}
                // })
            }
        } catch (error) {
            console.log(error);
        }
    }
}