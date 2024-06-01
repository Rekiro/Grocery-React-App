import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
    const {id} = useParams()
    
    const [product, setProduct] = useState({})

    const fetchData = useCallback(() => {
        axios.get('https://orca-app-jhg4l.ondigitalocean.app/api/products/' + id)
            .then(response => setProduct(response.data.data))
            .catch(error => console.log(error))
    }, [id])

    useEffect(() => {
        fetchData()
    }, [id, fetchData])

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="wrapper">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={'http://rjtmobile.com/grocery/images/' + product.image} alt="" className="img-fluid" />
                        </div>
                        <div className="col-md-6">
                            <h5>{product.productName}</h5>
                            <p>{product.unit}</p>
                            <p>{product.description} </p>
                            <h2>
                                <span>&#8377;</span>
                                {product.price}
                                <span style={{
                                    fontSize: '22px',
                                    color: '#888',
                                    marginLeft: '10px'
                                }}>
                                    <del><span>&#8377;</span>{product.mrp}</del>
                                </span>
                            </h2>
                            <br />
                            <button className="btn btn-primary">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductDetailPage;