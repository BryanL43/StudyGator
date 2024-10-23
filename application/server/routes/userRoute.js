const express = require('express');
const router = express.Router();
const { userHandler } = require('../controller/userController');

// Takes email username and will automatically append @sfsu.edu
router.get("/:username", userHandler);

module.exports = router;