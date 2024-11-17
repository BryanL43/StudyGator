/**************************************************************
* Author(s): Kenneth Wen
* Last Updated: 11/8/2024
*
* File:: SearchPage.jsx
*
* Description:: The search page shows the tutor listings
*               by generating tutor cards from the database.
*
**************************************************************/
import React, { useEffect, useState, useCallback } from 'react';
import TutorListingCard from '../components/TutorListingCard';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../utils/config';

import loadingIcon from '../icons/LoadingIcon.svg';
import ErrorAlert from '../components/ErrorAlert';

const ListingPage = () => {
    const location = useLocation();

    // State variables for tutor listings
    const [listings, setListings] = useState([]);
    const [randomListing, setRandomListing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [serverError, setServerError] = useState(false);

    // State variables for filter drop down
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

    // Extract query information from URL
    const queryParams = new URLSearchParams(location.search);
    const selectedSubject = queryParams.get('selectedSubject') || '';
    const searchTerm = queryParams.get('searchTerm') || '';

    const resetServerError = () => {
        setServerError(false);
    };

    // Fetch listing search results
    const fetchListings = useCallback(async () => {
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
            setServerError(false);
        } catch (error) {
            console.error("Error fetching listings:", error);
            setLoading(false);
            setServerError(true);
        }
    }, [selectedSubject, searchTerm]);

    useEffect(() => {
        fetchListings();
    }, [fetchListings]);

    return (
        <div
            className="top-0 flex items-center justify-center sm:min-h-screen bg-gray-100 bg-fixed relative"
            style={{
                backgroundImage: "url('/GatorSearchBackground.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >

            {/* Server error warning */}
            {serverError &&
                <ErrorAlert message="Failed to load tutor listings. Internal server error!" resetError={resetServerError} />
            }

            <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
                <h1 className="text-2xl font-bold mb-6">Browse Tutor Listings</h1>

                {/* Container for search result text and filter button */}
                <div className="flex items-center justify-between w-full max-w-5xl mb-6 px-4 sm:px-6 lg:px-8">
                    {/* Render listing count */}
                    {loading ? (
                        <h2 className="text-m font-semibold">Loading...</h2>
                    ) : (
                        <>
                            {listings && listings.length > 0 && !randomListing ? (
                                <h2 className="text-m font-semibold">Search Results: {listings.length} items found</h2>
                            ) : listings && listings.length > 0 && randomListing ? (
                                <h2 className="text-m font-semibold">
                                    We couldn't find your desired tutor listing, but here are some tutors that might interest you.
                                    <br />
                                    Please refine your search or select a subject for a more precise result.
                                </h2>
                            ) : listings && listings.length === 0 ? (
                                <h2 className="text-m font-semibold pr-4">No tutor listing available.</h2>
                            ) : (
                                <h2 className="text-m font-semibold pr-4">Failed to load tutor listings.</h2>
                            )}
                        </>
                    )}

                    {/* Price Filter Button */}
                    <div className="relative overflow-visible">
                        <button
                            id="priceDropdown"
                            onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
                            className="border border-gray-300 text-gray-800 bg-white hover:bg-purple-100 focus:ring-2 focus:ring-purple-400 rounded-md px-3 py-1 flex items-center"
                        >
                            Price
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        {isPriceDropdownOpen && (
                            <div className="absolute z-10 border bg-white divide-y divide-gray-200 rounded-lg shadow-md w-60 mt-1 p-4 right-0">
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
                                        <span className="w-10 text-right">${minPrice}</span>
                                        <span>to</span>
                                        <span className="w-10 text-left">${maxPrice}</span>
                                    </div>
                                </div>
                                {/* Clear and View Results Buttons */}
                                <div className="inline-flex rounded-md shadow-sm w-full" role="group">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMinPrice(0); 
                                            setMaxPrice(100);
                                        }}
                                        className="flex-1 px-2 py-1 text-sm font-medium text-gray-900 bg-white border
                                        border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2
                                        focus:ring-purple-400 focus:text-blue-700"
                                    >
                                        Clear
                                    </button>
                                    <button
                                        type="button"
                                        onClick={fetchListings}
                                        className="flex-1 px-2 py-1 text-sm font-medium text-gray-900 bg-white border
                                        border-gray-200 rounded-r-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2
                                        focus:ring-purple-400 focus:text-blue-700"
                                    >
                                        View Results
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Loading icon */}
                {loading && (
                    <div className="flex items-center justify-center mb-[50vh]">
                        <img src={loadingIcon} className="w-20 h-20" alt="Loading..." />
                    </div>
                )}

                {/* Server error icon */}
                {serverError &&
                    <div className="flex items-center justify-center mb-16">
                        <img src="/500Icon.png" className="w-20 h-20" alt="Internal server error" />
                    </div>
                }

                {/* Grid layout with 3 columns for the listing cards */}
                <div className={`${loading || serverError || listings.length <= 0 ? "hidden" : ""} grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 w-full max-w-5xl justify-center`}>

                    {/* Render listings from search results */}
                    {listings.length > 0 && (
                        listings.map((listing) => (
                            <TutorListingCard
                                key={listing.id}
                                metadata={listing}
                                isDashboard={false}
                            />
                        ))
                    )}

                </div>
                <p className={`${listings && listings.length === 0 && !loading && !serverError ? "" : "hidden"} text-center`}>No listings available.</p>
            </div>
        </div>
    );
};

export default ListingPage;