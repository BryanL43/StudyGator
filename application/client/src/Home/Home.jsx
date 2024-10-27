/**************************************************************
* Author(s): Bryan Lee & Kenneth Wen
* Last Updated: 10/26/2024
*
* File:: Home.jsx
*
* Description:: This file handles the vertical prototype frontend page.
*               It displays the tutor listings and allows for tutor application
*               if the user is logged in. [WARNING: file is mainly disposable prototype]
*
**************************************************************/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Search from './Search';

import { useAuth } from '../AuthContext.js';
import BASE_URL from '../utils/config';

const Home = () => {
    const { user } = useAuth(); // Retrieve user token. Critical for login infrastructure.

    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState('');
    const [listings, setListings] = useState([]);
    const [pricing, setPricing] = useState('');

    // Acquire uploaded image
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]); // Set the selected file
    };

    // Handle form submission for vertical prototype apply as tutor
    const handleSubmit = async(e) => {
        e.preventDefault(); // Prevent default form submission

        if (!selectedFile || !description || !subject || !pricing) {
            alert("Please fill all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('description', description);
        formData.append('subject', subject);
        formData.append('pricing', pricing);

        try {
            const response = await axios.put(`${BASE_URL}/api/apply`, formData, {
                headers: {
                    'Authorization': user,
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log("File uploaded successfully:", response.data);
            fetchListings();
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    // Render default all listings upon landing
    const fetchListings = async() => {
        try {
            const response = await axios.get(`${BASE_URL}/api/search`);
            setListings(response.data.results);
        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    };

    useEffect(() => {
        fetchListings();
    }, [user]);

    return (
        <div>

            {/* Vertical prototype header */}
            <br />
            <header className="text-center mb-5">
                <h1 className="font-bold text-2xl">CSC 648-848 Software Engineering</h1>
                <h2 className="font-bold text-xl">Fall 2024</h2>
                <h3 className="font-bold text-lg">Team 08 - Vertical Prototype</h3>
            </header>
            
            {/* Render apply as tutor form if user is logged in */}
            {user && (
                <form onSubmit={handleSubmit} className="text-center">
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                        required 
                    />
                    <input 
                        type="text" 
                        className="border border-black mb-2 p-2 mr-2"
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder="Description" 
                        required 
                    />
                    <input 
                        type="text"
                        className="border border-black mb-2 p-2 mr-2"
                        value={subject} 
                        onChange={(e) => setSubject(e.target.value)} 
                        placeholder="Subject" 
                        required 
                    />
                    <input 
                        type="text" 
                        className="border border-black mb-2 p-2 mr-2"
                        value={pricing} 
                        onChange={(e) => setPricing(e.target.value)} 
                        placeholder="Pricing" 
                        required 
                    />
                    <button type="submit" className="text-center border border-black p-2"> Upload </button>
                </form>
            )}

            {/* Render search bar & drop down component */}
            <br />
            <Search/>
            <br />
            
            {/* Render listings */}
            <h2 className="text-m font-semibold mt-4 ml-52"> Showing {listings.length} listings:</h2>
            {listings.length > 0 ? (
                listings.map((listing, index) => (
                    <div key={index} className="text-center">
                        <div className="flex flex-col items-center mb-3">
                            <p>Description: {listing.description}</p>
                            <p>Subject: {listing.subject}</p>
                            <p>Pricing: ${listing.pricing} per hour</p>
                            {listing.image && (
                                <img src={listing.image} alt="Listing" className="w-24 h-24" />
                            )}
                        </div>
                        <hr className="bg-black h-0.5 border-none mb-3" />
                    </div>
                ))
            ) : (
                <p>No listings available.</p>
            )}
        </div>
    );
};

export default Home;