import '../../styles/AuthStyles.css';
import { useState, useEffect } from 'react';

import Layout from '../../components/layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from "../../context/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();

    //form function{
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //出錯 ${process.env.REACT_APP_API}/api/vi/auth/register`， package.json 設定\ proxy: http://localhost:8080/
            const res = await axios.post(`/api/v1/auth/login`, { email, password });
            if (res && res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate("/");
            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
            /* console.log(error) */
            toast.error('Something went wrong')
        }
    }

    return (
        <Layout title={'Login - Ecommerce App'}>
            <div className='register form-container vh-100'>
                <form onSubmit={handleSubmit}>
                    <h2 className='title'>LOGIN FORM</h2>
                    <div className="mb-3">
                        <input type="email" className="form-control" id="inputEmail" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="inputPassword" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" />
                    </div>
                    <button type="submit" className="btn submit">LOGIN</button>
                </form>

            </div>
        </Layout>
    )
}

export default Login;