import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [cart, setCart] = useCart();

    useEffect(() => {
        if (params?.slug) getProductByCat();
    }, [params?.slug]);

    const getProductByCat = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`);
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            toast.error("Something went wrong in getting category product")
        }
    }

    return (
        <Layout>
            <div className="container mt-5 category">
                <h4 className="text-center">Category - {category?.name}</h4>
                <h6 className="text-center">{products?.length} Result Found</h6>
                <div className="row">
                    <div className="col-md-9 offset-1">
                        <div className="d-flex flex-wrap">
                            {
                                products?.map((pd) => (
                                    <div className="card m-2" key={pd._id}>
                                        <img
                                            src={`/api/v1/product/product-photo/${pd._id}`}
                                            className="card-img-top "
                                            alt={pd.name}
                                        >
                                        </img>
                                        <div className="card-body">
                                            <h5 className="card-title text-center">{pd.name}</h5>
                                            <h5 className="card-title text-center">{pd.price}</h5>
                                            <p className="card-text text-center">{pd.description.substring(0, 20)}</p>
                                            <div className="card-name-price">
                                                <button className="btn btn-primary ms-1 me-3" onClick={() => navigate(`/product/${pd.slug}`)}>
                                                    More Details
                                                </button>
                                                <button className="btn btn-secondary" onClick={() => {
                                                    setCart([...cart, pd]);
                                                    localStorage.setItem(
                                                        "cart",
                                                        JSON.stringify([...cart, pd])
                                                    );
                                                    toast.success("Item Added to cart");
                                                }}
                                                >Add TO CART</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

            </div>
        </Layout >
    )
}

export default CategoryProduct