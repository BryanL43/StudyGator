/**************************************************************
* Author(s): Bryan Lee & Kenneth Wen
* Last Updated: 11/2/2024
*
* File:: Home.jsx
*
* Description:: The landing page for the application containing a image carousel
*               and a list of recent tutor listings.
*
**************************************************************/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../utils/config';
import { useNavigate } from 'react-router-dom';
import loadingIcon from '../icons/LoadingIcon.svg';
import { useAuth } from '../AuthContext';

import TutorListingCard from '../components/TutorListingCard';
import ErrorAlert from '../components/ErrorAlert';
import SuccessAlert from '../components/SuccessAlert';

const Home = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [serverError, setServerError] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);

    const [listings, setListings] = useState([]);
    const [contents, setContents] = useState("");

    const resetServerError = () => {
        setServerError(false);
    };

    const [imageIndex, setImageIndex] = useState(null);

    // Pick one of the 3 random backgroound and ensure it only renders once
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * 3) + 1;
        setImageIndex(randomIndex);
    }, []);

    // Fetch recent listings only on mount
    useEffect(() => {
        const fetchRecentListings = async() => {
            try {
                const response = await axios.get(`${BASE_URL}/api/recent`);
                setListings(response.data.results);
                setLoading(false);
                setServerError(false);
            } catch (error) {
                console.error("Error fetching recent listings:", error);
                setLoading(false);
                setServerError(true);
            };
        }

        fetchRecentListings();
    }, []);

    // Lazy registeration re-entry to automatically send message
    useEffect(() => {
        const savedMessageData = localStorage.getItem("messageData");
        
        if (savedMessageData && user) {
            const parsedData = JSON.parse(savedMessageData);
            setContents(parsedData.content || "");
            
            if (contents && contents !== "") {
                const sendMessage = async () => {
                    try {
                        await axios.post(`${BASE_URL}/api/message`, {
                            token: localStorage.getItem("authToken"),
                            listingId: parsedData.listingId,
                            recipientId: parsedData.recipientId,
                            content: contents
                        });
                        
                        setSuccessAlert(true);
                        localStorage.removeItem("messageData");
                    } catch (error) {
                        console.error("Error sending message:", error);
                    }
                };
    
                sendMessage();
            }
        }
    
        // Clear local storage after repopulating
    }, [user, contents]);
     

    return (
        <div>
            {/* Server error warning */}
            {serverError &&
                <ErrorAlert message="Failed to load recent listings. Internal server error!" resetError={resetServerError} />
            }

            {/* Success alert */}
            {successAlert && (
                <SuccessAlert message="Your message was successfully sent!" />
            )}

            {/* Image carousel */}
            <div className="relative w-full">
                <div className="relative h-[60vh] overflow-hidden">
                    <div className="duration-700 ease-in-out z-10" data-carousel-item>
                        <img
                            src={`/SFSU-img-${imageIndex}.jpg`}
                            className="absolute w-full h-full object-cover -translate-x-1/2 sm:-translate-y-1/2 sm:top-1/2 left-1/2 filter brightness-[0.7]"
                            alt="SFSU background"
                        />
                    </div>
                </div>

                {/* Overlay header */}
                <div className="absolute z-40 w-full top-[45%] transform -translate-y-1/2 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-[48px] text-white font-bold drop-shadow-lg">
                        Find Your SFSU Tutor at<br />
                        <span className="text-[#FFDC70]">StudyGator!</span>
                    </h1>
                    <h2 className="text-white text-[22px] mt-4">
                        Connect with skilled SFSU student tutors dedicated to helping you succeed.<br></br>
                        Receive personalized support tailored to your SFSU courses and academic goals.
                    </h2>
                </div>
            </div>
            
            {/* Recent Listings */}
            <section className="bg-gray-50 py-4 antialiased md:py-6">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mb-6 flex items-end justify-center space-y-4 sm:space-y-0 md:mb-8">
                        <h2 className="mt-3 text-[28px] font-bold text-gray-900">Recent Tutor Listings</h2>
                    </div>

                    {/* Loading icon */}
                    {loading &&
                        <div className="flex items-center justify-center mb-16">
                            <img src={loadingIcon} className="w-20 h-20" alt="Loading..." />
                        </div>
                    }

                    {/* Server error icon */}
                    {serverError &&
                        <div className="flex items-center justify-center mb-16">
                            <img src="/500Icon.png" className="w-20 h-20" alt="Internal server error" />
                        </div>
                    }

                    {/* Grid layout with 3 columns for the listing cards*/}
                    <div className="flex items-center justify-center">
                    {!loading && listings && listings.length > 0 ? (
                        <div className={`${serverError ? "hidden" : ""} mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 max-w-5xl justify-center`}>
                            {listings.map((listing) => (
                                <TutorListingCard
                                    key={listing.id}
                                    metadata={listing}
                                    isDashboard={false}
                                />
                            ))}
                        </div>
                    ) : !loading && (!listings || listings.length === 0) && !serverError ? (
                        <h2 className="text-m font-semibold text-center">No listings currently exist.</h2>
                    ) : null}
                    </div>

                    {listings && listings.length > 0 && (
                        <div className="w-full text-center">
                            <button type="button" onClick={() => { navigate("/search?selectedSubject=&searchTerm="); window.scrollTo({ top: 0 }); }} className="rounded-lg border border-gray-200 bg-white w-[130px] px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100">Browse more</button>
                        </div>
                    )}
                </div>
            </section>

        </div>
    );
};

export default Home;