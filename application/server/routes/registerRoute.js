const express = require('express');
const router = express.Router();
const { registerUserHandler } = require('../controller/userController');

router.put("/", registerUserHandler);

module.exports = router;