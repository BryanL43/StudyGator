/**************************************************************
* Author(s): Min Ye Thway Khaing, Bryan Lee
* Last Updated: 12/3/2024
*
* File:: MessagePopUp.jsx
*
* Description:: The confirmation pop-up model for showing the full
*               message content. Very complex component encapsulation and referencing.
*
**************************************************************/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import BASE_URL from '../utils/config';
import trashCanIcon from '../icons/TrashCanIcon.svg';
import Confirmation from '../components/Confirmation';
const convertDate = require('../utils/dateConverter');

/**
 * Dynamically creates the message pop-up model. Allows for the reuse of the same model, but
 * with different message metadata.
 * 
 * @param {String} id The message's uuid. Placeholder to satisfy React warning.
 * @param {String} name The sender's name.
 * @param {String} email The sender's email.
 * @param {String} title The message associated listing title.
 * @param {String} content The message's body.
 * @param {String} date The date and time the message was sent.
 * @param {Object} metadata The optional metadata of the associated tutor listing.
 * @param {function} toggleModal The pass-by-reference function to hide the message pop-up.
 * @param {boolean} isSending Boolean state to render delete button.
 * @param {function} setSuccessAlert The pass-by-reference to show the success alert
 *                                   if message was successfully sent.
 * @param {function} refreshMessageList The pass-by-reference function to refresh the
 *                                   message list in dashboard when a message is deleted.
 * @returns The message pop-up model.
 */
const MessagePopUp = ({ id, name, email, title, content, date, metadata, toggleModal, isSending, setSuccessAlert, refreshMessageList }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [contents, setContents] = useState(content);
    const [deleteWarning, setDeleteWarning] = useState(false);

    const toggleDeleteWarning = () => {
        setDeleteWarning(!deleteWarning);
    }

    // Handles sending the message to the backend with necessary metadatas
    const sendMessage = async() => {
        if (!contents) {
            alert("Cannot send a empty message.");
            return;
        }

        // Trigger lazy registeration
        if (!user) {
            // Save message data to local storage
            const messageState = {
                listingId: metadata.id,
                recipientId: metadata.associated_user_id,
                content: contents
            };
            localStorage.setItem("messageData", JSON.stringify(messageState));
    
            window.scroll({ top: 0 });
            navigate("/login");
            return;
        }

        try {
            await axios.post(`${BASE_URL}/api/message`, {
                token: localStorage.getItem("authToken"),
                listingId: metadata.id,
                recipientId: metadata.associated_user_id,
                content: contents
            });
            
            toggleModal();
            setSuccessAlert(true);
        } catch (error) {
            console.error("Error sending message:", error);
        };
    }

    // Prompt the backend to delete the specific message
    const deleteMessage = async() => {
        try {
            await axios.delete(`${BASE_URL}/api/deletemessage`, {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                },
                data: {
                    messageId: id
                }
            });
            toggleDeleteWarning();
            toggleModal();
            refreshMessageList();
        } catch (error) {
            console.error("Error deleting message:", error);
        };
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            {/* Delete message confirmation */}
            {deleteWarning && (
                <Confirmation 
                    deleteWarning={deleteWarning} 
                    toggleDeleteWarning={toggleDeleteWarning} 
                    onConfirm={deleteMessage}
                    message="Are you sure you want to delete the message?"
                />
            )}

            {/* The message associated tutor listing's title */}
            <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-semibold line-clamp-1">Tutor Listing: {title}</h3>
                    <button
                        onClick={toggleModal}
                        className="text-gray-800 hover:text-gray-700 hover:underline"
                    >
                        Close
                    </button>
                </div>

                {/* Render the sender/recipient label */}
                {!isSending ? (
                    <p className="text-gray-600 mb-2">
                        <strong>From:</strong> {name} (<a href={`mailto:${email}`} className="text-blue-600 hover:underline">{email}</a>)
                    </p>
                ) : (
                    <p className="text-gray-600 mb-2">
                        <strong>To:</strong> {name}
                    </p>
                )}

                {/* Render the timestamp if the pop-up is open via dashboard */}
                {!isSending && (
                    <p className="text-gray-600 mb-4"><strong>Date Sent:</strong> {convertDate(date)}</p>
                )}

                {/* The message content text field */}
                <div className="rounded-lg overflow-y-auto">
                    <textarea id="title" rows="9" value={contents} onChange={(e) => setContents(e.target.value)} className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-600 focus:border-primary-600" disabled={!isSending}></textarea>
                </div>

                {/* Loads either the delete button or the send & cancel button */}
                {isSending ? (
                    <div className="flex justify-end mt-4 pb-1">
                        <button
                            className="px-4 py-2 mr-4 text-white bg-red-600 hover:bg-red-800 focus:ring-red-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm"
                            onClick={toggleModal}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm"
                            onClick={sendMessage}
                        >
                            Send
                        </button>
                    </div> 
                ) : (
                    <button
                        type="button"
                        className="ml-auto px-3 py-3 min-w-[64px] max-h-[36px] mt-4 text-base font-medium text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg flex items-center"
                        onClick={toggleDeleteWarning}
                    >
                        Delete
                        <img src={trashCanIcon} className="w-7 h-4 filter invert hue-rotate-180" alt="delete listing" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default MessagePopUp;