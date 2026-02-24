import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register"; // You will build this next!
import Dashboard from "./dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/auth/Register";

export default function App() {
    return (
        <BrowserRouter>
            {/* Navbar is always visible */}
            <Navbar /> 
            
            {/* Page Content */}
            <div style={{ padding: "2rem" }}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected Routes (Requires Login) */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}