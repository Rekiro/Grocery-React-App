import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SubCategory = () => {
    // let params = useParams()
    // console.log(params)
    // console.log(params.catId)
    const catId = useParams().catId
    const [subCategories, setSubCategories] = useState([])

    const fetchData = useCallback( () => {
        axios.get(`https://orca-app-jhg4l.ondigitalocean.app/api/subcategory/${catId}`)
            .then(response => setSubCategories(response.data.data))
            .catch(error => console.log(error))
    }, [catId])

    useEffect(() => {
        fetchData()
    }, [catId, fetchData])

    return (
        <div >
            <h2 className='text-center'>Sub Category</h2>
            <ul className="list-group">
                {
                    subCategories.map((item, index) => <li key={index} className="list-group-item">{item.subName}</li>)
                }

            </ul>
        </div>
    )
}
export default SubCategory;