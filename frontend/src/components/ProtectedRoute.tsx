import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const token = localStorage.getItem("access");

    // If the user has a token, let them through to the Outlet (Dashboard).
    // If not, kick them back to the Login page.
    return token ? <Outlet /> : <Navigate to="/login" />;
}