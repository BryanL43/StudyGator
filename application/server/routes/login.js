/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 12/5/2024
*
* File:: login.js
*
* Description:: The api endpoint for sending a sign in request with
*               credential validation.
*
**************************************************************/

const express = require('express');
const router = express.Router();
const { loginUserHandler } = require('../controller/userController');

router.post("/", loginUserHandler);

module.exports = router;