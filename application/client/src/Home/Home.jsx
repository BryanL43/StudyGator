import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Search from './Search';

import BASE_URL from '../utils/config';

const Home = () => {
    const token = localStorage.getItem('authToken');
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState('');
    const [listings, setListings] = useState([]); // Change to an array to hold multiple listings
    const [pricing, setPricing] = useState('');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]); // Set the selected file
    };


    const handleSubmit = async (e) => {
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
                    'Authorization': token,
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log("File uploaded successfully:", response.data);
            fetchListings();
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const fetchListings = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/search`);
            setListings(response.data.results);
        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    };

    useEffect(() => {
        fetchListings();
    }, [token]);

    return (
        <div>
            <header style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1>CSC 648-848 Software Engineering </h1>
                <h2>Fall 2024</h2>
                <h3>Team 8</h3>
            </header>
 
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} required />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" required />
                <input type="text" value={pricing} onChange={(e) => setPricing(e.target.value)} placeholder="Pricing" required />
                <button type="submit">Upload</button>
            </form>
            <br></br>
            <Search setListings={setListings}/>
            <br></br>
            <h2>Showing {listings.length} listings:</h2>
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
export default Home;
