import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useParams } from 'react-router-dom';

const ProductList = () => {
    //let catId = 3
    const {catId} =useParams()   // useParams() returns all the parameters passed to the URL.     
                                //  {} - is used for destructuring the object
    const [products, setProducts] = useState([])

    const fetchData = useCallback( () => {
        axios.get(`https://orca-app-jhg4l.ondigitalocean.app/api/products/cat/${catId}`)
            .then(response => setProducts(response.data.data))
            .catch(error => console.log(error))
    }, [catId])

    useEffect(() => {
        fetchData()
    }, [catId, fetchData])

    return (
        <div>
            <h2 className='text-center'>Product List</h2>
            <div className="row">

                {
                    products.map((product, index) => <ProductCard key={index} data={product} />)
                }
            </div>
        </div>
    )
}
export default ProductList;