/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 10/25/2024
*
* File:: applyRoute.js
*
* Description:: The api endpoint for applying as tutor and creating a
*               tutor listing. It also takes the buffered uploaded image
*               via multer package.
*
**************************************************************/

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { addListingHandler } = require('../controller/listingController');

router.put("/", upload.single("image"), addListingHandler);

module.exports = router;