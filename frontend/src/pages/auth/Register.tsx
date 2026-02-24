import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

export default function Register() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Clear previous errors

        try {
            // NOTE: Make sure "/users/register/" matches your Django urls.py endpoint
            await api.post("/users/register/", formData);
            
            alert("Registration successful! Please log in.");
            navigate("/login"); // Send them to login to get their tokens
            
        } catch (err: any) {
            console.error(err);
            // Extract error messages from Django REST Framework
            const errorMessage = 
                err.response?.data?.email?.[0] || 
                err.response?.data?.detail || 
                "Registration failed. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // A clean way to handle all text inputs with one function
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div style={{ maxWidth: "400px", margin: "2rem auto", border: "1px solid #ccc", padding: "2rem", borderRadius: "8px" }}>
            <h2>Create an Account</h2>
            
            {/* Display error message if registration fails */}
            {error && <div style={{ color: "red", marginBottom: "1rem", fontWeight: "bold" }}>{error}</div>}

            <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                    <label>Email: </label><br/>
                    <input 
                        type="email" 
                        name="email"
                        required 
                        value={formData.email}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>

                <div>
                    <label>First Name: </label><br/>
                    <input 
                        type="text" 
                        name="first_name"
                        required 
                        value={formData.first_name}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>

                <div>
                    <label>Last Name (Optional): </label><br/>
                    <input 
                        type="text" 
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>

                <div>
                    <label>Password: </label><br/>
                    <input 
                        type="password" 
                        name="password"
                        required 
                        value={formData.password}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>

                <button type="submit" disabled={loading} style={{ padding: "0.5rem", marginTop: "1rem" }}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>

            <p style={{ marginTop: "1rem", textAlign: "center" }}>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
}