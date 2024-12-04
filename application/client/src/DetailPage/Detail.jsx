/**************************************************************
* Author(s): MIN YE THWAY KHAING
* Last Updated: 11/10/2024
*
* File:: Detail.jsx
*
* Description:: this is the tutor detail page and it displays tutor's profile picture,
 subject expertise, short pitch, video, and additional information about the tutor.
 It includes options to message to the tutor and view their resume.

**************************************************************/
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailIcon from '../icons/EmailIcon.svg';

import MessagePopUp from '../components/MessagePopUp';
import SuccessAlert from '../components/SuccessAlert';

const Detail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { tutor } = location.state || {};
    const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);

    const togglePdfModal = () => {
        setIsPdfModalOpen(!isPdfModalOpen);
    };

    useEffect(() => {
        window.scrollTo({ top: 0 }); // Load screen at the top
    }, []);

    // State to control modal visibility
    const [isMsgPopUpOpen, setMsgPopUpOpen] = useState(false);

    const toggleModal = () => {
        setMsgPopUpOpen(!isMsgPopUpOpen);
    };

    return (
        <div className="flex flex-col items-center bg-gray-50">

            {/* Success alert */}
            {successAlert && (
                <SuccessAlert message="Your message was successfully sent!" />
            )}

            {isMsgPopUpOpen && (
                <MessagePopUp
                    name={tutor?.tutorName || ""}
                    title={tutor?.title || ""}
                    content=""
                    metadata={tutor}
                    toggleModal={toggleModal}
                    isSending={true}
                    setSuccessAlert={setSuccessAlert}
                />
            )}

            {/* Full Width Background Section */}
            <div
                className="w-full h-64 mb-[-3rem] bg-cover bg-center"
                style={{
                    backgroundImage: "url('/SFSU-img-3.jpg')",
                }}
            ></div>

            {/* Tutor Profile Picture */}

            <div className="relative w-full flex justify-center -mt-20">
                {/* Fixed-Size Container for the Profile Picture */}
                <div className="w-80 h-80 rounded-md shadow-xl overflow-hidden bg-white">
                    <img
                        src={tutor?.image || '/default-profile.png'}
                        alt={`${tutor?.tutorName}'s profile`}
                        className="w-full h-full object-cover transform scale-100 hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </div>

           {/* Message and Resume Buttons */}
           <div className="flex items-center justify-center space-x-4 mt-4">
                <button
                    type="button"
                    onClick={toggleModal}
                    className="flex items-center justify-between px-4 py-2 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg"
                >
                    Message
                    <img src={emailIcon} alt="Message Icon" className="w-5 h-5 ml-2 invert brightness-200" />
                </button>

                {tutor?.attached_file && (
                    <button
                        onClick={togglePdfModal}
                        className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-green-400 focus:ring-4 focus:outline-none"
                    >
                        View Resume/CV
                    </button>
                )}
            </div>

             {/* PDF Modal */}
             {isPdfModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-center w-full">Resume/CV</h3>
                            <button
                                onClick={togglePdfModal}
                                className="text-gray-800 hover:text-gray-700 hover:underline"
                            >
                                Close
                            </button>
                        </div>

                        {/* PDF Embed Viewer */}
                        <div className="overflow-auto" style={{ maxHeight: '90vh' }}>
                            <iframe
                                src={tutor.attached_file}
                                width="100%"
                                height="700px"
                                className="rounded-md"
                                title="Resume PDF"
                                style={{ border: "none" }}
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}





            {/* Tutor Information */}
            <div className="text-center mb-8 mt-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{tutor?.tutorName}</h2>
                <p className="text-lg text-gray-700"><strong>Subject Expertise:</strong> {tutor?.subjectName || 'N/A'}</p>
            </div>

            {/* Short Pitch */}
            <div className="w-full max-w-lg text-left mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Short Pitch</h3>
                <p className="text-gray-700">{tutor?.sales_pitch?.slice(0, 300) || 'N/A'}</p>
            </div>


            {/* Video Section */}

            {tutor?.attached_video && (
                <div className="flex justify-center w-full max-w-screen-md mb-8">
                    {/* Aspect Ratio Wrapper */}
                    <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
                        <video
                            controls
                            className="absolute top-0 left-0 w-full h-full rounded-md shadow-2xl object-cover"
                        >
                            <source src={tutor?.attached_video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>

            )}

            {/* About Tutor */}
            <div className="w-full max-w-lg text-left">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">About Tutor</h3>
                <p className="text-gray-700">{tutor?.description || 'N/A'}</p>
            </div>

            {/* Back Button */}
            <div className="w-full flex justify-end p-4 max-w-screen-md">
                <button
                    type="button"
                    onClick={toggleModal}
                    className="flex items-center justify-between px-4 py-2 mr-4 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg"
                >
                    Message
                    <img src={emailIcon} alt="Message Icon" className="w-5 h-5 ml-2 invert brightness-200" />
                </button>
                <button
                    onClick={() => navigate(-1)} // Navigate back to the previous page
                    className="flex items-center text-white bg-[#231161] hover:bg-[#1f0e55] focus:ring-[#552988] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                    Back
                    <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                </button>
            </div>

        


        </div>


    );
};

export default Detail;


