/**************************************************************
* Author(s): Nishi Suratia
* Last Updated: 11/14/2024
*
* File:: messageRoute.js
*
* Description:: The api endpoint for sending a message.
*
**************************************************************/

const express = require('express');
const router = express.Router();
const { sendMessageHandler }= require('../controller/messageController');

// Route to send a message
router.post('/', sendMessageHandler);

module.exports = router;
