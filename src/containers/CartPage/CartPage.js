import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateQty, getCartItems } from '../../actions/actions'
import Layout from '../../components/Layout/Layout'
import Card from '../../components/UI/Card/Card'
import { generatePublicUrl } from '../../urlConfig'
import CartItem from './CartItem'

import "./CartPage.css"
const CartPage = () => {
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
                    
                </Card>
                <Card 
                style={{
                    width: '500px',
                }}
                >Price</Card>
            </div>
            
        </Layout>
    )
}

export default CartPage
