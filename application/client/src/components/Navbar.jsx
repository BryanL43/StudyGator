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
import { Link } from 'react-router-dom'

const Navbar = () => {
    const loggedIn = true; // !Placeholder for log in state! (will be implemented with login system)

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

    return (
        <div className="App">
            <nav className="bg-[#231161] border-gray-20">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="flex flex-grow items-center space-x-3 rtl:space-x-reverse mr-16">
                        {/* Logo */}
                        <a href="/" className="flex w-fit items-center space-x-3 rtl:space-x-reverse">
                            <img src="https://www.sfsu.edu/profiles/custom/sfstatedrupal/themes/custom/sfstatetemplate/patternlab/public/images/SFState_logo_color.jpg" className="h-8" alt="SFSU Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Tutor</span>
                        </a>

                        {/* Search Bar */}
                        <div className="relative hidden lg:block flex-1 pr-2">
                            <input type="text" id="search-navbar" value={searchInput} onChange={handleSearchChange} pattern="[A-Za-z\s]*" maxLength="40" className="w-full block p-2 pl-3 pe-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." />
                            <div className="absolute right-[20px] top-1/2 -translate-y-1/2  flex items-center pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search icon</span>
                            </div>
                        </div>

                    </div>

                    {/* Right Section (User button, Hamburger menu) */}
                    <div className="flex lg:order-2 items-center space-x-3">

                        {/* Mobile Search Icon */}
                        <button onClick={toggleMenu} type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="lg:hidden text-white hover:bg-[#fc3] focus:outline-none focus:ring-4 focus:ring-gray-200  rounded-lg text-sm p-2.5 me-1">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>

                        {/* User Button */}
                        <div ref={dropdownRef} className={`relative ${loggedIn ? '' : 'hidden'}`}>
                            <button
                                type="button"
                                className="flex text-sm overflow-hidden bg-[#FFDC70] rounded-full lg:me-0 focus:ring-4 focus:ring-gray-300 lg:ml-4"
                                id="user-menu-button"
                                aria-expanded={isDropdownOpen}
                                onClick={toggleDropdown}
                            >
                                <span className="sr-only">Open user menu</span>
                                <img className="w-8 h-8 rounded-full" src="" alt="Open user menu" />
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
                                            <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Earnings</Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Hamburger Button */}
                        <button onClick={toggleMenu} data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg lg:hidden hover:bg-[#fc3] focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-user" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>

                    {/* Navbar for Mobile screens */}
                    <div className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${isMenuOpen ? '' : 'hidden'}`} id="navbar-user">

                        {/* Search Bar mobile version */}
                        <div className="relative lg:hidden">
                            <input type="text" id="search-navbar" value={searchInput} onChange={handleSearchChange} pattern="[A-Za-z\s]*" maxLength="40" className="block mt-4 lg:mt-0 w-full p-2 pl-3 pe-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." />
                            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search icon</span>
                            </div>
                        </div>

                        {/* Buttons mobile version */}
                        <ul className="flex flex-col font-medium p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-transparent">
                            <li className={`${loggedIn ? '' : 'lg:flex items-center justify-center'}`}>
                                {loggedIn ? (
                                    <Link to="/" className="block py-2 px-3 text-black bg-[#FFDC70] hover:bg-[#fc3] rounded lg:bg-transparent lg:hover:text-[#FFDC70] lg:text-white lg:hover:bg-transparent lg:p-0" aria-current="page">Home</Link>
                                ) : (
                                    <Link to="/" className="block py-2 px-3 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-[#FFDC70] lg:text-white lg:p-0">Home</Link>
                                )}
                            </li>
                            <li className={`${loggedIn ? '' : 'lg:flex items-center justify-center'}`}>
                                <Link to="#" className="block py-2 px-3 text-black lg:text-white rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-[#FFDC70] lg:p-0">
                                    Explore
                                </Link>
                            </li>
                            <li className={`${loggedIn ? '' : 'lg:flex items-center justify-center'}`}>
                                <Link to="#" className="block py-2 px-3 text-black lg:text-white rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-[#FFDC70] lg:p-0">
                                    Services
                                </Link>
                            </li>
                            <li className={`${loggedIn ? '' : 'lg:flex items-center justify-center'}`}>
                                <Link to="/about" className="block py-2 px-3 text-black lg:text-white rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-[#FFDC70] lg:p-0">
                                    About
                                </Link>
                            </li>

                            {!loggedIn && (
                                <>
                                    <li className={`${loggedIn ? '' : 'lg:flex items-center justify-center'}`}>
                                        <Link href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-[#FFDC70] lg:text-white lg:p-0">Log In</Link>
                                    </li>
                                    <button type="button" class=" text-black lg:text-center bg-[#FFDC70] hover:bg-[#fc3] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-left font-16" style={{ fontSize: "16px" }}>Sign Up</button>
                                </>
                            )}
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
