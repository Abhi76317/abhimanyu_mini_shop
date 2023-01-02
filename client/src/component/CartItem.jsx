import React from 'react';

const CartItem = (props) => {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 10px' }}>
                <h3>{props.data.product_name}</h3>
                <h4>price: {props.data.product_price}</h4>
            </div>
            <div style={{ width: '30%', display: 'flex', justifyContent: 'space-between', padding: '0px 10px' }}>
                <p>color: {props.data.product_color}</p>
                <p>size: {props.data.product_size}</p>
            </div>
        </div>
    );
}

export default CartItem;
