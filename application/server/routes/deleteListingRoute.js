/**************************************************************
* Author(s): Bryan Lee & Nishi Suratia
* Last Updated: 11/12/2024
*
* File:: deleteListingRoute.js
*
* Description:: The api endpoint for deleting a tutor listing from the database.
*
**************************************************************/

const express = require('express');
const router = express.Router();
const { deleteListingHandler } = require('../controller/listingController');

router.delete("/", deleteListingHandler);

module.exports = router;