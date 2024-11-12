/**************************************************************
* Author(s): Nishi Suratia
* Last Updated: 11/11/2024
*
* File:: tutorlisting.js
*
*
*
**************************************************************/
const express = require('express');
const router = express.Router();
const { getTutorListings } = require('../controller/listingController');

router.get("/", getTutorListings);

module.exports = router;
