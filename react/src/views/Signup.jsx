import React, { useRef, useState } from 'react'
import { Link } from "react-router-dom"
import axiosClient from '../axios-client'
import { useStateContext } from '../context/ContextProvider'

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: confirmPasswordRef.current.value
        }
        axiosClient.post('/signup', payload)
            .then(({ data }) => {
                setToken(data.token)
                setUser(data.user)
            })
            .catch(err => {
                const response = err.response
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
    }

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Sign up for free!</h1>
            {errors && <div className="alert">
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>}
            <input ref={nameRef} placeholder="Full Name" type="text" />
            <input ref={emailRef} placeholder="Email Address" type="email" />
            <input ref={passwordRef} placeholder="Password" type="password" />
            <input ref={confirmPasswordRef} placeholder="Confirm Password" type="password" />
            <button className="btn btn-block" type='submit'>Sign Up</button>
            <p className="message">
                Already registered? <Link to="/login">Sign In</Link>
            </p>
        </form>
    )
}
