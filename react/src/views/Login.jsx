import { Link } from "react-router-dom"

export default function Login() {
    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Login into your account</h1>
            <input placeholder="Email" type="email" />
            <input placeholder="Password" type="password" />
            <button type="submit" className="btn btn-block">Login</button>
            <p className="message">
                Not registered? <Link to="/signup">Create an account</Link>
            </p>
        </form>
    )
}
