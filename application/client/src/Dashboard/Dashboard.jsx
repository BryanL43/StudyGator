import React, { useEffect, useState } from 'react';
import axios from 'axios';  // You can use fetch or any other library to make API calls

const Dashboard = () => {
    const [tutorListings, setTutorListings] = useState([]); // State to store tutor listings
    const [loading, setLoading] = useState(true); // State to handle loading state

    useEffect(() => {
        // Fetch data from your backend
        axios.get('/api/tutor-listings')  // Your API endpoint for tutor listings
            .then((response) => {
                setTutorListings(response.data);  // Update the state with fetched data
                setLoading(false);  // Set loading to false once data is fetched
            })
            .catch((error) => {
                console.error('Error fetching tutor listings:', error);
                setLoading(false);  // Set loading to false if there's an error
            });
    }, []); // Empty array means this effect runs only once, when the component mounts

    if (loading) {
        return <div>Loading...</div>;  // Show a loading state while fetching
    }

    return (
        <div className="dashboard">
            <h2>Recent Tutor Listings</h2>
            <table>
                <thead>
                    <tr>
                        <th>Sales Pitch</th>
                        <th>Description</th>
                        <th>Pricing</th>
                        <th>Image</th>
                        <th>Video</th>
                        <th>File</th>
                        <th>Date Created</th>
                    </tr>
                </thead>
                <tbody>
                    {tutorListings.map((listing) => (
                        <tr key={listing.id}> {/* Use a unique key like id */}
                            <td>{listing.sales_pitch}</td>
                            <td>{listing.description}</td>
                            <td>{listing.pricing}</td>
                            <td>
                                {listing.image ? <img src={listing.image} alt="Listing" width="100" /> : 'No image'}
                            </td>
                            <td>
                                {listing.attached_video ? (
                                    <a href={listing.attached_video} target="_blank" rel="noopener noreferrer">View Video</a>
                                ) : 'No video'}
                            </td>
                            <td>
                                {listing.attached_file ? (
                                    <a href={listing.attached_file} target="_blank" rel="noopener noreferrer">Download File</a>
                                ) : 'No file'}
                            </td>
                            <td>{new Date(listing.date_created).toLocaleString()}</td> {/* Format the date */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
