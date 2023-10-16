import React, { useEffect } from 'react'
import { useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
/* import Users from './Users'; */

const Users = () => {
    const [allUsers, setAllUsers] = useState("");
    //get all users
    const getAllUsers = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/users");
            if (data?.success) {
                setAllUsers(data);
            }
        } catch (error) {
            console.log(error);
            /* toast.error("Something went wrong in getting users"); */
        }
    };

    useEffect(() => {
        getAllUsers();
    }, [])

    return (
        <Layout title={"Dashboard - All Users"}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <div>
                            {
                                /* console.log(allUsers) */
                                allUsers.category?.map((user) => (
                                    <>
                                        <div className='card w-75 p-3'>
                                            <div className="card-body" key={user.id}>
                                                <h5 className="card-title">Name: {user?.name}</h5>
                                                <p className="card-text">email: {user?.email}</p>
                                                <p className="card-text">address: {user?.address}</p>
                                                <p className="card-text">phone: {user?.phone}</p>
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users