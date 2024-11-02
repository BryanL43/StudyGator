/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 9/19/2024
*
* File:: Navbar.jsx
*
* Description:: This file handles the web app's responsive navigation bar.
*               It controls the frontend of the search bar, user profile button,
*               and quick navigation.
*
**************************************************************/

import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext.js';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const [isSearchActive, setSearchActive] = useState(false);

    // Handle Hamburger dropdown button
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Handle user dropdown button
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    // Hide user dropdown when user clicks anywhere outside of the menu
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    // Load the user dropdown menu mouse event
    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    // State for managing search input value
    const [searchInput, setSearchInput] = useState('');
    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
    };

    // State for managing search subject drop down value
    const [selectedSubject, setSelectedSubject] = useState("All");
    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);

        // Update dropdown width based on selection
        const selectedText = event.target.options[event.target.selectedIndex].text;
        const minDefaultWidth = 80;
        const calculatedWidth = Math.max(minDefaultWidth, selectedText.length * 8 + 40);
        event.target.style.width = `${calculatedWidth}px`;
    };

    return (
        <nav className="bg-[#231161] border-gray-20">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex flex-grow items-center space-x-3 rtl:space-x-reverse mr-16">
                    {/* Logo */}
                    <Link to="/" className="flex w-fit items-center space-x-3 rtl:space-x-reverse">
                        <img src="/StudyGatorLogo.png" className="h-8" alt="StudyGator Logo" />
                    </Link>

                    {/* Search Bar with Subject Dropdown for Desktop Version */}
                    <div className={`relative hidden md:flex items-center flex-1 ${isSearchActive ? "ring-2 ring-yellow-500 rounded-lg" : ""}`}>

                        {/* Subject Dropdown */}
                        <select
                            className="h-10 px-3 p-2 pr-1 bg-[#e6e6e6] text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-r-yellow-500 focus:z-10"
                            value={selectedSubject}
                            onChange={handleSubjectChange}
                            defaultValue="All"
                            style={{ width: '80px' }} // default width
                        >
                            <option value="all" className="bg-white">All</option>
                            <option value="math" className="bg-white">Math</option>
                            <option value="medicine" className="bg-white">Medicine</option>
                            <option value="science" className="bg-white">Science</option>
                            <option value="humanities" className="bg-white">Humanities</option>
                            <option value="chinese literature & linguistics" className="bg-white">Chinese Literature & Linguistics</option>
                        </select>

                        {/* Search Input */}
                        <input
                            type="text"
                            id="search-navbar"
                            value={searchInput}
                            onChange={handleSearchChange}
                            onFocus={() => setSearchActive(true)}
                            onBlur={() => setSearchActive(false)}
                            pattern="[A-Za-z\s]*"
                            maxLength="40"
                            className="h-10 px-3 w-full block p-2 text-sm border-t border-b border-gray-300 bg-gray-50 focus:outline-none"
                            placeholder="Search For Tutors"
                        />

                        {/* Search Button with SVG Icon */}
                        <button type="submit" className="h-10 px-3 p-2 bg-[#FFDC70] border border-l-0 border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" >
                            <svg className="w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>

                </div>

                {/* Right Section (User button, Hamburger menu) */}
                <div className="flex md:order-2 items-center space-x-3">

                    {/* User Button */}
                    <div ref={dropdownRef} className={`relative ${user ? '' : 'hidden'}`}>
                        <button
                            type="button"
                            className="flex text-sm overflow-hidden bg-white rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 md:ml-4"
                            id="user-menu-button"
                            aria-expanded={isDropdownOpen}
                            onClick={toggleDropdown}
                        >
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src="/pfp.png" alt="Open user menu" />
                        </button>

                        {/* User Dropdown */}
                        {isDropdownOpen && (
                            <div
                                className="absolute -right-4 z-10 mt-5 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow"
                                id="user-dropdown"
                            >
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900">Bryan Lee</span>
                                    <span className="block text-sm text-gray-500 truncate">bryan@sfsu.edu</span>
                                </div>
                                <ul className="py-3" aria-labelledby="user-menu-button">
                                    <li>
                                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="#" onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Hamburger Button */}
                    <button onClick={toggleMenu} data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-[#fc3] focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-user" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>

                {/* Navbar for Mobile screens */}
                <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? '' : 'hidden'}`} id="navbar-user">

                    {/* Search Bar mobile version */}
                    <div className={`relative md:hidden mt-4 md:mt-0 flex items-center flex-row ${isSearchActive ? "ring-2 ring-yellow-500 rounded-lg" : ""}`}>

                        {/* Subject Dropdown */}
                        <select
                            className="h-10 px-3 p-2 pr-1 bg-[#e6e6e6] text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-r-yellow-500 focus:z-10"
                            value={selectedSubject}
                            onChange={handleSubjectChange}
                            defaultValue="All"
                            style={{ width: '80px' }} // default width
                        >
                            <option value="all" className="bg-white">All</option>
                            <option value="math" className="bg-white">Math</option>
                            <option value="medicine" className="bg-white">Medicine</option>
                            <option value="science" className="bg-white">Science</option>
                            <option value="humanities" className="bg-white">Humanities</option>
                            <option value="chinese literature & linguistics" className="bg-white">Chinese Literature & Linguistics</option>
                        </select>

                        {/* Search Input */}
                        <input
                            type="text"
                            id="search-navbar"
                            value={searchInput}
                            onChange={handleSearchChange}
                            onFocus={() => setSearchActive(true)}
                            onBlur={() => setSearchActive(false)}
                            pattern="[A-Za-z\s]*"
                            maxLength="40"
                            className="h-10 px-3 w-full text-sm border-t border-b border-gray-300 bg-gray-50 focus:outline-none"
                            placeholder="Search For Tutors"
                        />

                        {/* Search Button with SVG Icon */}
                        <button type="submit" className="h-10 px-3 p-2 bg-[#FFDC70] border border-l-0 border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" >
                            <svg className="w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>

                    {/* Buttons mobile version */}
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                        <li className={`${user ? '' : 'md:flex items-center justify-center'}`}>
                            <Link to="#" className="block py-2 px-3 text-black md:text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FFDC70] md:p-0">
                                Explore
                            </Link>
                        </li>
                        <li className={`${user ? '' : 'md:flex items-center justify-center'}`}>
                            <Link to="#" className="block py-2 px-3 text-black md:text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FFDC70] md:p-0">
                                Apply As Tutor
                            </Link>
                        </li>
                        <li className={`${user ? '' : 'md:flex items-center justify-center'}`}>
                            <Link to="/about" className="block py-2 px-3 text-black md:text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FFDC70] md:p-0">
                                About
                            </Link>
                        </li>

                        {!user && (
                            <>
                                <li className={`${user ? '' : 'md:flex items-center justify-center'}`}>
                                    <Link to="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FFDC70] md:text-white md:p-0">Log In</Link>
                                </li>
                                <button type="button" onClick={() => navigate("/signup")} className=" text-black md:text-center bg-[#FFDC70] hover:bg-[#fc3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-left font-16" style={{ fontSize: "16px" }}>Sign Up</button>
                            </>
                        )}
                    </ul>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;