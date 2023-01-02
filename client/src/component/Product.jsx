import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItem } from '../redux/slice/cartSlice';

export default function Product(props) {

    const dispatch = useDispatch();

    const cartItem = useSelector((state) => state.cartState.cart)

    const [Product_Color_id, setProduct_Color_id] = useState();
    const [Product_Size_id, setProduct_Size_id] = useState();
    const [product_color, set_product_color] = useState('')
    const [product_size, set_product_size] = useState('');

    const handleColor = (e) => {
        setProduct_Color_id(e.target.value);
        const data = props.data.product_color.filter(ele => ele.id === e.target.value)
        set_product_color(data[0].color)
    }

    const handleSize = (e) => {
        setProduct_Size_id(e.target.value);
        const data = props.data.product_size.filter(ele => ele.id === e.target.value)
        set_product_size(data[0].size)
    }

    useEffect(() => {
        setProduct_Color_id(props.data.product_color[0].id);
        set_product_color(props.data.product_color[0].color);
        setProduct_Size_id(props.data.product_size[0].id);
        set_product_size(props.data.product_size[0].size)
    }, []);

    const addToCart = () => {
        const order_attribute = [...cartItem];

        const obj = {
            product_id: props.data.id,
            product_name: props.data.product_name,
            Product_Color_id: Product_Color_id,
            product_color: product_color,
            Product_Size_id: Product_Size_id,
            product_size: product_size,
            product_price: props.data.price
        }

        order_attribute.push(obj);

        dispatch(setCartItem(order_attribute))
    }

    const removeToCart = () => {
        const order_attribute = cartItem.filter(ele => ele.product_id !== props.data.id)
        dispatch(setCartItem(order_attribute))
    }

    return (
        <Card style={{ border: '1px solid black' }}>
            <CardMedia
                component="img"
                height="140"
                image={`${process.env.REACT_APP_NODE_SERVER}/${props.data.product_image}`}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.data.product_name}
                </Typography>
                <Typography variant="h6" component="div">
                    Price: {props.data.price}
                </Typography>
            </CardContent>
            <CardActions>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '40%' }}>
                        <div>
                            <select name="color" id="colors" onChange={handleColor}>
                                {
                                    props.data.product_color.map((ele, i) => {
                                        return (
                                            <option value={ele.id} key={i}>{ele.color}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <select name="size" id="size" onChange={handleSize}>
                                {
                                    props.data.product_size.map((ele, i) => {
                                        return (
                                            <option value={ele.id} key={i}>{ele.size}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    {
                        cartItem && cartItem.some(ele => ele.product_id === props.data.id) ?
                            <button onClick={removeToCart} style={{ cursor: 'pointer' }}>remove to cart</button>
                            :
                            <button onClick={addToCart} style={{ cursor: 'pointer' }}>add to cart</button>
                    }

                </div>
            </CardActions>
        </Card>
    );
}

