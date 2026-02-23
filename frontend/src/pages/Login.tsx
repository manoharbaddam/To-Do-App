import { useState } from "react";
import api from "../servies/api";

export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try{
            const response = await api.post("token/", {
                email,
                password,
            });

            localStorage.setItem("access",response.data.access);
            localStorage.setItem("refresh",response.data.refresh);

            alert("Login Successful!!")
        }catch(error){
            console.error(error);
            alert("Login failed");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input 
                type="email"  
                placeholder="example@gmail.com"
                value={email}
                onChange={(e)=> setEmail(e.target.value) }
             />

            <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>Login</button>
        </div>
    );

}