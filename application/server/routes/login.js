const express = require('express');
const router = express.Router();
const { loginUserHandler } = require('../controller/userController');

router.get("/", loginUserHandler);

module.exports = router;