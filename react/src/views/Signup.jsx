import React, { useRef } from 'react'
import { Link } from "react-router-dom"

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirm_password: confirmPasswordRef.current.value
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Sign up for free!</h1>
            <input ref={nameRef} placeholder="Full Name" type="text" />
            <input ref={emailRef} placeholder="Email Address" type="email" />
            <input ref={passwordRef} placeholder="Password" type="password" />
            <input ref={confirmPasswordRef} placeholder="Confirm Password" type="password" />
            <button type="submit" className="btn btn-block">Login</button>
            <p className="message">
                Already registered? <Link to="/login">Sign In</Link>
            </p>
        </form>
    )
}
