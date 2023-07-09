import { Navigate } from "react-router-dom";

const AuthService = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

export default AuthService;