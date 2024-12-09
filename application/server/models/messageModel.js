/**************************************************************
* Author(s): Bryan Lee & Nishi Suratia
* Last Updated: 11/20/2024
*
* File:: messageModel.js
*
* Description:: Message model that interacts with the database table.
*               Offers the functionality of sending a message, fetching message(s),
*               and deleting message(s).
*
**************************************************************/

const connectDB = require("../config/db");

/**
 * Add/Create a new message to the database associated with the sender, reciever, and listing id. 
 * 
 * @param {string} listingId The message's associated listing id.
 * @param {string} senderId the message sender's id.
 * @param {string} recipientId The message recipient's id.
 * @param {string} content The message body.
 * @returns void, otherwise throws an error.
 */
const createMessage = async(listingId, senderId, recipientId, content) => {
    const connection = await connectDB();

    try {
        let query = `
            INSERT INTO \`data-schema\`.MESSAGES (listing_id, sender_user_id, recipient_user_id, content)
            VALUES (?, ?, ?, ?)
        `;

        // Execute the query to create a new message
        await connection.execute(query, [listingId, senderId, recipientId, content]);        
    } catch (error) {
        throw error;
    } 
};

/**
 * Retrieves all the messages sent to a specific registered user.
 * 
 * @param {string} userId The registered user's id associated to the message recipient id.
 * @returns The list of messages, otherwise throws an error.
 */
const getMessages = async(userId) => {
    const connection = await connectDB();

    try {
        let query = `
            SELECT M.*, SU.name AS senderName, SU.email AS senderEmail, RU.name AS recipientName, TL.title AS listingTitle
            FROM \`data-schema\`.MESSAGES AS M
            JOIN \`data-schema\`.REGISTEREDUSERS AS SU ON M.sender_user_id = SU.id
            JOIN \`data-schema\`.REGISTEREDUSERS AS RU ON M.recipient_user_id = RU.id
            JOIN \`data-schema\`.TUTORLISTINGS AS TL ON M.listing_id = TL.id
            WHERE M.recipient_user_id = ?
            ORDER BY M.date_created DESC
        `;

        const [results] = await connection.execute(query, [userId]);
        return results;
    } catch (error) {
        throw error;
    }
}

/**
 * Deletes a specific message.
 * 
 * @param {string} messageId The message's id to be deleted.
 * @param {string} userId The registered user's id associated to the message recipient id.
 * @returns The list of messages, otherwise throws an error.
 */
const deleteMessage = async(messageId, userId) => {
    const connection = await connectDB();
    
    try {
        const query = `
            DELETE FROM \`data-schema\`.MESSAGES
            WHERE id = ? AND recipient_user_id = ?
        `;
        
        await connection.execute(query, [messageId, userId]);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createMessage,
    getMessages,
    deleteMessage
}