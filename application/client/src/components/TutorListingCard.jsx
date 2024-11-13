/**************************************************************
* Author(s): Bryan Lee & Kenneth Wen & MIN YE THWAY KHAING
* Last Updated: 11/2/2024
*
* File:: TutorListingCard.jsx
*
* Description:: Individual tutor's listing card module.
*
**************************************************************/

import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import emailIcon from '../icons/EmailIcon.svg';
import trashCanIcon from '../icons/TrashCanIcon.svg';
import axios from 'axios';
import BASE_URL from '../utils/config';

import Confirmation from './Confirmation';

const TutorListingCard = React.memo(({ metadata, isDashboard, refreshList }) => {
    const [deleteWarning, setDeleteWarning] = useState(false);

    const toggleDeleteWarning = () => setDeleteWarning(!deleteWarning);

    const deleteListing = async() => {
        try {
            await axios.delete(`${BASE_URL}/api/delete`, {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                },
                data: {
                    listingId: metadata.id
                }
            });
            refreshList();
        } catch (error) {
            console.error("Error deleting listing:", error);
        };
    }

    const handleDeleteConfirm = () => {
        setDeleteWarning(false);
        deleteListing();
    };

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <Confirmation 
                deleteWarning={deleteWarning} 
                toggleDeleteWarning={toggleDeleteWarning} 
                onConfirm={handleDeleteConfirm}
                message="Are you sure you want to delete the following listing?"
            />
            {/* Image render */}
            <Link to="/">
                <div className="h-80 overflow-hidden"> {/* Fixed height for the image container */}
                    <img className="rounded-t-lg object-cover w-full h-full" src={metadata.image} alt={`${metadata.name} profile`} />
                </div>
            </Link>

            {/* Main card content */}
            <div className="p-5 pt-2">
                {/* Name and Message/Delete button container to prevent overflow and wrapping */}
                <div className="flex items-center space-x-4 mt-4 mb-2 justify-between">
                    <Link to="/" className="flex-1 max-w-[75%]">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 overflow-hidden truncate">
                            {metadata.tutorName}
                        </h5>
                    </Link>

                    {/* Message/Delete button */}
                    {isDashboard === false ? (
                        <button
                            type="button"
                            className="px-3 py-3 min-w-[64px] min-h-[40px] text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg"
                        >
                            <img src={emailIcon} className="w-10 h-4 filter invert brightness-200" alt="message tutor" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="px-3 py-3 min-w-[64px] min-h-[40px] text-base font-medium text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg"
                            onClick={toggleDeleteWarning}
                        >
                            <img src={trashCanIcon} className="w-10 h-4 filter invert hue-rotate-180" alt="delete listing" />
                        </button>
                    )}
                </div>
                
                {/* Description content */}
                <p className="mb-3 font-normal text-gray-700">{metadata.sales_pitch}</p>

                {/* Bottom bar with pricing & More detail button */}
                <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="flex items-baseline gap-1">
                        <p className="text-2xl font-extrabold leading-tight text-gray-900">${metadata.pricing}</p>
                        <p className="text-gray-700 text-sm">/ hour</p>
                    </div>
                    {/*More Detail button to link */}
                    <Link to ={{ pathname: "/detail", }} state ={{tutor: metadata}} //pass the metadata as State

                     className="inline-flex items-center rounded-lg px-4 py-1.5 text-sm font-medium text-gray-900 bg-[#ffdc70] hover:bg-[#fc3] focus:outline-none focus:ring-4 focus:ring-yellow-500">
                        More details
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10" >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
});

export default TutorListingCard;

