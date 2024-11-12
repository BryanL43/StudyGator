/**************************************************************
* Author(s): Nishi Suratia
* Last Updated: 11/11/2024
*
* File:: tutorlisting.js
*
*.
*
**************************************************************/
const express = require('express');
const router = express.Router();
const { getTutorListingsByUserHandler } = require('../controller/listingController');

router.get("/", getTutorListingsByUserHandler);

module.exports = router;
