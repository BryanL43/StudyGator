import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdLock, MdPerson } from 'react-icons/md';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle sign up
        console.log('Username:', username);
        console.log('Password:', password);
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Sign Up</h2>


                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Username
                        </label>
                        <div className="mt-1 flex items-center border border-gray-300 dark:border-gray-700 rounded-md shadow-sm">
                            <MdPerson className="ml-2 text-gray-400" size={30} />
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="block w-full p-2 border-none focus:ring-transparent dark:bg-gray-700 dark:text-gray-200"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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


                    <button
                        type="submit"
                        className="w-full bg-[#231161] hover:bg-[#1f0e55] text-white font-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#231161] focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                        Sign Up
                    </button>


                    <div className="text-sm text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log In</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default SignupPage;



