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
const cors = require("cors");
const path = require("path");
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: '../.env' }); // Acquire env variables

// Importing routes
const apiRouter = require('./routes/api');
const connectDB = require('./config/db'); // Database connection
const tutorListingsRoute = require('./routes/tutorlisting'); // New route for tutor listings

const app = express();

// Declare proper CORS settings to prevent cross-origin issues
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:2000', 'https://eclipsesakura.online'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Test database connection on server start
(async () => {
    try {
        await connectDB();
        console.log('Connected to the MySQL database successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit if database connection fails
    }
})();

// Routes
app.use("/api", apiRouter); // Existing API routes
app.use("/api/tutor-listings", tutorListingsRoute); // New tutor listings route

// Share images
app.use('/imgs', express.static(path.join(__dirname, 'public/imgs')));

// Health check endpoint
app.get('/', (req, res) => {
    res.send('Server is up and running');
});

const PORT = process.env.SERVER_PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

