import React, { useState, useEffect } from "react";
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import { useAuth } from '../../context/auth';
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
    const [products, setProducts] = useState([]);

    //get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/get-product");
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []); // [] 空的依賴項數組，僅在組件掛載時調用一次，解決無限循環請求

    return (
        <Layout title="Dashboard - Create Product">
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='card w-75 p-3'>
                            <h2>All Products List</h2>
                            <div className="d-flex row w-100">
                                {
                                    products?.map((pd) => (
                                        <Link key={pd._id}
                                            to={`/dashboard/admin/product/${pd.slug}`}
                                            className="product-link a-link col-4"
                                        >
                                            <div className="card m-2">
                                                <img src={`/api/v1/product/product-photo/${pd._id}`} className="card-img-top " alt={pd.name}
                                                >
                                                </img>
                                                <div className="card-body">
                                                    <h5 className="card-title text-center">{pd.name}</h5>
                                                    <p className="card-text text-center">{pd.description.substring(0, 20)}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products