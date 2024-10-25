const jwt = require('jsonwebtoken');
const { addUser, loginUser } = require("../models/userModel");

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
    addUserHandler,
    loginUserHandler
}