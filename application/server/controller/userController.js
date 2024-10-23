const { getUser , addUser } = require("../models/userModel");

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
        res.status(500).json({ message: "Server error" });
    }
}

const addUserHandler = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        await addUser(name, email, password, Math.floor(Date.now() / 1000));
        res.json({ success: true });
    } catch (err) {
        console.error("Error adding user: ", err);
        res.status(500).json({ success: false, error: err.message });
    }
}


module.exports = {
    userHandler,
    addUserHandler
}