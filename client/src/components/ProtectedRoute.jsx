import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute ({ children }) {
    const { user } = useSelector(s => s.users)
    return Boolean(user) ? children : <Navigate to={"/login"} />
}