const express = require('express');
const { getUser } = require('../models/userModel');
const { meHandler } = require('../controller/userController');
const router = express.Router();

router.get("/me", meHandler);

module.exports = router;