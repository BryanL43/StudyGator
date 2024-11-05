/**************************************************************
* Author(s): Kenneth Wen
* Last Updated: 11/2/2024
*
* File:: ListingPage.jsx
*
* Description:: The listing page that shows the tutor listings o
*               tutors on the site.
*
**************************************************************/
import React, { useState } from 'react';
import TutorListingCard from '../components/TutorListingCard';
import { Link } from 'react-router-dom';

const ListingPage = () => {
    const [selectedSubject, setSelectedSubject] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
    const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

    const toggleDropdown = (type) => {
        if (type === 'subject') {
            setIsSubjectDropdownOpen(!isSubjectDropdownOpen);
            setIsPriceDropdownOpen(false);
        } else if (type === 'price') {
            setIsPriceDropdownOpen(!isPriceDropdownOpen);
            setIsSubjectDropdownOpen(false);
        }
    };
    const handleSubjectSelect = (subject) => {
        setSelectedSubject(subject);
        setIsSubjectDropdownOpen(false); // Close the dropdown after selection
    };

    return (
        <div className="flex flex-col items-center p-8 bg-gray-50">
            <h1 className="text-2xl font-bold mb-6">Browse Tutor Listings</h1>
            <div className="flex justify-center w-full max-w-screen-lg mb-4 space-x-4">
                <div className="relative inline-block">
                    <button
                        id="subjectDropdown"
                        onClick={() => toggleDropdown('subject')}
                        className="flex items-center justify-between border border-gray-300 text-gray-800 bg-white hover:bg-purple-100 focus:ring-2 focus:ring-purple-400 rounded-lg text-lg px-5 py-2.5 w-60"
                    >
                        {selectedSubject ? selectedSubject : 'I need help with...'}
                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    {isSubjectDropdownOpen && (
                        <div className="absolute z-10 bg-white divide-y divide-gray-200 rounded-lg shadow-md w-64 mt-1">
                            <ul className="py-2 text-sm text-gray-700">
                                <li>
                                    <Link
                                        to="#"
                                        onClick={() => handleSubjectSelect('')}
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        All Subjects
                                    </Link>
                                    <Link
                                        to="#"
                                        onClick={() => handleSubjectSelect('English')}
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        English
                                    </Link>
                                    <Link
                                        to="#"
                                        onClick={() => handleSubjectSelect('Math')}
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Math
                                    </Link>
                                    <Link
                                        to="#"
                                        onClick={() => handleSubjectSelect('Science')}
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Science
                                    </Link>
                                    <Link
                                        to="#"
                                        onClick={() => handleSubjectSelect('Medicine')}
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Medicine
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="relative inline-block">
                    <button
                        id="priceDropdown"
                        onClick={() => toggleDropdown('price')}
                        className="border border-gray-300 text-gray-800 bg-white hover:bg-purple-100 focus:ring-2 focus:ring-purple-400 rounded-lg text-lg px-5 py-2.5 flex items-center"
                    >
                        Price
                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    {isPriceDropdownOpen && (
                        <div className="absolute z-10 border bg-white divide-y divide-gray-200 rounded-lg shadow-md w-full sm:w-48 md:w-64 max-w-xs mt-1 p-4 left-0 right-0 mx-auto">
                            <label className="text-sm font-semibold mb-2">Price Range:</label>
                            <div className="flex flex-col py-3">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice))}
                                    className="slider"
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice))}
                                    className="slider"
                                />
                                <div className="flex justify-between text-sm text-gray-700 mt-2">
                                    <span>${minPrice}</span>
                                    <span>to</span>
                                    <span>${maxPrice}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="font-sans text-xl font-semibold md:pl-32 py-2 w-full text-left">
                <p>Showing X tutors.</p>
            </div>
            {/* Container for cards */}
            {/* Grid layout with 4 columns for the listing cards*/}
            <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 justify-center">

                <TutorListingCard
                    name="Bryan Lee"
                    description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec."
                    price="1,699"
                    imgSrc="/sillydogpfp.webp"
                    isDashboard="false"
                />
                <TutorListingCard
                    name="Bryan Lee"
                    description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec."
                    price="1,699"
                    imgSrc="pfp.png"
                    isDashboard="false"
                />
                <TutorListingCard
                    name="Bryan Lee"
                    description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec."
                    price="1,699"
                    imgSrc="sfsu-img-4.png"
                    isDashboard="false"
                />
                <TutorListingCard
                    name="Bryan Lee"
                    description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec."
                    price="1,699"
                    imgSrc="/sillydogpfp.webp"
                    isDashboard="false"
                />
                <TutorListingCard
                    name="Bryan Lee"
                    description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec."
                    price="100"
                    imgSrc="sfsu-img-3.jpg"
                    isDashboard="false"
                />
                <TutorListingCard
                    name="Bryan Lee"
                    description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec."
                    price="1,699"
                    imgSrc="sfsu-img-4.png"
                    isDashboard="false"
                />
            </div>
        </div>
    );
};
export default ListingPage;