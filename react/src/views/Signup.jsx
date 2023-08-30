import React from 'react'
import { Link } from "react-router-dom"

export default function Signup() {

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Sign up for free!</h1>
            <input placeholder="Full Name" type="text" />
            <input placeholder="Email Address" type="email" />
            <input placeholder="Password" type="password" />
            <input placeholder="Confirm Password" type="password" />
            <button type="submit" className="btn btn-block">Login</button>
            <p className="message">
                Already registered? <Link to="/login">Sign In</Link>
            </p>
        </form>
    )
}
