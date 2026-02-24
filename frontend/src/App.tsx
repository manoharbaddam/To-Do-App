import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Dashboard from "./dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/auth/Register";

export default function App() {
    return (
        <BrowserRouter>
            {/* 1. min-h-screen: Ensures background covers the whole height */}
            {/* 2. w-full: Ensures it covers the whole width */}
            <div className="min-h-screen w-full bg-gray-50 flex flex-col">
                <Navbar /> 
                
                {/* 3. flex-grow: Fills the remaining vertical space */}
                {/* 4. w-full: Forces the main area to be wide */}
                <main className="grow w-full">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Route>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}