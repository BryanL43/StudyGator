/**************************************************************
* Author(s): Bryan Lee & Min Ye Thway Khaing & Kenneth Wen
* Last Updated: 10/25/2024
*
* File:: LoginPage.jsx
*
* Description:: This file handles the basic user login page.
*               It validates credential and acquire the JWT token
*               for dashboard, applying as tutor, and message operations.
*
**************************************************************/

import React, { useState, useEffect } from 'react';
import ReactGA from "react-ga4";
import { Link, useNavigate } from 'react-router-dom';
import { MdLock, MdMail } from 'react-icons/md';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useAuth } from '../AuthContext';

import loadingIcon from '../icons/LoadingIcon.svg';
import ErrorAlert from '../components/ErrorAlert';

import axios from 'axios';
import BASE_URL from "../utils/config";

const LoginPage = () => {
    const navigate = useNavigate();
    const { user, login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pwdVis, setPwdVis] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [serverError, setServerError] = useState(false);

    // If user is already signed in, then forcefully redirect to browsing page.
    useEffect(() => {
        if (user) {
            navigate("/search");
        }
    })

    const resetServerError = () => {
        setServerError(false);
    };

    // Prompt a validation event on the backend with the filled credential
    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await axios.post(`${BASE_URL}/api/login`, {
                email,
                password,
            });
            
            // Send the recieved JWT token to AuthContext for client-sided memorization
            login(response.data.token, rememberMe);
            setLoading(false);
            setServerError(false);
            
            // If there is a formData in localStorage, this indicates a lazy registeration for applying as tutor.
            // Requires a forceful redirect to apply page for auto-fill
            if (!localStorage.getItem("formData")) {
                navigate("/");
            } else {
                navigate("/apply");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError(error.response ? error.response.data.message : "Fatal: network/server error");
            } else {
                setLoading(false);
                setServerError(true);
            }
        }
    };

    // Google Analytics
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "Login page" });
    }, []);

    return (
        <div className="top-0 flex items-center justify-center sm:min-h-screen bg-gray-100">
            {/* Server error warning */}
            {serverError &&
                <ErrorAlert message="Failed to register. Fatal: network/server error!" resetError={resetServerError} />
            }

            {/* Darken background image */}
            <img src="/SFSU-img-4.png" className="absolute w-full h-full object-cover z-10 filter brightness-[0.8] sm:block hidden" alt="Bird eye view of SFSU" />
            
            {/* Container for the login form */}
            <div className="w-full sm:max-w-md bg-white p-8 sm:rounded-lg sm:shadow-md z-30">

                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            SFSU Email
                        </label>
                        <div className="mt-1 flex items-center border border-gray-300 rounded-md shadow-sm">
                            <MdMail className="ml-2 mr-2 text-gray-400" size={30} />
                            <input
                                type="text"
                                placeholder="SFSU Email"
                                className="block w-full p-2 border-none focus:ring-transparent"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                maxLength={255}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1 flex items-center border border-gray-300rounded-md shadow-sm">
                            <MdLock className="ml-2 mr-2 text-gray-400" size={30} />
                            <input
                                type={pwdVis ? "text" : "password"}
                                placeholder="Password"
                                className="block w-full p-2 border-none focus:ring-transparent"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                maxLength={255}
                                required
                            />
                            {/* Password visibility toggle button */}
                            <button id="passwordVis" type="button" onClick={() => {setPwdVis(prevVisible => !prevVisible)}}>
                                {pwdVis ? (
                                    <FaRegEyeSlash className="ml-2 mr-2 text-gray-400 hover:text-gray-500" size={25} />
                                ) : (
                                    <FaRegEye className="ml-2 mr-2 text-gray-400 hover:text-gray-500" size={25} />
                                )}
                            </button>
                        </div>
                    </div>
                    
                    {/* Label to display for any potential errors */}
                    {error && <p className='text-red-500 text-sm'>{error}</p>}

                    {/* Loading icon */}
                    {loading && !error &&
                        <div className="flex items-center justify-center">
                            <img src={loadingIcon} className="w-20 h-20" alt="Loading..." />
                        </div>
                    }

                    {/* Remember Me Checkbox */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                            Remember Me
                        </label>
                    </div>

                    {/* Dummy forgot password link */}
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-500 hover:underline">
                            Forgot Password?
                        </span>
                        <button
                            type="submit"
                            className="bg-[#231161] hover:bg-[#1f0e55] text-white font-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-4 focus:ring-[#552988]"
                        >
                            Login
                        </button>
                    </div>
                    
                    {/* Sign up redirect link */}
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