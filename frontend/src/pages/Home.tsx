import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <h1>Welcome to TaskMaster</h1>
            <p>
                The ultimate tool to organize your life, manage priorities, 
                and get things done efficiently.
            </p>
            <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
                <Link to="/register">
                    <button>Get Started for Free</button>
                </Link>
                <Link to="/login">
                    <button>Login to Your Account</button>
                </Link>
            </div>
        </div>
    );
}