const express = require('express');
const router = express.Router();
const { addUserHandler } = require('../controller/userController');

router.put("/", addUserHandler);

module.exports = router;