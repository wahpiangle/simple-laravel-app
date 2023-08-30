import { Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider"
import { Navigate } from "react-router-dom";

export default function GuestLayout() {
    const { token } = useStateContext();
    if (token) {
        return <Navigate to="/" />
    }
    return (
        <div>
            <div className='login-signup-form animated fadeInDown'>
                <div className='form'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
