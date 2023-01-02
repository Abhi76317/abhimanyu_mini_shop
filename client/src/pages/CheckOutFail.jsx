import React from 'react';
import { useNavigate } from 'react-router-dom';
import Buttons from '../component/Button';

const CheckOutFail = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h2>Payment faild due to some issue</h2>
            <Buttons label={"back to cart"} onClick={()=>{
                navigate('/cart')
            }}/>
        </div>
    );
}

export default CheckOutFail;
