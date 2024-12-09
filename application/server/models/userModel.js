/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 10/25/2024
*
* File:: userModel.js
*
* Description:: User model that interacts with the database table.
*               Offers the functionality of registeration and log in.
*
**************************************************************/

const bcrypt = require('bcrypt');
const connectDB = require("../config/db");

/**
 * Register a new user to the database.
 * 
 * @param {string} name The new user's name.
 * @param {string} email The new user's SFSU email.
 * @param {string} password The new user's password.
 * @returns insertId, otherwise throws an error.
 */
const registerUser = async(name, email, password) => {
    const connection = await connectDB();

    // Check if the email ends with @sfsu.edu
    if (!email.endsWith('@sfsu.edu')) {
        const error = new Error('Email must end with @sfsu.edu');
        error.code = "ER_INVALID_EMAIL";
        throw error;
    }

    // Validate password
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [results] = await connection.execute(
            `INSERT INTO \`data-schema\`.REGISTEREDUSERS (name, email, password) VALUES (?, ?, ?)`,
            [name, email, hashedPassword]
        );

        return results.insertId;
    } catch (error) {
        throw error;
    }
};

/**
 * Handles user log in via database.
 * 
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns The user's data, otherwise null.
 */
const loginUser = async(email, password) => {
    const connection = await connectDB();
    const [result] = await connection.query(
        `SELECT * FROM \`data-schema\`.REGISTEREDUSERS WHERE email = ?`, [email]
    );

    if (!result || result.length === 0) {
        return null;
    }
    
    const validatePwd = await bcrypt.compare(password, result[0].password);
    if (!validatePwd) {
        return null;
    }

    return result[0];
}

module.exports = {
    registerUser,
    loginUser
}