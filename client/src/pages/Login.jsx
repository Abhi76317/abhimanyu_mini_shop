import React, { useState } from 'react';
import Input from '../component/Input';
import Buttons from '../component/Button';
import axios from '../service/axiosService';
import { useDispatch } from 'react-redux';
import { setLocalUser, setToken } from '../redux/slice/localUserSlice';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [data, setData] = useState({
        email: "",
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

    const handleLogin = () => {
        axios.post('/user/login', data).then((res) => {
            dispatch(setLocalUser(res.user));
            dispatch(setToken(res.token))
        }).catch(err => console.log("err", err))
    }


    return (
        <div style={{ width: "30%", minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
            <h2 style={{ textAlign: 'center' }}>Login here</h2>
            <Input label={"Enter email or contact"} type={"text"} name={"email"} onChange={(e)=>{
                handleChange(e)
            }} vlaue={data.email} />
            <Input label={"Enter password"} type={"password"} name={"password"} onChange={(e)=>{
                handleChange(e)
            }} vlaue={data.password} />
            <Buttons label={"Login"} onClick={() => {
                handleLogin()
            }} />
            <Buttons label={"New User"} onClick={() => {
                navigate('/register')
            }} />
        </div>
    );
};

export default Login;
