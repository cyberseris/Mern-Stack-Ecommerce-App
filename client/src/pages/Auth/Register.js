import '../../styles/AuthStyles.css';
import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
/* import { toast } from 'react-toastify'; */
import toast from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    //form function{
    const handleSubmit = async (e) => {
        e.preventDefault();
        /*  console.log(name, email, password, address, phone); */
        try {
            //出錯 ${process.env.REACT_APP_API}/api/vi/auth/register`， package.json 設定\ proxy: http://localhost:8080/
            const res = await axios.post(`/api/v1/auth/register`, { name, email, password, phone, address, answer });
            if (res && res.data.success) {
                toast.success('res.data.message');
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
        <Layout title={'Register - Ecommerce App'}>
            <div className='register form-container vh-100'>
                <form onSubmit={handleSubmit}>
                    <h2 className='title'>REGISTER FORM</h2>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="inputName" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name" required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="inputPassword" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" id="inputEmail" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" required />
                    </div>
                    <div className="mb-3">
                        <input type="tel" className="form-control" id="inputPhone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Your Phone" required />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="inputAddress" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Your Address" required />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="inputAnswer" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="What is Your Favorite Sports?" required />
                    </div>
                    <button type="submit" className="btn submit w-100">Submit</button>
                </form>

            </div>
        </Layout>
    )
}

export default Register