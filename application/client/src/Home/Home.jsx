import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BASE_URL from '../utils/config';

const Home = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/user/bryan21`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUserData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Link to="/about" className="text-pink-400">About Page</Link>

            <h2 className="mt-4 text-2xl">User Info Database Connection Test</h2>
            {userData ? (
                <div>
                    <p><strong>Username:</strong> {userData.username}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
};

export default Home;
