// src/components/Signup.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default to 'user'
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const URL=process.env.REACT_APP_SERVER_API_URL;

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${URL}/auth/register`, {
                username,
                email,
                password,
                role, // Include role in the signup request
            });
            console.log(response);
            // Handle successful signup (e.g., redirect to login)
            navigate('/login'); // Redirect to login page
        } catch (err) {
            setError(err?.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-300 to-green-500">
            <form onSubmit={handleSignup} className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-semibold mb-6 text-center text-green-600">Signup</h2>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="mt-1 block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        placeholder="Enter your username"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        placeholder="Enter your password"
                    />
                </div>
                
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-500 transition duration-200 focus:outline-none"
                >
                    Signup
                </button>
                <p className="mt-4 text-center text-gray-600">
                    Already have an account? 
                    <span className="text-green-600 cursor-pointer" onClick={() => navigate('/login')}> Login</span>
                </p>
            </form>
        </div>
    );
}

export default Signup;
