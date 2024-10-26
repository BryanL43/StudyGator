/**************************************************************
* Author(s): Kenneth Wen
* Last Updated: 10/26/2024
*
* File:: Results.jsx
*
* Description:: This file handles the results page. The 
*               results will display in a column separated 
*               by a line.
*
**************************************************************/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../utils/config';
import { useLocation } from 'react-router-dom';  
import Search from './Search';

const Results = () => {
    const location = useLocation();
    const [listings, setListings] = useState([]);

    const queryParams = new URLSearchParams(location.search);
    const selectedSubject = queryParams.get('selectedSubject') || '';
    const searchTerm = queryParams.get('searchTerm') || '';
    
    const fetchListings = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/search`, {
                params: {
                    selectedSubject: selectedSubject,
                    searchTerm: searchTerm
                }
            });
            setListings(response.data.results);
        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    };

    useEffect(() => {
        fetchListings();
    }, [selectedSubject, searchTerm]);

    return (
        <div>
            <header style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1>CSC 648-848 Software Engineering </h1>
                <h2>Fall 2024</h2>
                <h3>Team 8</h3>
            </header>
            <br></br>
            <Search setListings={setListings} />
            <h2>Search Results: {listings.length} items found</h2>
                {listings.length > 0 ? (
                    listings.map((listing, index) => (
                        <div key={index} style={{ textAlign: 'center' }}>
                            <div style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                marginBottom: '10px'
                            }}>
                            <p>Description: {listing.description}</p>
                            <p>Subject: {listing.subject}</p>
                            <p>Pricing: ${listing.pricing} per hour</p>
                            {listing.image && (
                                <img src={listing.image} alt="Listing" style={{ width: '100px', height: '100px' }} />
                            )}
                            </div>
                            <br></br>
                            <hr style={{
                                color: '#000000',
                                backgroundColor: '#000000',
                                height: '2px',
                                borderColor: '#000000',
                            }} /> <br></br>
                        </div>
                    ))
                ) : (
                    <p>No listings available.</p>
                )}
        </div>
    );
};

export default Results;
