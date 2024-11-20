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
import { MdLock, MdMail, MdPerson } from 'react-icons/md';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useAuth } from '../AuthContext';

import loadingIcon from '../icons/LoadingIcon.svg';
import ErrorAlert from '../components/ErrorAlert';

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
    const [errors, setErrors] = useState([]);
    const [serverError, setServerError] = useState(false);

    // Redirect registered user to search page if they are already signed in
    useEffect(() => {
        if (user) {
            navigate("/search");
        }
    })

    const resetServerError = () => {
        setServerError(false);
    };

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
        let formErrors = [];
    
        // Check if all fields are filled
        if (!name || !email || !password) {
            formErrors.push("Please fill in all fields.");
        }
    
        // Check if email matches the required format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@sfsu\.edu$/;
        if (!emailRegex.test(email)) {
            formErrors.push("Email must end with @sfsu.edu");
        }
    
        // Check if password contains spaces
        if (password.includes(" ")) {
            formErrors.push("Password cannot contain spaces.");
        }
    
        // Password specific checks
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
        const hasLength = password.length >= 8;
        
        // Ensure strong password
        if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasLength)) {
            formErrors.push("Password must be at least 8 characters in length (and up to 255 characters).");
            formErrors.push("Password must contain at least one lowercase & uppercase letter.");
            formErrors.push("Password must contain at least one number.");
            formErrors.push("Password must contain at least one special character, e.g., ! @ # ?");
        }
    
        // Update the state with the error messages
        setErrors(formErrors);
    
        // If no errors, return true
        return formErrors.length === 0;
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateRegistrationForm()) {
            setLoading(true);
            setErrors([]);

            try {
                const requestBody = {
                    name,
                    email,
                    password
                }
                await axios.put(`${BASE_URL}/api/register`, requestBody);
                setLoading(false);
                setServerError(false);
                setPasswordStrength("no password");
                navigate("/login");
            } catch (error) {
                console.error("Error registering account:", error);
                setLoading(false);
                setServerError(true);
            }
        }
    };

    return (
        <div className="top-0 flex items-center justify-center sm:min-h-screen bg-gray-100">
            {/* Server error warning */}
            {serverError &&
                <ErrorAlert message="Failed to register. Fatal: network/server error!" resetError={resetServerError} />
            }

            <img src="/SFSU-img-4.png" className="absolute w-full h-full object-cover z-10 filter brightness-[0.8] sm:block hidden" alt="Bird eye view of SFSU" />
            <div className="w-full sm:max-w-md bg-white p-8 sm:rounded-lg sm:shadow-md z-30">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="Name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <div className="mt-1 flex items-center border border-gray-300 rounded-md shadow-sm">
                            <MdPerson className="ml-2 mr-2 text-gray-400" size={30} />
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
                            <MdMail className="ml-2 mr-2 text-gray-400" size={30} />
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
                            <button id="passwordVis" type="button" onClick={() => { setPwdVis(prevVisible => !prevVisible) }}>
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

                    {errors && errors.length > 0 && (
                        <div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Danger</span>
                            <div>
                                <span className="font-medium">Ensure that these requirements are met:</span>
                                <ul className="mt-1.5 list-disc list-inside">
                                    {errors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Loading icon */}
                    {loading &&
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
                        className="w-full bg-[#231161] hover:bg-[#1f0e55] text-white font-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-4 focus:ring-[#552988]"
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