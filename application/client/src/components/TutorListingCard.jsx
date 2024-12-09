/**************************************************************
* Author(s): Bryan Lee & Kenneth Wen & MIN YE THWAY KHAING
* Last Updated: 11/2/2024
*
* File:: TutorListingCard.jsx
*
* Description:: Individual tutor's listing card component that advertises
*               the tutor's service.
*
**************************************************************/

import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import emailIcon from '../icons/EmailIcon.svg';
import trashCanIcon from '../icons/TrashCanIcon.svg';
import axios from 'axios';
import BASE_URL from '../utils/config';

import Confirmation from './Confirmation';
import MessagePopUp from './MessagePopUp';
import SuccessAlert from './SuccessAlert';

/**
 * Creates the individual tutor's listing card component. It will memorize the content
 * for optimization.
 * 
 * @param {Object} metadata The underlying data retrieved from the database for a listing. 
 * @param {boolean} isDashboard Determine if we should render the delete listing button on dashboard or not.
 * @param {function} refreshList The pass-by-reference to refresh the dashboard listing list if the individual listing is deleted.
 * @returns The tutor listing card.
 */
const TutorListingCard = React.memo(({ metadata, isDashboard, refreshList }) => {
    const [successAlert, setSuccessAlert] = useState(false);
    const [deleteWarning, setDeleteWarning] = useState(false);

    const toggleDeleteWarning = () => setDeleteWarning(!deleteWarning);

    // Prompt the backend to verify credential and prompt the delete listing
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

    // Trigger the api call if the user confirms to delete
    const handleDeleteConfirm = () => {
        setDeleteWarning(false);
        deleteListing();
    };

    // State to control modal visibility
    const [isMsgPopUpOpen, setMsgPopUpOpen] = useState(false);

    const toggleModal = () => {
        setMsgPopUpOpen(!isMsgPopUpOpen);
    };

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <Confirmation 
                deleteWarning={deleteWarning} 
                toggleDeleteWarning={toggleDeleteWarning} 
                onConfirm={handleDeleteConfirm}
                message="Are you sure you want to delete the following listing?"
            />

            {isMsgPopUpOpen && (
                <MessagePopUp
                    name={metadata.tutorName}
                    title={metadata.title}
                    content=""
                    metadata={metadata}
                    toggleModal={toggleModal}
                    isSending={true}
                    setSuccessAlert={setSuccessAlert}
                />
            )}

            {/* Success alert */}
            {successAlert && (
                <SuccessAlert message="Your message was successfully sent!" />
            )}

            {/* Listing title */}
            <Link to={{pathname : "/detail", }} state={{tutor: metadata}}>
                <h1 className="text-xl font-bold tracking-tight text-gray-900 text-ellipsis px-4 py-2 line-clamp-2 hover:underline min-h-16 max-h-16" >{metadata.title}</h1>
            </Link>

            {/* Image render */}
            <Link to={{pathname : "/detail", }} state={{tutor: metadata}}>
                <div className="h-80 overflow-hidden bg-gray-50"> {/* Fixed height for the image container */}
                    <img className="object-cover w-full h-full" src={metadata.image} alt={`${metadata.name} profile`} />
                </div>
            </Link>

            {/* Main card content */}
            <div className="p-5 pt-2">
                {/* Name and Pricing container */}
                <div className="flex items-center space-x-4 mt-4 mb-2 justify-between">
                    <Link 
                        to={{
                            pathname: "/detail",
                        }}
                        state={{ tutor: metadata }} 
                        className="flex-1 max-w-[75%]"
                    >
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 overflow-hidden truncate">
                            {metadata.tutorName}
                        </h5>
                    </Link>

                    {/* Pricing Section */}
                    <div className="flex items-baseline gap-1">
                        <p className="text-2xl font-extrabold leading-tight text-gray-900">${metadata.pricing}</p>
                        <p className="text-gray-700 text-sm">/ hour</p>
                    </div>
                </div>

                {/* Subject Display */}
                <p className="mb-3 inline-block px-3 py-1 bg-gray-200 rounded-full text-gray-800 font-medium">
                    {metadata.subjectName || 'No Subject Specified'}
                </p>
                
                {/* Description content */}
                <p className="mb-3 font-normal text-gray-700 min-h-48 max-h-48 overflow-hidden">{metadata.sales_pitch}</p>

                {/* Bottom bar with Message & More detail button OR the delete button for dashboard */}
                <div className="mt-4 flex items-center justify-between gap-4">
                    {/* Message Button */}
                    {isDashboard === false ? (
                        <button
                        type="button"
                        onClick={toggleModal}
                        className="flex items-center justify-between px-4 py-2 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg"
                    >
                        Message
                        <img src={emailIcon} alt="Message Icon" className="w-5 h-5 ml-2 invert brightness-200" />
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

                    {/* More Detail button */}
                    <Link to={{ pathname: "/detail" }} state={{ tutor: metadata }} 
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-[#ffdc70] hover:bg-[#fc3] focus:outline-none focus:ring-4 focus:ring-yellow-500 rounded-lg min-w-[64px] min-h-[40px]">
                        More details
                        <svg className="rtl:rotate-180 w-5 h-5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
});

export default TutorListingCard;


