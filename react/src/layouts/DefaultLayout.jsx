import { Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function DefaultLayout() {
    const { user, token } = useStateContext()

    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (e) => {
        e.preventDefault()
        console.log('logout')
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
