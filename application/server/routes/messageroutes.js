/**************************************************************
* Author(s): Nishi Suratia
* Last Updated: 14/11/2024
*
* File:: messageroutes.js
*
*
*
**************************************************************/

const express = require('express');
const router = express.Router();
const {sendMessageHandler }= require('../controller/listingController');

// Route to send a message
router.post('/send', sendMessageHandler);

module.exports = router;
