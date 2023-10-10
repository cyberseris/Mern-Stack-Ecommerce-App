import '../../styles/AuthStyles.css';
import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from "../../context/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    //form function{
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //出錯 ${process.env.REACT_APP_API}/api/vi/auth/register`， package.json 設定\ proxy: http://localhost:8080/

            const res = await axios.post(`/api/v1/auth/login`, { email, password });

            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                //目的是為了提供更好的使用者體驗，讓使用者在登入後可以返回到他們之前想要訪問的頁面。
                navigate(location.state || "/");
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
                    <div className='d-flex flex-column'>
                        <button type="submit" className="btn submit mb-3">LOGIN</button>
                        <button type="button" className="btn" onClick={() => { navigate('/forgot-password') }}>Forgot Password</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Login;