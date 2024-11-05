/**************************************************************
* Author(s): Kenneth Wen & Bryan Lee
* Last Updated: 10/26/2024
*
* File:: Results.jsx
*
* Description:: This file handles the results page. The 
*               results will display in a column separated 
*               by a line.
*
**************************************************************/

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import BASE_URL from '../utils/config';
import { useLocation } from 'react-router-dom';  
import Search from './Search';

const Results = () => {
    const location = useLocation();
    const [listings, setListings] = useState([]);
    const [randomListing, setRandomListing] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Extract query information from URL
    const queryParams = new URLSearchParams(location.search);
    const selectedSubject = queryParams.get('selectedSubject') || '';
    const searchTerm = queryParams.get('searchTerm') || '';
    
    // Fetch listing search results
    const fetchListings = useCallback(async() => {
        try {
            const response = await axios.get(`${BASE_URL}/api/search`, {
                params: {
                    selectedSubject: selectedSubject,
                    searchTerm: searchTerm
                }
            });
            
            if (!response.data.random) {
                setRandomListing(false);
                setListings(response.data.results);
            } else { // Randomly select listings if search query yields no possible desired result
                const totalCount = response.data.count; // Total number of listings possible
                const randomCount = Math.floor(Math.random() * totalCount) + 1;

                // Shuffle the listings and take a random selection
                const shuffledListings = response.data.results.sort(() => 0.5 - Math.random());
                const randomListings = shuffledListings.slice(0, randomCount);
                
                setRandomListing(true);
                setListings(randomListings);
            }
        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    }, [selectedSubject, searchTerm]);

    useEffect(() => {
        fetchListings();
    }, [fetchListings]);

    // Function to handle PDF rendering
    // const handleImageClick = async(attachedFile) => {
    //     if (attachedFile) {
    //         try {
    //             const response = await axios.get(attachedFile, {
    //                 responseType: 'blob',
    //             });
                
    //             // Create a URL for the blob and update state
    //             const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    //             setPdfUrl(url);
    //             setIsModalOpen(true);
    //         } catch (error) {
    //             console.error("Error fetching PDF:", error);
    //         }
    //     }
    // };
    
    // Function to handle video rendering
    const handleImageClick = async(attachedVideo) => {
        if (attachedVideo) {
            try {
                const response = await axios.get(attachedVideo, {
                    responseType: 'blob',
                });
                
                // Create a URL for the blob and update state
                const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/mp4' }));
                setVideoUrl(url);
                setIsModalOpen(true);
            } catch (error) {
                console.error("Error fetching MP4:", error);
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setPdfUrl(null);
        setVideoUrl(null);
    };

    // Resource clean up when video is closed
    useEffect(() => {
        return () => {
            if (videoUrl) {
                URL.revokeObjectURL(videoUrl);
            }
        };
    }, [videoUrl]);
    

    return (
        <div>
            {/* Vertical prototype header */}
            <br />
            <header className="text-center mb-5">
                <h1 className="font-bold text-2xl">CSC 648-848 Software Engineering</h1>
                <h2 className="font-bold text-xl">Fall 2024</h2>
                <h3 className="font-bold text-lg">Team 08 - Vertical Prototype</h3>
            </header>

            <br />
            <Search initialSubject={selectedSubject} initialSearchTerm={searchTerm} />
            <br />

            {/* Render listing count */}
            {listings && listings.length > 0 && !randomListing ? (
                <h2 className="text-m font-semibold mt-4 ml-52">Search Results: {listings.length} items found</h2>
            ) : listings && listings.length > 0 && randomListing ? (
                <h2 className="text-m font-semibold mt-4 ml-52">
                    We couldn't find your desired tutor listing, but here is some tutors that might interest you. <br></br>Please refine your search or select a subject for a more precise result.
                </h2>
            ) : (
                <h2 className="text-m font-semibold mt-4 ml-52">No listings currently exist.</h2>
            )}

            {/* Test pdf pop up render */}
            {/* {isModalOpen && (
                <div id="static-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div class="relative p-4 w-full max-w-2xl max-h-full">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Static modal
                                </h3>
                                <button type="button" onClick={() => closeModal()} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5 space-y-4">
                                {pdfUrl ? (
                                    <iframe 
                                        src={pdfUrl} 
                                        title="PDF Document" 
                                        className="w-full h-[500px] border-0"
                                    />
                                ) : (
                                    <p>Loading PDF...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )} */}

            {isModalOpen && (
                <div id="static-modal" data-modal-backdrop="static" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Video Modal
                                </h3>
                                <button 
                                    type="button" 
                                    onClick={() => closeModal()} 
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" 
                                    data-modal-hide="static-modal"
                                >
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5 space-y-4">
                                {videoUrl ? (
                                    <video controls src={videoUrl} className="w-full h-[500px]" />
                                ) : (
                                    <p>Loading video...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Render listings from search results */}
            {listings ? (
                listings.map((listing, index) => (
                    <div key={index} className="text-center">
                        <div className="flex flex-col items-center mb-3">
                            <p>Name: {listing.tutorName}</p>
                            <p>Description: {listing.description}</p>
                            <p>Subject: {listing.subjectName}</p>
                            <p>Pricing: ${listing.pricing} per hour</p>
                            {listing.image && (
                                <img 
                                    src={listing.image} 
                                    alt="Listing" 
                                    className="w-24 h-24 cursor-pointer"
                                    // onClick={() => handleImageClick(listing.attachedFile)} // pdf renderer
                                    onClick={() => handleImageClick(listing.attachedVideo)} // video renderer
                                />
                            )}
                        </div>
                        <br />
                        <hr className="bg-black h-0.5 mb-3 border-none" />
                    </div>
                ))
            ) : (
                <p className="text-center">No listings available.</p>
            )}
        </div>
    );
};

export default Results;
