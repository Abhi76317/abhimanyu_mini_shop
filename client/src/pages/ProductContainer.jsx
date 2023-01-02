import React, { useState, useEffect } from 'react';
import Buttons from '../component/Button';
import Product from '../component/Product';
import { useNavigate } from 'react-router-dom';
import axios from '../service/axiosService';

const ProductContainer = () => {
    const navigate = useNavigate();

    const [product, setProduct] = useState([])

    useEffect(() => {
        axios.get('/get/product').then((res) => {
            setProduct(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, []);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '80%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Buttons label={"Add Product"} onClick={() => {
                            navigate('/add/product')
                        }} />
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                        {
                            product.map((ele, i) => {
                                return (
                                    <div style={{ width: '30%', padding: '1%',minWidth:'230px' }} key={i}>
                                        <Product data={ele} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductContainer;
