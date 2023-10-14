import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });

            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        } catch (error) {
            toast.error("Something went wrong in getting total price")
        }
    }

    //delete item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
            toast.success("Product deleted successfully");
        } catch (error) {
            toast.error("Something went wrong in getting removeCartItem");
        }
    }

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h2 className='text-center bg-light p-2'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h2>
                        <h4>
                            {cart?.length > 1
                                ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "Plaese login to checkout"}` : "Your cart is empty"}
                        </h4>
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-md-7 p-0 m-0">
                        {cart?.map((pd) => (
                            <div className="row card flex-row mb-2" key={pd._id}>
                                <div className="col-md-4 m-0 p-0">
                                    <img
                                        src={`/api/v1/product/product-photo/${pd._id}`}
                                        className="card-img-top"
                                        alt={pd.name}
                                        width={"100%"}
                                        height={"130px"}
                                    />
                                </div>
                                <div className="col-md-4 d-flex flex-column justify-content-center">
                                    <p>{pd.name}</p>
                                    <p>{pd.description.substring(0, 20)}</p>
                                    <p>Price : {pd.price}</p>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center align-items-center">
                                    <button className="btn btn-danger" onClick={() => {
                                        removeCartItem(pd._id)
                                    }}
                                    >Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-5 text-center">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total : {totalPrice()}</h4>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage