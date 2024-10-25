/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 10/25/2024
*
* File:: listingModel.js
*
* Description:: Tutor listing model that interacts with the database table.
*               Offers the functionality of adding, searching, and deleting
*               listing(s).
*
**************************************************************/

const connectDB = require("../config/db");

/**
 * Add/Create a tutor listing in the database with its respective fields populated.
 * 
 * @param {string} userId The listing's owner user ID. Should be acquired from jwt token.
 * @param {Buffer} image Buffer of the tutor's image. Buffering handled by npm multer package.
 * @param {string} description The description text (string) that the tutor want to display on their listing.
 * @param {string} subject The specified subject as a string (max 255 characters).
 * @param {int} pricing The specified pricing per hour.
 * @return void, otherwise throws an error.
 */
const addListing = async(userId, image, description, subject, pricing) => {
    const connection = await connectDB();

    try {
        await connection.execute(
            `INSERT INTO \`data-schema\`.TUTORLISTINGS (associated_user_id, image, description, subject, pricing) VALUES (?, ?, ?, ?, ?)`,
            [userId, image, description, subject, pricing]
        );
    } catch (error) {
        throw error;
    }
};

/**
 * Search tutor listings by the subject dropdown with fuzzy text search 
 * 
 * @param {string} selectedSubject The selected dropdown subject.
 * @param {string} searchTerm The inputted fuzzy text.
 * @returns array of the found listings, otherwise throws an error.
 */
const searchListing = async(selectedSubject, searchTerm) => {
    const connection = await connectDB();

    try {
        // Default query that acquires all listings
        let query = `
            SELECT TL.*, RU.name
            FROM \`data-schema\`.TUTORLISTINGS AS TL
            JOIN \`data-schema\`.REGISTEREDUSERS AS RU ON TL.associated_user_id = RU.id
        `;
        const params = [];

        if (selectedSubject && searchTerm) { // Both dropdown and search bar has search values
            query += `
                WHERE TL.subject = ?
                AND REPLACE(CONCAT_WS('', TL.subject, TL.description, RU.name), ' ', '') LIKE ?
            `;
            params.push(selectedSubject, `%${searchTerm.replace(/\s/g, '')}%`);
        } else if (selectedSubject) { // Only dropdown selected
            query += `
                WHERE TL.subject = ?
            `;
            params.push(selectedSubject);
        } else if (searchTerm) { // Only search bar has value
            query += `
                WHERE REPLACE(CONCAT_WS('', TL.subject, TL.description, RU.name), ' ', '') LIKE ?
            `;
            params.push(`%${searchTerm.replace(/\s/g, '')}%`);
        }

        // Execute database search with the concatenated queries & params
        const [results] = await connection.execute(query, params);
        
        // Convert the buffered images to renderable jpeg
        const listings = results.map(item => ({
            ...item,
            image: item.image ? `data:image/jpeg;base64,${item.image.toString('base64')}` : null
        }));

        return listings;
    } catch (error) {
        throw error;
    }
}

// Add delete listing here later

module.exports = {
    addListing,
    searchListing
}