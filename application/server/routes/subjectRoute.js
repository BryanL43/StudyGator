/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 10/26/2024
*
* File:: subjectRoute.js
*
* Description:: The api endpoint for retrieving subject list from database.
*
**************************************************************/

const express = require('express');
const router = express.Router();
const { retrieveSubjectHandler } = require('../controller/subjectController');

router.get("/", retrieveSubjectHandler);

module.exports = router;