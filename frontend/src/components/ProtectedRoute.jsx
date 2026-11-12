import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRole }) {

    const { user, isAuthenticated } = useContext(AuthContext);

    // Check whether the user is logged in
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Check whether the user has the required role
    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;