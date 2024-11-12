/**************************************************************
* Author(s): Bryan Lee,Nishi suratia
* Last Updated: 11/10/2024
*
* File:: server.js
*
* Description:: The main backend entry point. Handles initializing
*               env variables, expressJS, cors policy, and most importantly
*               api redirect.
*
**************************************************************/

const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors")
const path = require("path")
const cookieParser = require('cookie-parser');
const apiRouter = require('./routes/api');

require('dotenv').config({ path: '../.env' }); // Acquire env variables

const app = express();

// Declare proper cors heading to prevent cross-origin policy issues
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:2000', 'https://eclipsesakura.online'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Loads api route distribution
app.use("/api", apiRouter);

// Share images
app.use('/imgs', express.static(path.join(__dirname, 'public/imgs')));

const PORT = process.env.SERVER_PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
