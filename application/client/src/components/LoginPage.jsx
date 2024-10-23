import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdLock, MdPerson } from 'react-icons/md';

import axios from 'axios';
import BASE_URL from "../utils/config";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`${BASE_URL}/api/login`, {
                email,
                password,
            });
            
            if (rememberMe) {
                localStorage.setItem('authToken', response.data.token);
            }
        } catch (err) {
            console.error('Error during login:', err.response ? err.response.data : err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Login</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            SFSU Email
                        </label>
                        <div className="mt-1 flex items-center border border-gray-300 dark:border-gray-700 rounded-md shadow-sm">
                            <MdPerson className="ml-2 text-gray-400" size={30} />
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="block w-full p-2 border-none focus:ring-transparent dark:bg-gray-700 dark:text-gray-200"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <div className="mt-1 flex items-center border border-gray-300 dark:border-gray-700 rounded-md shadow-sm">
                            <MdLock className="ml-2 text-gray-400" size={30} />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="block w-full p-2 border-none focus:ring-transparent dark:bg-gray-700 dark:text-gray-200"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Remember Me Checkbox */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                            Remember Me
                        </label>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-500 hover:underline">
                            Forgot Password?
                        </span>
                        <button
                            type="submit"
                            className="bg-[#231161] hover:bg-[#1f0e55] text-white font-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#231161] focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        >
                            Login
                        </button>
                    </div>

                    <div className="text-sm text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                            Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;