const express = require('express');
const router = express.Router();
const userRoute = require("./userRoute.js");
const registerRoute = require("./registerRoute.js");
const loginRoute = require("./login.js");

router.use("/user", userRoute);
router.use("/register", registerRoute);
router.use("/login", loginRoute);

module.exports = router;