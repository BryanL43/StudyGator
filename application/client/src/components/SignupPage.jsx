/**************************************************************
* Author(s): Bryan Lee & Min Ye Thway Khaing
* Last Updated: 10/25/2024
*
* File:: SignupPage.jsx
*
* Description:: This file handles the registeration page.
*
**************************************************************/

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdLock, MdPerson } from 'react-icons/md';

import axios from 'axios';
import BASE_URL from "../utils/config";

const SignupPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const requestBody = {
                name,
                email,
                password
            }
            await axios.put(`${BASE_URL}/api/register`, requestBody);

            navigate("/login");
        } catch (error) {
            setError(error.response ? error.response.data.message : "Fatal: network/server error");
        }
    };

    return (
        <div className="top-0 flex items-center justify-center sm:min-h-screen bg-gray-100">
            <img src="/SFSU-img-4.png" className="absolute w-full h-full object-cover z-10 filter brightness-[0.8] sm:block hidden" alt="Bird eye view of SFSU" />
            <div className="w-full sm:max-w-md bg-white p-8 sm:rounded-lg sm:shadow-md z-30">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="Name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <div className="mt-1 flex items-center border border-gray-300 rounded-md shadow-sm">
                            <input
                                type="text"
                                id="Name"
                                name="Name"
                                className="block w-full p-2 border-none focus:ring-transparent"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            SFSU Email
                        </label>
                        <div className="mt-1 flex items-center border border-gray-300 rounded-md shadow-sm">
                            <MdPerson className="ml-2 mr-2 text-gray-400" size={30} />
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="block w-full p-2 border-none focus:ring-transparent0"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1 flex items-center border border-gray-300 rounded-md shadow-sm">
                            <MdLock className="ml-2 mr-2 text-gray-400" size={30} />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="block w-full p-2 border-none focus:ring-transparent"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && <p className='text-red-500 text-sm'>{error}</p>}

                    {/* ToS Checkbox */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="TosCheckBox"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            required
                        />
                        <label htmlFor="TosCheckBox" className="ml-2 block text-sm text-gray-900">
                            I agree to <u>StudyGator's</u> <Link className="text-[#0000EE]">Terms and condition of use</Link>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#231161] hover:bg-[#1f0e55] text-white font-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#231161] focus:ring-offset-2"
                    >
                        Sign Up
                    </button>

                    <div className="text-sm text-center">
                        <p className="text-gray-500">
                            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log In</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;