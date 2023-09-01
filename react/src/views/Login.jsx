import { Link } from "react-router-dom"
import React, { useRef, useState } from 'react'
import axiosClient from '../axios-client'
import { useStateContext } from '../context/ContextProvider'

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault()
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post('/login', payload)
            .then(({ data }) => {
                setErrors(null)
                setToken(data.token)
                setUser(data.user)
            })
            .catch(err => {
                const response = err.response
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors)
                    } else {
                        setErrors({
                            email: [response.data.message]
                        })
                    }

                }
            })
    }

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Login into your account</h1>
            {errors &&
                <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            }
            <input ref={emailRef} placeholder="Email" type="email" />
            <input ref={passwordRef} placeholder="Password" type="password" />
            <button type="submit" className="btn btn-block">Login</button>
            <p className="message">
                Not registered? <Link to="/signup">Create an account</Link>
            </p>
        </form>
    )
}
