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
const messageRoute = require("./messageRoute.js");
const fetchMessageRoute = require("./fetchMessageRoute.js");
const deleteMessageRoute = require("./deleteMessageRoute.js");

// Note: these are individual endpoints rather than using /endpoint/:id
// as I do not want to expose sensitive data via the JWT tokens to a public url query
router.use("/register", registerRoute);
router.use("/login", loginRoute);
router.use("/apply", applyRoute);
router.use("/search", getListingRoute);
router.use("/subject", getSubjectRoute);
router.use("/recent", recentListingRoute);
router.use("/fetchlistings", tutorListingRoute);
router.use("/delete", deleteListingRoute);
router.use("/message", messageRoute);
router.use("/fetchmessages", fetchMessageRoute);
router.use("/deletemessage", deleteMessageRoute);

module.exports = router;
