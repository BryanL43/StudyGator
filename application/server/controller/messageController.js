/**************************************************************
* Author(s): Bryan Lee
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
const { createMessage, getMessages } = require("../models/messageModel");

const sendMessageHandler = async(req, res) => {
    const token = req.headers.authorization;
    const { listingId, recipientId, content } = req.body;

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

module.exports = {
    sendMessageHandler,
    getMessageHandler
}