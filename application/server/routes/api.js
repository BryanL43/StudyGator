const express = require('express');
const router = express.Router();
const userRoute = require("./userRoute.js");

router.use("/user", userRoute);

module.exports = router;