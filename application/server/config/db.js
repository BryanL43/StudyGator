/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 12/5/2024
*
* File:: db.js
*
* Description:: Creates a database pool connection for communication
*               between frontend & backend.
*
**************************************************************/

const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' });

let pool;

const connectDB = async () => {
    if (!pool) {
        pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 50,
            queueLimit: 0
        });
        console.log('MySQL pool created');
    }
    return pool;
};

module.exports = connectDB;