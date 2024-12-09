/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 10/25/2024
*
* File:: userController.js
*
* Description:: User controller that handles communication between
*               api endpoints and user models to interact with the database.
*               Offers the functionality of registering and log in.
*               The functions returns a status code and json message/data.
*
**************************************************************/

const jwt = require('jsonwebtoken');
const { registerUser, loginUser } = require("../models/userModel");

/**
 * Communicates with api endpoint to handle user registeration.
 * 
 * @returns Response status: 201 (Success), 409 (Duplicate found), 500 (Internal server error).
 *          Response status has corresponding json message in form of { message: "status msg" }
 */
const registerUserHandler = async(req, res) => {
    const { name, email, password } = req.body;

    try {
        await registerUser(name, email, password);
        return res.status(201).json({ message: "Successfully registered user." });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "Duplicate account: An account with this email already exists." });
        }
        if (error.code === "ER_INVALID_EMAIL") {
            return res.status(400).json({ message: "Invalid email! You must use an SFSU associated email." });
        }

        return res.status(500).json({ message: "Failed to register user" });
    }
}

/**
 * Communicates with api endpoint to handle user log in.
 * 
 * @returns Response status: 200 (Success), 401 (Invalid credentials), 500 (Internal server error).
 *          Response status has corresponding json message in form of { message: "status msg" } or { token } on success.
 */
const loginUserHandler = async(req, res) => {
    const { email, password, rememberMe } = req.body;

    try {
        const user = await loginUser(email, password);
        if (user) {
            const expirationTime = rememberMe ? "30d" : "12h";
            // Creates a JWT token (basically a more secure cookie)
            const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: expirationTime }); // 12 hrs sessions w/o remember me
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Failed to sign in" })
    }
}

// Add a secure route to acquire user's email and name for dashboard later

module.exports = {
    registerUserHandler,
    loginUserHandler
}