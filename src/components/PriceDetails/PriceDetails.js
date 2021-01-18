import React from 'react'
import Card from "../UI/Card/Card"
const PriceDetails = (props) => {
    return (
        <Card
            style={{
                padding: '20px',
                boxSizing: 'border-box'
            }}
        >
            <div
                className="flexRow sb"
                style={{margin: '10px 0'}}
            >
                <div>Price ({props.totalItems} items)</div>
                <div>{props.totalPrice}</div>
            </div>
            <div
                className="flexRow sb"
                style={{margin: '10px 0'}}
            >
                <div>Delivery Charges</div>
                <div>FREE</div>
            </div>
            <div 
                className="flexRow sb"
                style={{margin: '10px 0'}}
            >
                <div>Total Amount</div>
                <div>{props.totalPrice}</div>
            </div>
        </Card>
    )
}

export default PriceDetails