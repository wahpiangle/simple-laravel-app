import { Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import axiosClient from '../axios-client'

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext()

    if (!token) {
        return <Navigate to="/login" />
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
    }, [])

    const onLogout = (e) => {
        e.preventDefault()
        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }


    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" className="btn-logout" onClick={onLogout}>Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
