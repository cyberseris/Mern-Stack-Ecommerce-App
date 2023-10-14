import React, { useState, useEffect } from "react";
import UserMenu from "../../components/layout/UserMenu";
import Layout from "./../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    //context
    const [auth, setAuth] = useAuth();
    //state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    //get user dta
    useEffect(() => {
        const { email, name, phone, address } = auth?.user;
        setName(name);
        setPhone(phone);
        setEmail(email);
        setAddress(address);
    }, [auth?.user])

    //form fuction
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put("/api/v1/auth/profile", {
                name, email, password, phone, address
            })

            if (data?.error) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile Updated Successfully");
                navigate("/dashboard/user");
            }
        } catch (error) {
            toast.error("Error while update profile");
        }
    }

    return (
        <Layout title="Dashboard - Your Profile">
            <div className='container-fluid m-3 p-3 dashboard'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='form-container mt-5 vh-100'>
                            <form onSubmit={handleSubmit}>
                                <h2 className='title'>USER PROFILE</h2>
                                <div className="mb-3">
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-contorl ps-2" disabled />
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

                                <button type="submit" className="btn submit w-100">UPDATE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile