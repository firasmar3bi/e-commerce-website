import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import axios from "axios";
import { CartContext } from '../Context/CartContext.Jsx';
import { useContext } from 'react'

export default function ProductInCategories() {

    const id = useParams();
    const apiUrl = import.meta.env.VITE_API_URL;

    // Get Catgories Product =>
    const getProductFromCatgories = async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/products/category/${id._id}`)
            return (data);
        } catch (error) {
            console.log(error);
        }
    }
    const { data, isLoading } = useQuery("api_ProdectFromCategories", getProductFromCatgories)
    if (isLoading) {
        <h2>... Loding</h2>
    }

    // Add Proudect To Cart = >
    const { addToCartContext } = useContext(CartContext)
    const addToCart = async (productId) => {
        const res = await addToCartContext(productId)
    }

    return (
        <>
            <div className="container-fluid px-0 py-5">
                <div className="section-titel d-flex w-100 justify-content-center align-items-center mt-4 pb-5">
                    <h2 className="text-uppercase text-center">Shop</h2>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    {
                        data?.products.length ? data.products.map((category, index) => <>
                            <div className="col-6 col-md-6 col-lg-4 p-4 carPart-card" key={index}>
                                <div className="card p-0 m-0 position-relative">
                                    {/* <div className="d-flex flex-column custom-postion">
                                        <i className="fa-solid fa-magnifying-glass" />
                                        <i className="fa-regular fa-heart" />
                                        <i className="fa-solid fa-code-compare" />
                                    </div> */}
                                    <Link to={`/products/${category._id}`} className="nav-link">
                                        <img src={category.mainImage.secure_url} className="card-img-top" alt={category.name} />
                                    </Link>
                                    <div className="card-body">
                                        <h3 className="card-title">
                                            <Link to={`/products/${category._id}`} className="nav-link">  {category.name} </Link>
                                        </h3>
                                        {/* <div className="d-flex align-items-center p-0 m-0 sale-start">
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star" />
                                            <i className="fa-solid fa-star start-no" />
                                        </div> */}
                                        <p>$ {category.price} <span /></p>
                                        <button
                                            className="btn rounded-pill text-uppercase showPartAtwo addToCartButton"
                                            onClick={() => addToCart(category._id)}
                                        >add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </>) : <h2>Ther's no data</h2>
                    }
                </div>
            </div>
        </>
    )
}
