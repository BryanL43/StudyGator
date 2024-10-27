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
    const { user } = useAuth();

    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');
    const [subjectId, setSubjectId] = useState('');
    const [listings, setListings] = useState([]);
    const [pricing, setPricing] = useState('');
    const [subjectList, setSubjectList] = useState([]); // For drop down

    // Fetch subjects to populate dropdown for applying as tutor
    const fetchSubjects = async() => {
        try {
            const response = await axios.get(`${BASE_URL}/api/subject`);
            setSubjectList(response.data);
        } catch (error) {
            console.error("Error fetching subjects:", error);
        }
    };

    // Render default listings upon landing
    const fetchListings = async() => {
        try {
            const response = await axios.get(`${BASE_URL}/api/search`);
            setListings(response.data.results);
        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    };

    useEffect(() => {
        fetchSubjects();
        fetchListings();
    }, []);

    // Acquire uploaded image
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // Handle form submission for tutor application
    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!selectedFile || !description || !subjectId || !pricing) {
            alert("Please fill all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('description', description);
        formData.append('subjectId', subjectId);
        formData.append('pricing', pricing);

        try {
            await axios.put(`${BASE_URL}/api/apply`, formData, {
                headers: {
                    'Authorization': localStorage.getItem("authToken"),
                    'Content-Type': 'multipart/form-data',
                }
            });
            fetchListings();
        } catch (error) {
            console.error("Error uploading listing:", error);
        }
    };

    return (
        <div>
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
                    <select 
                        value={subjectId} 
                        onChange={(e) => setSubjectId(e.target.value)} 
                        required
                        className="border border-black mb-2 p-2 mr-2"
                    >
                        <option value="">Select Subject</option>
                        {subjectList.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                                {subject.name}
                            </option>
                        ))}
                    </select>
                    <input 
                        type="text" 
                        className="border border-black mb-2 p-2 mr-2"
                        value={pricing} 
                        onChange={(e) => setPricing(e.target.value)} 
                        placeholder="Pricing" 
                        required 
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"> Upload </button>
                </form>
            )}

            <br />
            <Search/>
            <br />
            
            {/* Render listing count */}
            {listings ? (
                <h2 className="text-m font-semibold mt-4 ml-52"> Showing {listings.length} listings:</h2>
            ) : (
                <h2 className="text-m font-semibold mt-4 ml-52"> No listings found.</h2>
            )}

            {/* Default render all listings */}
            {listings ? (
                listings.map((listing, index) => (
                    <div key={index} className="text-center">
                        <div className="flex flex-col items-center mb-3">
                            <p>Name: {listing.tutorName}</p>
                            <p>Description: {listing.description}</p>
                            <p>Subject: {listing.subjectName}</p>
                            <p>Pricing: ${listing.pricing} per hour</p>
                            {listing.image && (
                                <img src={listing.image} alt="Listing" className="w-24 h-24" />
                            )}
                        </div>
                        <hr className="bg-black h-0.5 border-none mb-3" />
                    </div>
                ))
            ) : (
                <p className="text-center">No listings available.</p>
            )}
        </div>
    );
};

export default Home;