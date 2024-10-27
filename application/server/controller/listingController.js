/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 10/25/2024
*
* File:: listingController.js
*
* Description:: Tutor listing controller that handles communication between
*               api endpoints and listing model to interact with the database.
*               Offers the functionality of adding, searching, and deleting listing(s).
*               The functions returns a status code and json message/data.
*
**************************************************************/

const jwt = require('jsonwebtoken');
const { addListing, searchListing } = require("../models/listingModel");

/**
 * Communicates with api endpoint to verify credential and create a tutor listing.
 * 
 * @returns Response status: 201 (Success), 401 (Invalid token), 500 (Internal server error).
 *          Response status has corresponding json message in form of { message: "status msg" }
 */
const addListingHandler = async(req, res) => {
    // Acquire jwt token and data
    const token = req.headers.authorization;
    const { description, subjectId, pricing } = req.body;
    const image = req.file ? req.file.buffer : null;

    if (!token || !image || !description || !subjectId || !pricing) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        // Verify the JWT token authenticity
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        await addListing(userId, image, description, subjectId, pricing);
        return res.status(201).json({ message: "Listing created successfully." });
    } catch (error) {
        // Specific error for JWT unauthenticity
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid token" })
        }

        // Internal server error
        return res.status(500).json({ message: "Failed to create listing" });
    }
}

/**
 * Communicates with api endpoint to handle listing search.
 * 
 * @returns Response status: 200 (Success), 500 (Failed to fetch listings).
 *          Success response status has corresponding json message in form of { count: (int value), results: [array] }.
 *          Error response status has corresponding json message in form of { message: "status msg" }.
 */
const searchListingHandler = async(req, res) => {
    const { selectedSubject, searchTerm } = req.query;
    
    try {
        const listings = await searchListing(selectedSubject, searchTerm);
        if (listings.length > 0) {
            return res.status(200).json({ count: listings.length, results: listings});
        } else {
            return res.status(200).json({ message: "temp. Add randomized selection later." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch listings" });
    }
}

// Add delete listing here later

module.exports = {
    addListingHandler,
    searchListingHandler
}