import React, { useContext, useEffect } from 'react'
import Logo from '../assets/img/logo.png'
import PhoneImg from '../assets/img/phone-icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { CatgoriesContext } from '../Component/Context/CatgoriesContext'
import axios from "axios";

export default function Navbar({ userToken, setUserToken }) {

    const navigate = useNavigate()
    // Log Out Function =>
    const Logout = () => {
        localStorage.removeItem("userToken")
        setUserToken(null)
        navigate('/register')
    }

    const apiUrl = import.meta.env.VITE_API_URL;
    // Clear Product From Cart =>
    const clerCart = async () => {
        try {
            const token = localStorage.getItem("userToken");
            const { data } = await axios.patch(`${apiUrl}/cart/clear`,
                {},
                {
                    headers: { Authorization: `Tariq__${token}` }
                }
            )
            return (data);
        } catch (error) {
            console.log(error);
        }

    }
    const data = useContext(CatgoriesContext);

    return (
        <>
            <nav className="navbar navbar-expand-lg p-0 bg-white flex-column" id="navBarTwo">
                <div className="container-fluid justify-content-lg-around justify-content-between align-items-center mt-4">
                    <a className="navbar-brand" href="index.html">
                        <img src={Logo} alt="druco logo" className="w-100" />
                    </a>
                    <button className="navbar-toggler  " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" id="showButtonScroll">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="d-flex justify-content-center align-items-center ">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                    </div>
                    <ul className="nav-item  d-none d-md-none d-lg-block">
                        <div className="d-flex rounded-start-pill p-1 m-0 rounded-end-pill nav-custom-drop">
                            <li className="nav-link border-end">
                                <div className="dropdown me-5 ">
                                    <button type="button" className="btn bg-transparent dropdown-toggle form-control border-0" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20">
                                        All categories
                                    </button>
                                    <ul className="dropdown-menu" id="navDrop">
                                        {
                                            data?.categories.length ? data.categories.map((category) =>
                                                <Link key={category._id} className="dropdown-item" to={`/products/category/${category._id}`}>
                                                    <li >
                                                        {category.name}
                                                    </li>
                                                </Link>
                                            ) : <></>
                                        }
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-link">
                                <div className="collapse navbar-collapse bg-transparent" id>
                                    <form className="d-flex " role="search">
                                        <input className="form-control me-2 bg-transparent border border-0 search-custom" type="search" placeholder="Search" aria-label="Search" />
                                    </form>
                                </div>
                            </li>
                        </div>
                    </ul>
                    <ul className="nav-item m-0 d-flex justify-content-center align-items-center d-none d-md-none d-lg-block">
                        <li className="nav-link d-flex justify-content-center align-items-center">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-capitalize nav-custom-font" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Account
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-start w-auto accountDropdown">
                                        <li>
                                            <button className='dropdown-item text-capitalize nav-custom-font' onClick={() => clerCart()}>Clear Cart</button>
                                        </li>
                                        {
                                            !userToken ? <>
                                                <li><Link className="dropdown-item text-capitalize nav-custom-font" to="/register">LOG-In</Link></li>
                                                <li><Link className="dropdown-item text-capitalize nav-custom-font" to="/register">SING-UP</Link></li>
                                            </> : <>
                                                <li><Link className="dropdown-item text-capitalize nav-custom-font" to="/register">Profile</Link></li>
                                                <li><button className="dropdown-item text-capitalize nav-custom-font" onClick={() => Logout()}>LogOut</button></li>
                                            </>
                                        }
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <nav className="navbar navbar-expand-lg p-0 bg-white justify-content-start w-100" id="navBarThree">
                    <div className="container-fluid pt-2">
                        <div className="collapse navbar-collapse nav-mobile-screen" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item px-2">
                                    <Link className="nav-link text-black nav-text active" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item px-2">
                                    <Link className="nav-link text-black nav-text" aria-current="page" to="/Catgories">Catgories</Link>
                                </li>
                                <li className="nav-link">
                                    <div className="dropdown" >
                                        <Link className="text-black nav-text px-2  text-decoration-none custom-icon-hover" to="/Shop">
                                            Shop
                                        </Link>
                                    </div>
                                </li>
                                <li className="nav-link">
                                    <div className="dropdown" >
                                        <Link className="text-black nav-text px-2  text-decoration-none custom-icon-hover" to="/Cart">
                                            Cart
                                        </Link>
                                    </div>
                                </li>
                                <li className="nav-item px-2 ">
                                    <div className="d-none nav-custom-mobile">
                                        <div className="d-flex  flex-column w-100">
                                            <div className="d-flex me-5 justify-content-between align-items-center bg-white w-100 border-1 border-dark">
                                                <a href="login.html" className="d-inline-block text-dark text-decoration-none nav-link"> <i className="fa-regular fa-user" />Login/Register</a>
                                                <div className="d-flex">
                                                    <ul className="navbar-nav">
                                                        <li className="nav-item dropdown mob-li">
                                                            <a className="nav-link dropdown-toggle text-capitalize nav-custom-font" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                Account
                                                            </a>
                                                            <ul className="dropdown-menu dropdown-menu-start w-auto">
                                                                {
                                                                    !userToken ? <>
                                                                        <li><Link className="dropdown-item text-capitalize nav-custom-font" to="/register">LOG-In</Link></li>
                                                                        <li><Link className="dropdown-item text-capitalize nav-custom-font" to="/register">SING-UP</Link></li>
                                                                    </> : <>
                                                                        <li><Link className="dropdown-item text-capitalize nav-custom-font" to="/register">Profile</Link></li>
                                                                        <li><Link className="dropdown-item text-capitalize nav-custom-font" onClick={() => Logout()}>LogOut</Link></li>
                                                                    </>
                                                                }
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </nav>
        </>
    )
}
