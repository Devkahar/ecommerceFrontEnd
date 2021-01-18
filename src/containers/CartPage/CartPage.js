import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateQty, getCartItems } from '../../actions/actions'
import Layout from '../../components/Layout/Layout'
import { MaterialButton } from '../../components/Material UI'
import PriceDetails from '../../components/PriceDetails/PriceDetails'
import Card from '../../components/UI/Card/Card'
import { generatePublicUrl } from '../../urlConfig'
import CartItem from './CartItem'

import "./CartPage.css"
const CartPage = (props) => {
    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);
    // const cartItems = cart.cartItems;
    const dispatch = useDispatch();
    const [cartItems,setCartItems] = useState(cart.cartItems);
    const onQuantityIncrement = (_id,qty)=>{
        console.log({_id,qty});
        dispatch(updateQty(_id,qty));
        
    }
    const onQuantityDecrement = (_id,qty)=>{
        console.log({_id,qty});
        dispatch(updateQty(_id,qty));
    }
    useEffect(()=>{
        setCartItems(cart.cartItems)
    },[cart.cartItems]);
    console.log(cartItems);

    useEffect(()=>{
        if(auth.authenticate){
            dispatch(getCartItems());
        }
    },[auth])
    return (
        <Layout>
            <div className="cartContainer">
                <Card
                    headerLeft={`My Cart`}
                    headerRight={<div>Deliver to</div>}
                    style={{width: 'calc(100%-400px)', overflow: 'hidden'}}
                >
                    {
                        cartItems &&
                        Object.keys(cartItems).map((key,index)=>
                        <CartItem
                            key={index}
                            cartItem={cartItems[key]}
                            onQuantityInc={onQuantityIncrement}
                            onQuantityDec={onQuantityDecrement}
                         />
                        )
                    }
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        backgroundColor: '#fff',
                        justifyContent: 'flex-end',
                        boxShadow: '0 0 10px 10px #eee',
                        padding: '10px 0',
                        boxSizing: 'border-box'
                    }}>
                        <div style={{width: '250px'}}>
                            <MaterialButton title="PLACE ORDER" onClick={()=> props.history.push(`/checkout`) } />
                        </div>
                    </div>
                </Card>
                <Card 
                style={{
                    width: '380px',
                }}
                >Price</Card>
                <PriceDetails
                    totalItems={Object.keys(cart.cartItems).reduce((qty,key)=>{
                        return qty + cart.cartItems[key].qty;
                    },0)}
                    totalPrice={Object.keys(cart.cartItems).reduce((totalPrice,key)=>{
                        const {price, qty} = cart.cartItems[key];
                        return totalPrice+ price* qty;
                    },0)}
                />
            </div>
            
        </Layout>
    )
}

export default CartPage
