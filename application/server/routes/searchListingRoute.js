/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 10/25/2024
*
* File:: searchListingRoute.js
*
* Description:: The api endpoint for tutor listing search.
*
**************************************************************/

const express = require('express');
const router = express.Router();
const { searchListingHandler } = require('../controller/listingController');

router.get("/", searchListingHandler);

module.exports = router;