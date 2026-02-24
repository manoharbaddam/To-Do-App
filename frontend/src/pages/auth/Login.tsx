import { useState } from "react";
import type { FormEvent } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading,setLoading]  = useState(false);

    const handleLogin = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try{
            const response = await api.post("token/", {
                email,
                password,
            });

            localStorage.setItem("access",response.data.access);
            localStorage.setItem("refresh",response.data.refresh);

            navigate("/dashboard");
            alert("Login Successful!!")
        }catch(error){
            console.error(error);
            alert("Login failed");
        }finally{
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin} >
            <input 
                required
                type="email"  
                placeholder="example@gmail.com"
                value={email}
                onChange={(e)=> setEmail(e.target.value) }
             />

            <input 
                required
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
            />

            <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );

}