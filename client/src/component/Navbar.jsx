import React from 'react';
import Buttons from './Button';
import { useDispatch } from 'react-redux';
import { unsetLocalUserAndToken } from '../redux/slice/localUserSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const cartItem = useSelector((state) => state.cartState.cart)
    return (
        <div style={{
            background: '#343a40',
            width: '100%',
            minHeight: '50px',
            position: 'fixed',
            top: 0,
            display: 'flex',
            justifyContent: 'center'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>
                <p style={{ color: 'white' }}>Company name</p>
                <div style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Badge badgeContent={cartItem?.length} color="primary">
                        <ShoppingCartIcon style={{ color: 'white', cursor: 'pointer' }} onClick={() => {
                            navigate('/cart')
                        }} />
                    </Badge>
                    <Buttons label={"Logout"} onClick={() => {
                        dispatch(unsetLocalUserAndToken())
                    }} />
                </div>
            </div>

        </div>
    );
}

export default Navbar;
