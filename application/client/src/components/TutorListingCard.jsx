/**************************************************************
* Author(s): Bryan Lee & Kenneth Wen
* Last Updated: 11/2/2024
*
* File:: TutorListingCard.jsx
*
* Description:: Individual tutor's listing card module.
*
**************************************************************/

import React from 'react';
import { Link } from 'react-router-dom'
import emailIcon from '../icons/EmailIcon.svg'; // Special image icon
import trashCanIcon from '../icons/TrashCanIcon.svg';

const TutorListingCard = ({ name, description, price, imgSrc, isDashboard }) => {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <Link to="/">
                <div className="h-80 overflow-hidden"> {/* Fixed height for the image container */}
                    <img className="rounded-t-lg object-cover w-full h-full" src={imgSrc} alt={`${name} profile`} />
                </div>
            </Link>

            {/* Rating and Message button container */}
            <div className="pl-5 mt-5 flex items-center justify-between">
                {/* Rating stars */}
                <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">4.95 out of 5</p>
                </div>

                {/* Message/Delete button */}
                {isDashboard === "false" ? (
                    <button type="button" className="mr-5 px-3 py-3 text-base font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <img src={emailIcon} className="w-10 h-4 filter invert brightness-200" alt="" />
                    </button>
                ) : (
                    <button type="button" className="mr-5 px-3 py-3 text-base font-medium text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-center">
                        <img src={trashCanIcon} className="w-10 h-4 filter invert hue-rotate-180" alt="" />
                    </button>
                )}
            </div>

            {/* Main content */}
            <div className="p-5 pt-2">
                <Link to="/">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 overflow-hidden">{name}</h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700">{description}</p>
                <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="flex items-baseline gap-1">
                        <p className="text-2xl font-extrabold leading-tight text-gray-900">${price}</p>
                        <p className="text-gray-700 text-sm">/ hour</p>
                    </div>

                    <button type="button" className="inline-flex items-center rounded-lg px-4 py-1.5 text-sm font-medium text-gray-900 bg-[#ffdc70] hover:bg-[#fc3] focus:outline-none focus:ring-4 focus:ring-yellow-500">
                        More details
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10" >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TutorListingCard;
