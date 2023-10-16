import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/layout/Layout";
import { Checkbox, Radio } from 'antd';
import { Prices } from "../components/Prices";
import { AiOutlineReload } from "react-icons/ai";
import { useCart } from "../context/cart";
import "../styles/Homepage.css";

const HomePage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    //get all products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            toast.error("Something went wrong in getting products");
        }
    }

    /*     const getAllProducts = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/api/v1/product/get-product`);
                setLoading(false);
                setProducts(data.products);
            } catch (error) {
                setLoading(false);
                toast.error("Something went wrong in getting products");
            }
        } */

    const getTotal = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-count`);
            setTotal(data?.total);
        } catch (error) {
            /* console.log(error); */
            toast.error("Something went wrong in getting total")
        }
    };


    //load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products])
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page])


    //get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting category");
        }
    };

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);


    //filter by category   <Checkbox key={category._id} onChange={(e) => handleFilter(e.target.checked, checked._id)}> { category.name } </Checkbox >
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    //get filterd product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post("/api/v1/product/product-filters", {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);


    return (
        <Layout title={"Homepage - Ecommerce App"}>
            <div className="row mt-4 home-page">
                <div className="col-md-2">
                    <h4 className="text-center">Filter By Category</h4>
                    <div className="d-flex flex-column ">
                        {
                            categories?.map((category) => (
                                <Checkbox className="m-0 ps-3" key={category._id} onChange={(e) => handleFilter(e.target.checked, category._id)}>
                                    {category.name}
                                </Checkbox>
                            ))
                        }
                    </div>
                    {/* price filter */}
                    {/* {JSON.stringify(radio, null, 4)} */}
                    <h4 className="mt-4 text-center">Filter By Price</h4>
                    <div className="d-flex flex-column">
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {Prices?.map((p) => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className="d-flex flex-column mt-4">
                        <button
                            className="btn btn-danger"
                            onClick={() => window.location.reload()}
                        >
                            RESET FILTERS
                        </button>
                    </div>
                </div>
                <div className="col-md-9">
                    {/* {JSON.stringify(checked, null, 4)} */}
                    <h2 className="text-center">All Products</h2>
                    <div className="d-flex  row">
                        {
                            products?.map((pd) => (
                                <div className="card m-2 col-3 col-md-3 p-0 m-0" key={pd._id}>
                                    <img
                                        src={`/api/v1/product/product-photo/${pd._id}`}
                                        className="card-img-top"
                                        alt={pd.name}
                                    />

                                    <div className="card-body">
                                        <h5 className="card-title text-center">{pd.name}</h5>
                                        <p className="card-text text-center">{pd.description.substring(0, 30)}</p>
                                        <p className="card-text text-center card-price">$ {pd.price}</p>
                                        <div className="d-flex w-100">
                                            <button className="btn btn-primary ms-1 me-3"
                                                onClick={() => navigate(`/product/${pd.slug}`)}>More Details</button>
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
                    <div className="m-2 p-3">
                        {products && products.length < total && (
                            <button
                                className="btn btn-success text-white loadmore"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? (
                                    "Loading ..."
                                ) : (
                                    <>
                                        {" "}
                                        Loadmore <AiOutlineReload />
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout >
    );
};

export default HomePage