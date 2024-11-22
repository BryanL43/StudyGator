/**************************************************************
* Author(s): Bryan Lee
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

module.exports = {
    createMessage,
    getMessages
}