import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../component/CartItem';
import Buttons from '../component/Button';
import axios from '../service/axiosService';
import { useNavigate } from 'react-router-dom';

const CartView = () => {
    const navigate = useNavigate();

    const cartItem = useSelector((state) => state.cartState.cart)

    useEffect(() => {
       if(cartItem.length < 1) {
        navigate('/product')
       }
    }, []);

    const handelClick = () => {
        axios.post('/create-checkout-session', { order_attribute: cartItem }).then((res) => {
            if (res.url) {
                window.location.href = res.url;
            }
        }).catch(err => console.log(err))
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '40%' }}>
                {
                    cartItem && cartItem.map((ele) => {
                        return (
                            <div style={{ border: '1px solid black', marginTop: '2%' }}>
                                <CartItem data={ele} />
                            </div>
                        )
                    })
                }
                <Buttons label={"place order"} onClick={() => {
                    handelClick()
                }} />
            </div>
        </div>
    );
}

export default CartView;
