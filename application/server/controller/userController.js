const jwt = require('jsonwebtoken');
const { getUser , addUser, loginUser } = require("../models/userModel");

const userHandler = async(req, res) => {
    const { username } = req.params;
    const email = `${username}@sfsu.edu`; // Append full email

    try {
        const user = await getUser(email); // Query full email
        if (user.length > 0) {
            res.json(user[0]);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: "Server error" });
    }
}

const addUserHandler = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        await addUser(name, email, password);
        res.json({ success: true });
    } catch (err) {
        console.error("Error adding user: ", err);
        res.status(500).json({ success: false, error: err.message });
    }
}

const loginUserHandler = async(req, res) => {
    const { email, password, rememberMe } = req.body;
    try {
        const user = await loginUser(email, password);
        if (user) {
            const expirationTime = rememberMe ? "30d" : "2h";
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: expirationTime }); // 2 hrs sessions w/o remember me
            res.json({ token });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    userHandler,
    addUserHandler,
    loginUserHandler
}