import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [tutorListings, setTutorListings] = useState([]);

  // Fetch tutor listings when the component mounts
  useEffect(() => {
    fetch('/api/tutor-listings') // Make sure the URL matches your backend endpoint
      .then(response => response.json())
      .then(data => {
        console.log('Fetched tutor listings:', data);  // Log the data for debugging
        setTutorListings(data);  // Store the data in the state
      })
      .catch(error => console.error('Error fetching tutor listings:', error));
  }, []);

  return (
    <div>
      <h1>Tutor Listings</h1>
      <div>
        {/* If no listings are available, display a message */}
        {tutorListings.length === 0 ? (
          <p>No tutor listings available.</p>
        ) : (
          // Loop through each listing and display it
          tutorListings.map((listing, index) => (
            <div key={index} className="tutor-listing" style={{ padding: '10px', border: '1px solid #ccc', margin: '10px 0' }}>
              <p><strong>ID:</strong> {listing.id}</p>
              <p><strong>Sales Pitch:</strong> {listing.sales_pitch}</p>
              <p><strong>Description:</strong> {listing.description}</p>
              <p><strong>Pricing:</strong> {listing.pricing}</p>
              {/* Show the image if it exists */}
              <p><strong>Image:</strong> <img src={listing.image} alt="Tutor" style={{ maxWidth: '100px', height: 'auto' }} /></p>
              {/* If there is an attached video, provide a link to it */}
              <p><strong>Video:</strong> {listing.attached_video ? <a href={listing.attached_video} target="_blank" rel="noopener noreferrer">View Video</a> : 'No video attached'}</p>
              {/* If there is an attached file, provide a download link */}
              <p><strong>File:</strong> {listing.attached_file ? <a href={listing.attached_file} target="_blank" rel="noopener noreferrer">Download File</a> : 'No file attached'}</p>
              {/* Format the date */}
              <p><strong>Date Created:</strong> {new Date(listing.date_created).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
