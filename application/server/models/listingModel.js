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
 * @param {string} subjectId The specified subject id.
 * @param {int} pricing The specified pricing per hour.
 * @return void, otherwise throws an error.
 */
const addListing = async(userId, image, description, subjectId, pricing, attachedFile) => {
    const connection = await connectDB();
    //Hard-code subjectID until I hook it up:
    subjectId = "96b5b5f0-941b-11ef-9e70-02fff31b5977";

    try {
        let sql = `INSERT INTO \`data-schema\`.TUTORLISTINGS (associated_user_id, image, description, subject_id, pricing` +
            (attachedFile ? ', attached_file' : '') + 
            `) VALUES (?, ?, ?, ?, ?` +
            (attachedFile ? ', ?' : '') + 
            `)`;

        const values = [userId, image, description, subjectId, pricing];
        if (attachedFile) {
            values.push(attachedFile); // Add attached file if available
        }

        // Execute the query to add the listing
        await connection.execute(sql, values);
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
        // Default query that acquires all approved listings
        let query = `
            SELECT TL.*, RU.name AS tutorName, S.name AS subjectName
            FROM \`data-schema\`.TUTORLISTINGS AS TL
            JOIN \`data-schema\`.REGISTEREDUSERS AS RU ON TL.associated_user_id = RU.id
            JOIN \`data-schema\`.SUBJECTS AS S ON TL.subject_id = S.id
            WHERE TL.approved = 1
        `;
        const params = [];

        // Append selected drop down
        if (selectedSubject) {
            query += ` AND S.name = ?`;
            params.push(selectedSubject);
        }
        
        // Append search terms
        if (searchTerm) {
            query += ` AND REPLACE(CONCAT_WS('', S.name, TL.description, RU.name), ' ', '') LIKE ?`;
            params.push(`%${searchTerm.replace(/\s/g, '')}%`);
        }

        // Execute database search with the concatenated queries & params
        const [results] = await connection.execute(query, params);
        
        // Convert the buffered images to renderable jpeg
        const listings = results.map(item => ({
            ...item,
            image: item.image ? `data:image/jpeg;base64,${item.image.toString('base64')}` : null,
            attachedFile: item.attached_file ? `data:application/pdf;base64,${item.attached_file.toString('base64')}` : null
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