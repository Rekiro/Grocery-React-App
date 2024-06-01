// formik - is one of the most popular libraries to manage your form data
// Yup - is another library to define validation schema
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Navbar from '../components/Navbar';
import axios from 'axios';

const RegistrationPage = () => {

    // const [user, setUser] = useState({
    //     firstName: 'Marie',
    //     email: "",
    //     mobile: "",
    //     password: ""
    // })

    // // const onfirstNameChangeHandler = (event) =>{
    // //    // console.log("changed")
    // //     setUser({
    // //         ...user,    // Spread Operator
    // //         firstName: event.target.value
    // //     })
    // // }

    // const onChangeHandler = (event) =>{
    //     // console.log(event.target.name)
    //     // console.log(event.target.value)
    //     setUser({
    //         ...user,
    //         [event.target.name] :event.target.value     // since we have to find the value dynamically from teh object we need to use square brackets around event.target.name
    //     })
    // }

    // const formik = useFormik({
    //     initialValues:{
    //         firstName: "Marie",
    //         email: "",
    //         mobile: '',
    //         password: ''
    //     },
    //     onSubmit: (values) =>{
    //         console.log(values)
    //     }
    // })

    const [requestResponse, setRequestResponse] = useState({
        textMessage: '',    // depends on the response we get from the API
        alertClass: ''
    })

    const initialValues = {
        firstName: '',
        email: '',
        mobile: '',
        password: ''
    }

    const onSubmit = (values) => {
        // console.log(values)
        axios.post('https://orca-app-jhg4l.ondigitalocean.app/api/auth/register', values)
            .then((response) => {
                setRequestResponse({
                    textMessage: response.data.message,
                    alertClass: 'alert alert-success'
                })
            }, (error) => {
                setRequestResponse({
                    textMessage: error.response.data.message,
                    alertClass: 'alert alert-danger'
                })
            })
            .catch((error) => console.log(error))
    }

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required.'),
        email: Yup.string().required('Email is required').email('Email entered is not valid.'),
        mobile: Yup.string().required('Mobile is required.'),
        password: Yup.string().required('Password is required.').min(6, 'Password must be alteast 6 characters long')
    })

    // //on Validation
    // const validate = (values) => {
    //     let errors = {};
    //     if (!values.firstName) {
    //         errors.firstName = 'First name is required.'
    //     }
    //     if (!values.email) {
    //         errors.email = 'Email is required.'

    //     } else if (!/^[A-z0-9.%+-]+@[A-Z0-9.-]+\.[A-z]{2,4}$/i.test(values.email)) {
    //         errors.email = 'The email entered is not valid.'
    //     }
    //     if (!values.mobile) {
    //         errors.mobile = 'Mobile is required'
    //     }
    //     if (!values.password) {
    //         errors.password = 'Password is required.'
    //     }
    //     return errors;
    // }

    const formik = useFormik({
        initialValues: initialValues,   // Since the name of the key and the value is the same, we can simply write it as initialvalue or onSubmit. 
        //onSubmit: onSubmit,
        onSubmit,
        //validate,
        validationSchema,
        validateOnMount: true
    })

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="wrapper">
                            <div class={requestResponse.alertClass} role="alert">
                                {requestResponse.textMessage}
                            </div>
                            <h2>Register</h2>
                            <hr />
                            {/* <h1>{formik.values.firstName}, {formik.values.email}, {formik.values.mobile}, {formik.values.password}</h1> */}

                            <form onSubmit={formik.handleSubmit}>   {/* We don't require action=""  attribute of the form element since we're gonna use React to manipulate the form*/}
                                <div className="form-group">
                                    <label htmlFor="">First Name</label>
                                    <input type="text" name='firstName' className={formik.errors.firstName && formik.touched.firstName ? 'form-control is-invalid' : 'form-control'} value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {
                                        formik.errors.firstName && formik.touched.firstName ? (<small className='text-danger'>{formik.errors.firstName}</small>) : null
                                    }
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">Email</label>
                                    <input type="text" name='email' className={formik.errors.email && formik.touched.email ? 'form-control is-invalid' : 'form-control'} value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.errors.email && formik.touched.email ? (<small className='text-danger'>{formik.errors.email}</small>) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">Mobile</label>
                                    <input type="text" name='mobile' className={formik.errors.mobile && formik.touched.mobile ? 'form-control is-invalid' : 'form-control'} value={formik.values.mobile} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.errors.mobile && formik.touched.mobile ? (<small className='text-danger'>{formik.errors.mobile}</small>) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">Password</label>
                                    <input type="password" name='password' className={formik.errors.password && formik.touched.password ? 'form-control is-invalid' : 'form-control'} value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.errors.password && formik.touched.password ? (<small className='text-danger'>{formik.errors.password}</small>) : null}
                                </div>
                                <input type="submit" value="Register" disabled={!formik.isValid} className="btn btn-primary btn-block" />
                                <br />
                                <p className="text-center">Already Registerd? <Link to="/login">Click here.</Link></p>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </>

    )
}

export default RegistrationPage;