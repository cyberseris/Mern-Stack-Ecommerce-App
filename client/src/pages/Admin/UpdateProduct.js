import React, { useState, useEffect } from "react";
import Layout from "./../../components/layout/Layout";
import AdminMenu from "./../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");

    //get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setCategory(data.product.category._id);
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        getSingleProduct();
    }, []);

    //get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            toast.error("Something went wrong in getting category");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);


    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category", category);

            const { data } = await axios.put(`/api/v1/product/update-product/${id}`, productData);

            if (data?.success) {
                toast.success("Product Updated Successfully");
                navigate("/dashboard/admin/products");
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    const handleDelete = async (e) => {
        try {
            let answer = window.prompt("Are you sure want to delete this product?");
            if (!answer) return;
            const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`);
            toast.success("Product Deleted Successfully");
            navigate("/dashboard/admin/products");
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Dashboard - Update Product"}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h3>Update Product</h3>
                        <div className="m-1 w-75">
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                                value={category.name}
                            >
                                {
                                    categories?.map((category) => (
                                        <Option key={category._id} value={category._id}>
                                            {category.name}
                                        </Option>
                                    ))
                                }
                            </Select>

                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {
                                    photo ? (
                                        <div className="text-center">
                                            <img
                                                src={URL.createObjectURL(photo)}
                                                alt="product_photo"
                                                height={"200px"}
                                                className="img img-responsive"
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <img
                                                src={`/api/v1/product/product-photo/${id}`}
                                                alt="product_photo"
                                                height={"200px"}
                                                className="img img-responsive"
                                            />
                                        </div>
                                    )}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="write a name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="write a description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="write a Price"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="write a quantity"
                                    className="form-control"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder={"Select Shipping"}
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => { setShipping(value) }}
                                    value={shipping ? "yes" : "No"}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>

                            <div className="mb-3 d-flex justify-content-center">
                                <button className="btn btn-primary me-3" onClick={handleUpdate}>
                                    UPDATE PRODUCT
                                </button>
                                <button className="btn btn-danger" onClick={handleDelete}>
                                    DELETE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct