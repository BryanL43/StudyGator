const connectDB = require("../config/db");

const getUser = async(email) => {
    const connection = await connectDB();
    console.log(email);
    const [result] = await connection.query(
        `SELECT * FROM \`data-schema\`.registeredUser WHERE email = ?`, [email]
    );
    return result;
}

module.exports = {
    getUser
}