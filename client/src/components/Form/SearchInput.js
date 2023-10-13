import React from 'react'
import axios from 'axios'
import { useSearch } from '../../context/search'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigete = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!values.keyword) {
            toast.error("Please enter the keyword")
            return
        }
        try {
            const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`)
            setValues({ ...values, results: data });
            navigete("/search");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form className="d-flex search-form" role="search" onSubmit={handleSubmit}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={values.keyword} onChange={(e) => setValues({ ...values, keyword: e.target.value })} />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

        </div>
    )
}

export default SearchInput