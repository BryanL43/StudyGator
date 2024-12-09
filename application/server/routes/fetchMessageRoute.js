/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 11/21/2024
*
* File:: fetchMessageRoute.js
*
* Description:: The api endpoint for fetching a specified message from the database.
*
**************************************************************/

const express = require('express');
const router = express.Router();
const { getMessageHandler } = require('../controller/messageController');

router.get("/", getMessageHandler);

module.exports = router;
