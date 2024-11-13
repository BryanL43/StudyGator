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
const { getTutorListingsHandler } = require('../controller/listingController');

router.get("/", getTutorListingsHandler);

module.exports = router;
