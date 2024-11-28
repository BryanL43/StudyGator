import React, { useEffect, useState } from 'react';
import ReactGA from "react-ga";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import BASE_URL from '../utils/config';

import TutorListingCard from '../components/TutorListingCard';
import Message from '../components/Message';
import MessagePopUp from '../components/MessagePopUp';
import emailIcon from '../icons/EmailIcon.svg';
import clipboardIcon from '../icons/ClipboardIcon.svg';
import loadingIcon from '../icons/LoadingIcon.svg';

import ErrorAlert from '../components/ErrorAlert';
import SuccessAlert from '../components/SuccessAlert';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const successAlert = location.state?.successAlert;

    const [showingMsg, setShowingMsg] = useState(true);

    const [listings, setListings] = useState([]);
    const [messageList, setMessageList] = useState([0]);
    const [loading, setLoading] = useState(true);
    const [serverError, setServerError] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('authToken')) { // Direct fast verification
            navigate("/login"); // Redirect to log in if user is in unregistered mode
        }
    })

    // State to control modal visibility
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isMsgPopUpOpen, setMsgPopUpOpen] = useState(false);

    const toggleModal = () => {
        setMsgPopUpOpen(!isMsgPopUpOpen);
    };

    const handleOpenModal = (messageData) => {
        setSelectedMessage(messageData);
        toggleModal();
    };

    const resetServerError = () => {}; // empty pass-by

    // Fetch tutor's listings on mount
    const fetchListings = async() => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/fetchlistings`, {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            });
            setListings(response.data.results);
            setLoading(false);
            setServerError(false);
        } catch (error) {
            console.error("Error fetching recent listings:", error);
            setLoading(false);
            setServerError(true);
        };
    }

    const fetchMessages = async() => {
        try {
            const response = await axios.get(`${BASE_URL}/api/fetchmessages`, {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            });
            setMessageList(response.data.results);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    }

    const refreshList = async() => {
        await fetchListings();
    };

    const refreshMessageList = async() => {
        await fetchMessages();
    }

    useEffect(() => {
        fetchMessages();
        fetchListings();
    }, []);

    // Google Analytics
    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    return (
        <div className="bg-gray-50 sm:min-h-[70vh]">
            {/* Success alert */}
            {successAlert && (
                <SuccessAlert message="Your application was submitted successfully!" />
            )}

            {/* Server error warning */}
            {serverError && (
                <ErrorAlert message="Failed to load your tutor listings. Internal server error!" resetError={resetServerError} />
            )}

            {isMsgPopUpOpen && selectedMessage && (
                <MessagePopUp
                    id={selectedMessage.id}
                    name={selectedMessage.name}
                    email={selectedMessage.email}
                    title={selectedMessage.title}
                    content={selectedMessage.content}
                    date={selectedMessage.date}
                    toggleModal={toggleModal}
                    isSending={false}
                    refreshMessageList={refreshMessageList}
                />
            )}

            <div>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                    <div className="container px-6 py-8 mx-auto">
                        <h3 className="text-3xl font-medium text-gray-700">Dashboard - Hello, {user?.name || "user"}</h3>

                        <div className="mt-4">
                            <div className="flex flex-wrap -mx-6">
                                <div className="w-full px-6 sm:w-1/2 xl:w-1/3 cursor-pointer">
                                    <div className={`flex items-center px-5 py-6 ${showingMsg ? "bg-gray-200" : "bg-white"} hover:bg-gray-100 rounded-md shadow-sm`} onClick={() => { if (!showingMsg) setShowingMsg(true); }}>
                                        <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                                            <img src={emailIcon} className="w-10 h-10 filter invert brightness-200" alt="" />
                                        </div>

                                        <div className="mx-5">
                                            <h4 className="text-2xl font-semibold text-gray-700">My Messages</h4>
                                            <div className="text-gray-500">View my messages here</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0 cursor-pointer">
                                    <div className={`flex items-center px-5 py-6 ${!showingMsg ? "bg-gray-200" : "bg-white"} hover:bg-gray-100 rounded-md shadow-sm`} onClick={() => { if (showingMsg) setShowingMsg(false); }} >
                                        <div className="p-3 bg-orange-600 bg-opacity-75 rounded-full">
                                            <img src={clipboardIcon} className="w-10 h-10 filter invert brightness-200" alt="" />
                                        </div>

                                        <div className="mx-5 ">
                                            <h4 className="text-2xl font-semibold text-gray-700">My Listings</h4>
                                            <div className="text-gray-500">Manage my tutor listings here</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section className={`${showingMsg ? "hidden" : ""} bg-gray-50 py-8 antialiased md:py-12 flex justify-center`}>
                            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                                <div className="mb-4 flex items-end justify-center space-y-4 sm:space-y-0 md:mb-8">
                                    <h2 className="mt-3 text-[28px] font-bold text-gray-900">Manage Tutor Listings</h2>
                                </div>

                                {/* Loading icon */}
                                {loading &&
                                    <div className="flex items-center justify-center">
                                        <img src={loadingIcon} className="w-20 h-20" alt="Loading..." />
                                    </div>
                                }

                                {/* Server error icon */}
                                {serverError &&
                                    <div className="flex items-center justify-center mb-16">
                                        <img src="/500Icon.png" className="w-20 h-20" alt="Internal server error" />
                                    </div>
                                }

                                {!loading && listings && listings.length > 0 ? (
                                    <div className={`${serverError ? "hidden" : ""} grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 w-full max-w-5xl justify-center`}>
                                        {listings.map((listing) => (
                                            <TutorListingCard
                                                key={listing.id}
                                                metadata={listing}
                                                isDashboard={true}
                                                refreshList={refreshList}
                                            />
                                        ))}
                                    </div>
                                ) : !loading && (!listings || listings.length === 0) && !serverError ? (
                                    <h2 className="text-m font-semibold text-center">You have no tutor listing yet. Apply now to become a tutor!</h2>
                                ) : null}

                            </div>
                        </section>

                        <div className={`${showingMsg ? "" : "hidden"} flex flex-col mt-8`}>
                            <div className="py-2 -my-2 max-w-screen overflow-x-hidden sm:overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                                <div className="min-h-[406px] max-h-64 inline-block min-w-full overflow-y-auto align-middle border-b border-gray-200 shadow sm:rounded-lg">
                                    <table className="min-w-full">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            {/* Loads the desktop version */}
                                            <tr> 
                                                <th
                                                    className="sm:hidden px-5 py-[12px] text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                                    Message Inbox</th>
                                                <th
                                                    className="invisible sm:visible px-10 sm:py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                                    Sender</th>
                                                <th
                                                    className="invisible sm:visible px-6 sm:py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                                    Tutor Listing Title</th>
                                                <th
                                                    className="invisible sm:visible px-6 sm:py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                                    Content</th>
                                                <th
                                                    className="invisible sm:visible px-6 sm:py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                                    Date Sent</th>
                                            </tr>
                                        </thead>

                                        <tbody className="bg-white max-h-64 overflow-y-auto">

                                            {messageList && messageList.length === 0 ? (
                                                <tr>
                                                    <td colSpan="4" className="text-center w-full h-[362px]">
                                                        You have no messages yet!
                                                    </td>
                                                </tr>
                                            ) : (
                                                messageList.map((messages) => (
                                                    <Message
                                                        key={Math.random()}
                                                        id={messages.id}
                                                        name={messages.senderName}
                                                        email={messages.senderEmail}
                                                        title={messages.listingTitle}
                                                        content={messages.content}
                                                        date={messages.date_created}
                                                        onClick={() =>
                                                            handleOpenModal({
                                                                id: messages.id,
                                                                name: messages.senderName,
                                                                email: messages.senderEmail,
                                                                title: messages.listingTitle,
                                                                content: messages.content,
                                                                date: messages.date_created,
                                                            })
                                                        }
                                                    />
                                                ))
                                            )}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div >

        </div >
    )
}

export default Dashboard