/**************************************************************
* Author(s): Bryan Lee & Min Ye Thway Khaing
* Last Updated: 10/25/2024
*
* File:: SignupPage.jsx
*
* Description:: This file handles the registeration page.
*
**************************************************************/

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdLock, MdPerson } from 'react-icons/md';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useAuth } from '../AuthContext';

import loadingIcon from '../icons/LoadingIcon.svg';

import axios from 'axios';
import BASE_URL from "../utils/config";

const SignupPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pwdVis, setPwdVis] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('no password');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            navigate("/search"); // Redirect to search all later (browsing pg)
        }
    })

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        updatePWDStrength(newPassword);
    };

    const updatePWDStrength = (password) => {
        let hasUpperCase = /[A-Z]/.test(password);
        let hasLowerCase = /[a-z]/.test(password);
        let hasNumber = /\d/.test(password);
        let hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
        let hasLength = password.length >= 8;

        let strength = 0;
        if (hasUpperCase) strength++;
        if (hasLowerCase) strength++;
        if (hasNumber) strength++;
        if (hasSpecialChar) strength++;
        if (hasLength) strength++;

        if (strength === 0) {
            setPasswordStrength('no password');
        } else if (strength >= 1 && strength <= 3) {
            setPasswordStrength('weak password');
        } else if (strength === 4) {
            setPasswordStrength('medium password');
        } else {
            setPasswordStrength('strong password');
        }
    };

    const validateRegistrationForm = () => {
        if (!name || !email || !password) {
            setError("Please fill in all fields.");
            return false;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@sfsu\.edu$/;
        if (!emailRegex.test(email)) {
            setError("Email must end with @sfsu.edu");
            return false;
        }

        if (password.includes(" ")) {
            setError("Password cannot contain spaces.");
            return false;
        }

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
        const hasLength = password.length >= 8;

        if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasLength)) {
            setError("Passwords must be at least 8 characters in length and contain 1 upper case letter, 1 lower case letter, 1 number, and 1 special character.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateRegistrationForm()) {
            setLoading(true);
            setError('');

            try {
                const requestBody = {
                    name,
                    email,
                    password
                }
                await axios.put(`${BASE_URL}/api/register`, requestBody);
                setLoading(false);
                setPasswordStrength("no password");
                navigate("/login");
            } catch (error) {
                setError(error.response ? error.response.data.message : "Fatal: network/server error");
            }
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
                                className="block w-full p-2 border-none focus:ring-transparent"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                maxLength={255}
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
                                className="block w-full p-2 border-none focus:ring-transparent0"
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
                        <div className="mt-1 flex items-center border border-gray-300 rounded-md shadow-sm">
                            <MdLock className="ml-2 mr-2 text-gray-400" size={30} />
                            <input
                                type={pwdVis ? "text" : "password"}
                                className="block w-full p-2 border-none focus:ring-transparent"
                                value={password}
                                onChange={handlePasswordChange}
                                maxLength={255}
                                required
                            />
                            <button id="passwordVis" type="button" onClick={() => {setPwdVis(prevVisible => !prevVisible)}}>
                                {pwdVis ? (
                                    <FaRegEyeSlash className="ml-2 mr-2 text-gray-400 hover:text-gray-500" size={25} />
                                ) : (
                                    <FaRegEye className="ml-2 mr-2 text-gray-400 hover:text-gray-500" size={25} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className={`h-2 w-full flex items-center justify-start ${passwordStrength === "no password" ? "hidden" : ""}`}>
                        <div className={`h-full w-2/12 bg-red-600 border border-gray-400 ${passwordStrength === "weak password" || "medium password" ? "" : "hidden"}`}></div>
                        <div className={`h-full w-2/12 bg-yellow-500 border border-gray-400 ${passwordStrength === "medium password" || passwordStrength === "strong password" ? "" : "hidden"}`}></div>
                        <div className={`h-full w-2/12 bg-green-600 border border-gray-400 ${passwordStrength === "strong password" ? "" : "hidden"}`}></div>
                        {passwordStrength && (
                            <p className="h-2 ml-[10px] text-[14px] mb-3 text-gray-900">
                                {passwordStrength === "weak password" ? "Weak password" :
                                passwordStrength === "medium password" ? "Medium password" :
                                passwordStrength === "strong password" ? "Strong password" : ""}
                            </p>
                        )}
                    </div>

                    {error && <p className='text-red-500 text-sm'>{error}</p>}

                    {/* Loading icon */}
                    {loading && !error &&
                        <div className="flex items-center justify-center">
                            <img src={loadingIcon} className="w-20 h-20" alt="Loading..." />
                        </div>
                    }

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