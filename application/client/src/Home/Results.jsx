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
            {listings && !randomListing ? (
                <h2 className="text-m font-semibold mt-4 ml-52">Search Results: {listings.length} items found</h2>
            ) : listings && randomListing ? (
                <h2 className="text-m font-semibold mt-4 ml-52">
                    We couldn't find your desired tutor listing, but here is some tutors that might interest you. <br></br>Please refine your search or select a subject for a more precise result.
                </h2>
            ) : (
                <h2 className="text-m font-semibold mt-4 ml-52">No listings currently exist.</h2>
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
                                    className="w-24 h-24"
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