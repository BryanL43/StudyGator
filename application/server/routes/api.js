const express = require('express');
const router = express.Router();
const userRoute = require("./userRoute.js");
const registerRoute = require("./registerRoute.js");

router.use("/user", userRoute);
router.use("/register", registerRoute)

module.exports = router;