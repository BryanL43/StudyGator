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
const registerRoute = require("./registerRoute.js");
const loginRoute = require("./login.js");
const applyRoute = require("./applyRoute.js");
const getListingRoute = require("./searchListingRoute.js");
const getSubjectRoute = require("./subjectRoute.js");
const recentListingRoute = require("./recentListingRoute.js");
//
const { getListingByIdHandler } = require("../controllers/listingController");


router.use("/register", registerRoute);
router.use("/login", loginRoute);
router.use("/apply", applyRoute);
router.use("/search", getListingRoute);
router.use("/subject", getSubjectRoute);
router.use("/recent", recentListingRoute);

// Route for fetching a tutor listing by ID- check for updates
router.get("/listings/:listingId", getListingByIdHandler);

module.exports = router;
