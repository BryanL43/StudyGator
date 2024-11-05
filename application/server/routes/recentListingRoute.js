/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 11/5/2024
*
* File:: recentListingRoute.js
*
* Description:: The api endpoint to retrieve the recent 3 listings
*               for the home page.
*
**************************************************************/

const express = require('express');
const router = express.Router();
const { getRecentListingsHandler } = require('../controller/listingController');

router.get("/", getRecentListingsHandler);

module.exports = router;