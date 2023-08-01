import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Add parentheses to useNavigate

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/register', { username, email, password });
            console.log(response.data.message);
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div>
                <input value={username} type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input value={email} type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input value={password} type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleSignup}>Signup</button>
            </div>
        </>
    );
}

export default Signup;
