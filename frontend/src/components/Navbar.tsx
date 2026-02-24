import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("access");

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/"); // Send back to landing page
    };

    return (
        <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem", borderBottom: "1px solid #ccc" }}>
            {/* Logo / Brand Name */}
            <div>
                <Link to="/" style={{ textDecoration: "none", fontSize: "1.5rem", fontWeight: "bold" }}>
                    TaskMaster
                </Link>
            </div>

            {/* Dynamic Navigation Links */}
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                {token ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}