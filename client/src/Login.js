import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/login', { email, password });
            console.log(response.data.message);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div>
                <input placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="Password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin}>Login</button>
            </div>
        </>
    );
}

export default Login;
