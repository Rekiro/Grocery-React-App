import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CategoryCard from './CategoryCard';
// import CategoryData from '../data/CategoryData';

const CategoryList = () => {
    const [categories, setCategories] = useState([])

    const fetchData = useCallback( () => {
        axios.get('https://orca-app-jhg4l.ondigitalocean.app/api/category')
            .then(response => { 
            //    console.log(response.data)
               setCategories(response.data.data)
             })
            .catch(error => console.log(error))
        // setCategories(CategoryData)
    }, [])

    useEffect(() => {                 //useEffect is used to maintain the life cycle of the state. 
        // do task
        fetchData()
    }, [fetchData])              // []   ->    used to pass dependencies

    return (
        <div className='container'>
            <h1 className='text-center'>Category List</h1>
            {/* <button onClick={fetchData}>GetData</button> */}
            <div className="row">
                {
                    categories.map((category, index) => <CategoryCard key={index} data={category} />)
                }
            </div>

        </div>
    )
}
export default CategoryList;