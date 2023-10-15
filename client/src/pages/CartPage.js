import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
/* import { AiFillWarning } from "react-icons/ai"; */
import axios from "axios";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
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

    //get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.post("/api/v1/product/braintree/token");
            console.log("braintree token")
            /*  console.log(data) */
            setClientToken(data?.clientToken);
        } catch (error) {
            /*  console.log(error); */
            console.log("braintree gettoken")
        }
    };

    useEffect(() => {
        getToken();
    }, [auth?.token])

    //handle Payment 
    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            console.log(`nonce: ${nonce}`)
            console.log(`cart: ${cart}`)
            const { data } = await axios.post("/api/v1/product/braintree/payment", {
                nonce, cart
            });

            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully");
        } catch (error) {
            console.log(error);
            setLoading(false);
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
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className="btn btn-outline-warning" onClick={() => navigate('/dashboard/user/profile')}>
                                        Update Address
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {
                                    auth?.token ? (
                                        <button className="btn btn-outline-warning" onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                                    ) : (
                                        <button className="btn btn-outline-warning" onClick={() => {
                                            navigate('/login', {
                                                state: "/cart",
                                            })
                                        }}>Please Login to Checkout</button>
                                    )
                                }
                            </div>
                        )}

                        <div className="mt-2">
                            {!clientToken || !auth?.token || !cart?.length ? (
                                ""
                            ) : (
                                <>
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                            paypal: {
                                                flow: "vault",
                                            },
                                        }}
                                        onInstance={(instance) => setInstance(instance)}
                                    />

                                    <button
                                        className="btn btn-primary"
                                        onClick={handlePayment}
                                        disabled={loading || !instance || !auth?.user?.address}
                                    >
                                        {loading ? "Processing ...." : "Make Payment"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage