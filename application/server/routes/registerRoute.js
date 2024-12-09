/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 12/5/2024
*
* File:: registerRoute.js
*
* Description:: The api endpoint for creating a new registered user account.
*
**************************************************************/

const express = require('express');
const router = express.Router();
const { registerUserHandler } = require('../controller/userController');

router.put("/", registerUserHandler);

module.exports = router;