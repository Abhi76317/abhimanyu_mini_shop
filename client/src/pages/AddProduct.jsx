import React, { useState } from 'react';
import Input from '../component/Input';
import Buttons from '../component/Button';
import axios from '../service/axiosService';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const navigate = useNavigate()

    const [data, setData] = useState({
        product_name: "",
        color: "",
        size: "",
        price: ""
    })
    const [image, setImage] = useState()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(preVal => {
            return (
                {
                    ...preVal, [name]: value
                }
            )
        })
    }
    const handleChangeImage = (e) => {
        setImage(e.target.files[0])
    }

    const handleAddProduct = () => {
        const formData = new FormData();
        formData.append('product_image', image);
        formData.append('product_name', data.product_name);
        formData.append('price', data.price);
        const color = data.color.split(',');
        formData.append('product_color', color);
        const size = data.size.split(',');
        formData.append('product_size', size)

        axios.post('/add/product', formData).then((res) => {
            navigate('/product')
        }).catch(err => console.log(err))
    }
    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            <div style={{ width: "50%", display: 'flex', flexDirection: 'column' }}>
                <Input label={"Enter product name"} type={"text"} name={"product_name"} onChange={(e) => {
                    handleChange(e)
                }} vlaue={data.product_name} />
                <Input label={"Enter product price"} type={"number"} name={"price"} onChange={(e) => {
                    handleChange(e)
                }} />
                <Input label={""} type={"file"} name={"product_image"} onChange={(e) => {
                    handleChangeImage(e)
                }} />
                <Input label={"Enter colors (red, blue, green)"} type={"text"} name={"color"} onChange={(e) => {
                    handleChange(e)
                }} vlaue={data.color} />
                <Input label={"Enter Size (M, S, L)"} type={"text"} name={"size"} onChange={(e) => {
                    handleChange(e)
                }} vlaue={data.size} />
                <Buttons label={"Add product"} onClick={() => {
                    handleAddProduct()
                }} />
            </div>
        </div>
    );
}

export default AddProduct;
