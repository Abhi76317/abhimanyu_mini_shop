import React, { useState } from 'react';
import Input from '../component/Input';
import Buttons from '../component/Button';
import axios from '../service/axiosService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        password: ""
    })

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

    const handleRegister = () => {
        axios.post('/user/register', data).then((res) => {
            navigate('/')
        }).catch(err => console.log("err", err))
    }


    return (
        <div style={{ width: "30%", display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
            <h2 style={{ textAlign: 'center' }}>Register here</h2>
            <Input label={"Enter first name"} type={"text"} name={"firstName"} onChange={(e) => {
                handleChange(e)
            }} vlaue={data.firstName} />
            <Input label={"Enter last name"} type={"text"} name={"lastName"} onChange={(e) => {
                handleChange(e)
            }} vlaue={data.password} />
            <Input label={"Enter email"} type={"text"} name={"email"} onChange={(e) => {
                handleChange(e)
            }} vlaue={data.email} />
            <Input label={"Enter contact"} type={"text"} name={"contact"} onChange={(e) => {
                handleChange(e)
            }} vlaue={data.contact} />
            <Input label={"Enter last name"} type={"text"} name={"password"} onChange={(e) => {
                handleChange(e)
            }} vlaue={data.password} />
            <Buttons label={"Register"} onClick={() => {
                handleRegister()
            }} />
            <div style={{marginTop:'10px'}}>
                <Buttons label={"Already have account"} onClick={() => {
                    navigate("/")
                }} />
            </div>
        </div>
    );
}

export default Register;
