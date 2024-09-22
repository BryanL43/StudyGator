const { getUser } = require("../models/userModel");

const meHandler = async(req, res) => {
    const user = await getUser();
    console.log(user);
    res.send("OK");
}

module.exports = {
    meHandler
}