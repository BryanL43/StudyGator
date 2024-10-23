const express = require('express');
const router = express.Router();
const { loginUserHandler } = require('../controller/userController');

router.post("/", loginUserHandler);

module.exports = router;