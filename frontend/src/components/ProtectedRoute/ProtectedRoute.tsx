import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token");

    if (token) {

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();


        if (currentTime > expirationTime) {

            localStorage.removeItem("token");
            return <Navigate to="/login" replace />;
        }
    }


    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;