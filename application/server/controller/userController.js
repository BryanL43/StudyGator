const { getUser } = require("../models/userModel");

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

module.exports = {
    userHandler
}