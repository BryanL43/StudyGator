/**************************************************************
* Author(s): Bryan Lee & Nishi Suratia
* Last Updated: 11/20/2024
*
* File:: messageController.js
*
* Description:: Message controller that handles communication between
*               api endpoints and message model to interact with the database.
*               Offers the functionality of sending a message, fetching message(s),
*               and deleting message(s).
*
**************************************************************/

const jwt = require('jsonwebtoken');
const { createMessage, getMessages, deleteMessage } = require("../models/messageModel");

/**
 * Communicates with api endpoint to verify credential and send a message to desired tutor.
 * 
 * @returns Response status: 201 (Success), 400 (Missing field), 401 (Invalid token), 500 (Internal server error).
 *          Response status has corresponding json message in form of { message: "status msg" }
 */
const sendMessageHandler = async(req, res) => {
    const { token, listingId, recipientId, content } = req.body;

    // Check if all required fields are provided
    if (!token || !listingId || !recipientId || !content) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        // Verify the JWT token to authenticate the sender
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const senderId = decodedToken.id;

        await createMessage(listingId, senderId, recipientId, content);
        return res.status(201).json({ message: "Message sent successfully." });
    } catch (error) {
        // Specific error for JWT unauthenticity
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Internal server error
        return res.status(500).json({ message: "Failed to send message", error: error.message });
    }
};

/**
 * Communicates with api endpoint to verify credential and fetch all messages recieved by
 * the registered user.
 * 
 * @returns Response status: 201 (Success), 400 (Missing field), 401 (Invalid token), 500 (Internal server error).
 *          Response status has corresponding json message in form of { message: "status msg" }
 */
const getMessageHandler = async(req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ message: "Missing authentication token." });
    }

    try {
        // Verify the JWT token authenticity
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        const messages = await getMessages(userId);
        return res.status(200).json({ count: messages.length, results: messages });
    } catch (error) {
        // Specific error for JWT unauthenticity
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Internal server error
        return res.status(500).json({ message: "Failed to fetch messages" });
    }
}

/**
 * Communicates with api endpoint to verify credential and delete a specific message.
 * 
 * @returns Response status: 201 (Success), 400 (Missing field), 401 (Invalid token), 500 (Internal server error).
 *          Response status has corresponding json message in form of { message: "status msg" }
 */
const deleteMessageHandler = async (req, res) => {
    const token = req.headers.authorization; 
    const { messageId } = req.body; 

    if (!token || !messageId) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        // Verify the JWT token and extract the user ID
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;
        
        await deleteMessage(messageId, userId);
        return res.status(200).json({ message: 'Message deleted successfully.' });
    } catch (error) {
        // Handle invalid JWT token
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Internal server error
        return res.status(500).json({ message: error.message || 'Failed to delete message.' });
    }
};

module.exports = {
    sendMessageHandler,
    getMessageHandler,
    deleteMessageHandler
}