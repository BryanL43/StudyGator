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
import React, { useEffect, useState, useCallback } from 'react';
import TutorListingCard from '../components/TutorListingCard';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../utils/config';

import loadingIcon from '../icons/LoadingIcon.svg';

const ListingPage = () => {
    const location = useLocation();

    // State variables for tutor listings
    const [listings, setListings] = useState([]);
    const [randomListing, setRandomListing] = useState(false);
    const [loading, setLoading] = useState(true);

    // State variables for filter drop down
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

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
            window.scrollTo({ top: 0 });
            setLoading(false);
        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    }, [selectedSubject, searchTerm]);

    useEffect(() => {
        fetchListings();
    }, [fetchListings]);

    return (
        <div className="flex flex-col items-center p-8 bg-gray-50">
            <h1 className="text-2xl font-bold mb-6">Browse Tutor Listings</h1>
            <div className="flex justify-center w-full max-w-screen-lg mb-4 space-x-4">

                <div className="relative inline-block">
                    <button
                        id="priceDropdown"
                        onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
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

            {/* Render listing count */}
            {!loading && (
                <>
                    {listings && listings.length > 0 && !randomListing ? (
                        <h2 className="text-m font-semibold mt-4 ml-52">Search Results: {listings.length} items found</h2>
                    ) : listings && listings.length > 0 && randomListing ? (
                        <h2 className="text-m font-semibold mt-4 ml-52">
                            We couldn't find your desired tutor listing, but here is some tutors that might interest you. <br></br>Please refine your search or select a subject for a more precise result.
                        </h2>
                    ) : (
                        <h2 className="text-m font-semibold mt-4 h-screen">No listings currently exist.</h2>
                    )}
                </>
            )}

            {/* Loading icon */}
            {loading &&
                <div className="flex items-center justify-center mb-[50vh]">
                    <img src={loadingIcon} className="w-20 h-20" alt="Loading..." />
                </div>
            }

            {/* Grid layout with 3 columns for the listing cards*/}
            <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 justify-center">
                
                {/* Render listings from search results */}
                {listings ? (
                    listings.map((listing) => (
                        <TutorListingCard
                            key={listing.id}
                            metadata={listing}
                            isDashboard={false}
                        />
                    ))
                ) : (
                    <p className="text-center">No listings available.</p>
                )}

            </div>
        </div>
    );
};
export default ListingPage;