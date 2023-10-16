import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart, setCart] = useCart();

    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);

    // get product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            /* setProduct(data?.product._id, data?.product.category._id); */
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
            /* toast.error("Something went wrong in getting product"); */
        }
    }

    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
            /* toast.error("Something went wrong in getting related-product"); */
        }
    }

    return (
        <Layout>
            <div className="row container product-details mt-5">
                <div className="col-md-6">
                    <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        height={"400px"}
                        width={"350px"}
                    />
                </div>
                <div className="col-md-6 product-details-info">
                    <h2 className="mt-4">Product Details</h2>
                    <hr />
                    <h6>Name:{product.name}</h6>
                    <h6>Description:{product.description}</h6>
                    <h6>Price : {product.price}</h6>
                    {/* <h6>Price : {product?.price?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                    })}</h6> */}
                    <h6>Category : {product?.category?.name}</h6>
                    <button className="btn btn-secondary" onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, product])
                        );
                        toast.success("Item Added to cart");
                    }}
                    >Add TO CART</button>
                </div>
            </div>
            <hr />
            <div className="row container similar-products">
                <h4>Similar Products ➡️</h4>
                {relatedProducts.length < 1 && (
                    <p className="text-center">No Similar Products found</p>
                )}
                <div className="d-flex flex-wrap">
                    {
                        relatedProducts.map((pd) => (
                            <div className="card m-2 key={pd._id}">
                                <img
                                    src={`/api/v1/product/product-photo/${pd._id}`}
                                    className="card-img-top"
                                    alt={pd.name}
                                    height={"300px"}
                                    width={"350px"}
                                />

                                <div className="card-body">
                                    <div className="card-name-price text-center">
                                        <h5 className="card-title">{pd.name}</h5>
                                        <h5 className="card-title card-price">
                                            {pd.price.toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                            })}
                                        </h5>
                                        <p className="card-text">
                                            {pd.description.substring(0, 20)}...
                                        </p>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => navigate(`/product/${pd.slug}`)}
                                        >
                                            More Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails