import { Outlet } from "react-router-dom";
import useSearchContext from "../context/ContextProvider"
import { Navigate } from "react-router-dom";

export default function GuestLayout() {
	const { token } = useSearchContext();
	if (token) {
		return <Navigate to="/" />
	}
	return (
		<div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}
