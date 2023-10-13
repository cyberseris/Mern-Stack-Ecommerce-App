import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from "../../context/auth";
import toast from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const categories = useCategory()

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        });
        localStorage.removeItem('auth')
        toast.success('Logout Successfully')
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Link to="/" className="navbar-brand">
                            🛒 ECOMMERCE APP
                        </Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
                            <li className="me-5"><SearchInput /></li>
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to={"/categories"} data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" to={"/categories"}>
                                            All Categories
                                        </Link>
                                    </li>
                                    {categories.map((category) => (
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to={`/category/${category.slug}`}>
                                                {category.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            {!auth.user ? (<>
                                <li className="nav-item">
                                    <NavLink to="/register" className="nav-link">Register</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link">Login</NavLink>
                                </li>
                            </>) : (
                                <>
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.name}
                                        </NavLink>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            {/* auth?.user?.role 中的問號為可選鍊運算符, 作用是在訪問 auth 和 auth.user 的屬性之前進行安全檢查。如果 auth、user 或 role 的如果 auth、user 或 role 的任何一個不存在，則整個表達式將返回 undefined 而不會引發錯誤。 */}
                                            <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item" >Dashboard</NavLink></li>
                                            <li><NavLink onClick={handleLogout} to="/login" className="dropdown-item">Logout</NavLink></li>
                                        </ul>
                                    </li>
                                </>
                            )}
                            <li className="nav-item">
                                <NavLink to="/cart" className="nav-link">Cart (0)</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
