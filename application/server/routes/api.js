/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 10/25/2024
*
* File:: api.js
*
* Description:: Redirect to proper api endpoint.
*
**************************************************************/

const express = require('express');
const router = express.Router();
const registerRoute = require("./registerRoute.js");
const loginRoute = require("./login.js");
const applyRoute = require("./applyRoute.js");
const getListingRoute = require("./searchListingRoute.js");
const getSubjectRoute = require("./subjectRoute.js");
const recentListingRoute = require("./recentListingRoute.js");
const tutorListingRoute = require("./tutorListingRoute.js");
const deleteListingRoute = require("./deleteListingRoute.js");

router.use("/register", registerRoute);
router.use("/login", loginRoute);
router.use("/apply", applyRoute);
router.use("/search", getListingRoute);
router.use("/subject", getSubjectRoute);
router.use("/recent", recentListingRoute);
router.use("/fetchlistings", tutorListingRoute);
router.use("/delete", deleteListingRoute);

module.exports = router;
