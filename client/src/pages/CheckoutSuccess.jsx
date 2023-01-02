import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../service/axiosService';
import { useSelector } from 'react-redux';

const CheckoutSuccess = () => {
    const cartItem = useSelector((state) => state.cartState.cart)
    const [isOrder, setIsOrder] = useState(false)
    const [order_id, setOrder_id] = useState('')
    useEffect(() => {
        axios.post('/order', { order_attribute: cartItem }).then((res) => {
            if(res.success){
                setIsOrder(true)
                setOrder_id(res.data.id)
            }
        }).catch(err => console.log(err))
    }, []);
    const navigate = useNavigate();
    return (
        <>
            {
                isOrder &&
                <div style={{textAlign:'center'}}>
                    <h1>
                        Your order successfully 
                    </h1>
                    <h2>order id: {order_id}</h2>
                    <h2>Thank you</h2>
                </div>
            }
        </>
    );
}

export default CheckoutSuccess;
