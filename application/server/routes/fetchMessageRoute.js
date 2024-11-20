const express = require('express');
const router = express.Router();
const { getMessageHandler } = require('../controller/messageController');

router.get("/", getMessageHandler);

module.exports = router;
