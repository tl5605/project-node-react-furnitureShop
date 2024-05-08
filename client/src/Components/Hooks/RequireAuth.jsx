import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";


const RequireAuth = ({ allowRoles }) => {
    const { role } = useAuth();
    const userAllowed = allowRoles.includes(role);
    if (userAllowed) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" replace />;
    }
}

export default RequireAuth;