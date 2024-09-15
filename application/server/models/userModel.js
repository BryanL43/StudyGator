const connectDB = require("../config/db");

const getUser = async(username) => {
    const connection = await connectDB();
    const [result] = await connection.query(`SELECT * FROM user`);
    return result;
}

module.exports = {
    getUser
}