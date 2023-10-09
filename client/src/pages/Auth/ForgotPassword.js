import React from 'react'
import Layout from '../../components/layout/Layout'
import '../../styles/AuthStyles.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    //form function{
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //出錯 ${process.env.REACT_APP_API}/api/vi/auth/register`， package.json 設定\ proxy: http://localhost:8080/
            const res = await axios.post(`/api/v1/auth/forgot-password`, { email, newPassword, answer });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);

                //目的是為了提供更好的使用者體驗，讓使用者在登入後可以返回到他們之前想要訪問的頁面。
                navigate("/login");
            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }

    return (
        <Layout title={'Forgot Password - Ecommerce App'}>
            <div className='register form-container vh-100'>
                <form onSubmit={handleSubmit}>
                    <h2 className='title'>RESET PASSWORD</h2>
                    <div className="mb-3">
                        <input type="email" className="form-control" id="inputEmail" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" required />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="inputAnswer" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Enter Your Favorite Sport Name" required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="inputPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter Your Password" />
                    </div>
                    <div className='d-flex flex-column'>
                        <button type="submit" className="btn mb-3 w-100">RESET</button>
                    </div>
                </form>

            </div>
        </Layout>
    )
}

export default ForgotPassword