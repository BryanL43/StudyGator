/**************************************************************
* Author(s): Nishi Suratia
* Last Updated: 11/11/2024
*
* File:: tutorListingRoute.js
*
* Description:: The api endpoint to retrieve all the tutor listing
*               for a specific registered user.
*
**************************************************************/
const express = require('express');
const router = express.Router();
const { getTutorListingsHandler } = require('../controller/listingController');

router.get("/", getTutorListingsHandler);

module.exports = router;
