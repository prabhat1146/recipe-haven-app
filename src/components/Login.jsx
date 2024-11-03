// src/components/Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; 
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const URL=process.env.REACT_APP_SERVER_API_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${URL}/auth/login`, {
                email,
                password,
            });
            console.log(response?.data);
            Cookies.set('token', response?.data?.token);
            Cookies.set('email', email);
            navigate('/'); 
        } catch (err) {
            console.log(err)
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-300 to-blue-500">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">Login</h2>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-4 relative">
                    <label className="block text-gray-700 font-medium">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                        ) : (
                            <EyeIcon className="h-5 w-5 text-gray-600" />
                        )}
                    </button>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-200 focus:outline-none"
                >
                    Login
                </button>
                <p className="mt-4 text-center text-gray-600">
                    Don't have an account? 
                    <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/signup')}> Sign Up</span>
                </p>
            </form>
        </div>
    );
}

export default Login;
