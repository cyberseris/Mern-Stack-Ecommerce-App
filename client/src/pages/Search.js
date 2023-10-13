import React from 'react'
import Layout from '../components/layout/Layout'
import { useSearch } from "../context/search";

const Search = () => {
    const [values, setValues] = useSearch();
    return (
        <Layout title={"Search Results"}>
            <div className='container'>
                <div className='text-center'>
                    <h1 className='mt-4'>Search Results</h1>
                    <h6>
                        {values?.results.length < 1
                            ? "No Products Found"
                            : `Found ${values?.results.length}`}
                    </h6>
                    <div className='d-flex flex-wrap mt-4'>
                        {
                            values?.results.map((pd) => (
                                <div className="card m-2 col-md-3" key={pd._id}>
                                    <img
                                        src={`/api/v1/product/product-photo/${pd._id}`}
                                        className="card-img-top"
                                        alt={pd.name}
                                    />

                                    <div className="card-body">
                                        <h5 className="card-title text-center">{pd.name}</h5>
                                        <p className="card-text text-center">{pd.description.substring(0, 30)}</p>
                                        <p className="card-text text-center">$ {pd.price}</p>
                                        <div className="d-flex w-100">
                                            <button className="btn btn-primary me-3">More Details</button>
                                            <button className="btn btn-secondary">Add TO CART</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search