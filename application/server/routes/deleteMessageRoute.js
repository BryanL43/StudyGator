/**************************************************************
* Author(s): Nishi Suratia
* Last Updated: 11/22/2024
*
* File:: deleteMessageRoute.js
*
* Description:: The api endpoint for deleting a message from the database.
*
**************************************************************/

const express = require('express');
const router = express.Router();
const { deleteMessageHandler } = require('../controller/messageController');

router.delete("/", deleteMessageHandler);

module.exports = router;
