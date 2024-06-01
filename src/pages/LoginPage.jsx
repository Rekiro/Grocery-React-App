import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { Link } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {

    const [requestResponse, setRequestResponse] = useState({
        textMessage: '',    // depends on the response we get from the API
        alertClass: ''
    })

    const initialValues = {
        email: '',
        password: ''
    }

    const onSubmit = (values) => {
        axios.post('https://orca-app-jhg4l.ondigitalocean.app/api/auth/login', values)
            .then((response) => {
                setRequestResponse({
                    textMessage: 'Logged in successfully.',
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
        email: Yup.string().required('Email is required.').email('Entered email is not vaild.'),
        password: Yup.string().required('Password is required.').min(6, 'Password must be atleast 6 characters long.')
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true
    })

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="wrapper">
                        <div class={requestResponse.alertClass} role="alert">
                            {requestResponse.textMessage}
                        </div>
                        <h2>Login</h2>
                        <hr />
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="">Email</label>
                                <input type="text" name="email" id="" className={formik.errors.email && formik.touched.email ? 'form-control is-invalid' : 'form-control'} value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                {formik.errors.email && formik.touched.email ? (<small className="text-danger">{formik.errors.email}</small>) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Password</label>
                                <input type="password" name="password" id="" className={formik.errors.password && formik.touched.password ? 'form-control is-invalid' : 'form-control'} value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                {formik.errors.password && formik.touched.password ? (<small className="text-danger">{formik.errors.password}</small>) : null}
                            </div>
                            <input type="submit" value="Login" disabled={!formik.isValid} className="btn btn-primary btn-block" />
                            <br />
                            <p className="text-center">New user? <Link to='/registration'>Click here.</Link></p>

                        </form>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}

export default LoginPage;