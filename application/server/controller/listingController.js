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
const { addListing, searchListing, getRecentListings, getListings, deleteListing } = require("../models/listingModel");

/**
 * Communicates with api endpoint to verify credential and create a tutor listing.
 * 
 * @returns Response status: 201 (Success), 401 (Invalid token), 500 (Internal server error).
 *          Response status has corresponding json message in form of { message: "status msg" }
 */
const addListingHandler = async(req, res) => {
    // Acquire jwt token and process data
    const token = req.headers.authorization;
    const { title, salesPitch, description, subjectId, pricing } = req.body;
    const image = req.files["image"] ? req.files["image"][0].buffer : null;
    const attachedFile = req.files["attached_file"] ? req.files["attached_file"][0].buffer : null;
    const attachedVideo = req.files["attached_video"] ? req.files["attached_video"][0].buffer : null;

    if (!token || !image || !title || !salesPitch || !description || !subjectId || !pricing) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        // Verify the JWT token authenticity
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        await addListing(userId, image, title, salesPitch, description, subjectId, pricing, attachedFile, attachedVideo);
        return res.status(201).json({ message: "Listing created successfully." });
    } catch (error) {
        // Specific error for JWT unauthenticity
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Internal server error
        return res.status(500).json({ message: "Failed to create listing" });
    }
}

/**
 * Communicates with api endpoint to handle listing search. Random flag will tell frontend to select random selection.
 * 
 * @returns Response status: 200 (Success), 500 (Failed to fetch listings).
 *          Success response status has corresponding json message in form of { count: (int value), results: [array], random: (boolean) }.
 *          Error response status has corresponding json message in form of { message: "status msg" }.
 */
const searchListingHandler = async(req, res) => {
    const { selectedSubject, searchTerm } = req.query;

    try {
        const listings = await searchListing(selectedSubject, searchTerm);
        if (listings.length > 0) { // Has drop down and search text query
            return res.status(200).json({ count: listings.length, results: listings, random: false });
            // The below will toggle whether we want randomized results or not
        // } else {
        //     return res.status(200).json({ count: listings.length, results: listings });
        }

        // No result found and have no drop down but have search text query. Throw all selections with random flag.
        if (!selectedSubject && searchTerm) {
            const allListings = await searchListing();
            return res.status(200).json({ count: allListings.length, results: allListings, random: true });
        }

        // No result found but have selected subject and probably invalid search term query.
        // Throw random selection with specified drop down selection.
        if (selectedSubject && searchTerm) {
            const dropDownListings = await searchListing(selectedSubject, false);
            return res.status(200).json({ count: dropDownListings.length, results: dropDownListings, random: true });
        }
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch listings" });
    }
}

/**
 * Fetches the most recent tutor listings and returns them to the frontend.
 * 
 * @returns Response status: 200 (Success), 500 (Failed to fetch recent listings).
 */
const getRecentListingsHandler = async(req, res) => {
    try {
        const listings = await getRecentListings();
        return res.status(200).json({ count: listings.length, results: listings });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch recent listings" });
    }
}

const getTutorListingsHandler = async(req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ message: "Missing authentication token." });
    }

    try {
        // Verify the JWT token authenticity
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        const listings = await getListings(userId);
        return res.status(200).json({ count: listings.length, results: listings });
    } catch (error) {
        // Specific error for JWT unauthenticity
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Internal server error
        return res.status(500).json({ message: "Failed to fetch tutor's listings" });
    }
};

const deleteListingHandler = async(req, res) => {
    const token = req.headers.authorization;
    const { listingId } = req.body;

    if (!token || !listingId) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        // Verify the JWT token authenticity
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        await deleteListing(userId, listingId);
        return res.status(200).json({ message: "Listing deleted successfully." });
    } catch (error) {
        // Specific error for JWT unauthenticity
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Internal server error
        return res.status(500).json({ message: "Failed to delete tutor's listing" });
    }
}

module.exports = {
    addListingHandler,
    searchListingHandler,
    getRecentListingsHandler,
    getTutorListingsHandler,
    deleteListingHandler
}