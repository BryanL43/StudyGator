/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 10/25/2024
*
* File:: api.js
*
* Description:: Redirect to proper api endpoint.
*
**************************************************************/

const express = require('express');
const router = express.Router();

// Import routes
const registerRoute = require("./registerRoute.js");
const loginRoute = require("./login.js");
const applyRoute = require("./applyRoute.js");
const getListingRoute = require("./searchListingRoute.js");
const getSubjectRoute = require("./subjectRoute.js");
const recentListingRoute = require("./recentListingRoute.js");
const tutorListingRoutes = require('./tutorlisting.js');
//const tutorListingsRoute = require("./tutorListingsRoute.js");  // Add the tutor listings route

// Use routes
router.use("/register", registerRoute);
router.use("/login", loginRoute);
router.use("/apply", applyRoute);
router.use("/search", getListingRoute);
router.use("/subject", getSubjectRoute);
router.use("/recent", recentListingRoute);
router.use("/tutor-listing", tutorListingRoutes);

//router.use("/tutor-listings", tutorListingsRoute);  // Add this route to handle tutor listings
//const { getAllTutorListingsHandler } = require('../controller/listingController');

// Example of the route in your API router
//router.get("/tutor-listings", getAllTutorListingsHandler);

module.exports = router;
