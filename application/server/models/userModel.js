const bcrypt = require('bcrypt');
const connectDB = require("../config/db");

const getUser = async(email) => {
    const connection = await connectDB();
    const [result] = await connection.query(
        `SELECT * FROM \`data-schema\`.REGISTEREDUSERS WHERE email = ?`, [email]
    );
    return result;
}

const addUser = async (name, email, password, dateCreated) => {
    console.log(password);
    const connection = await connectDB();
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [results] = await connection.execute(
            `INSERT INTO \`data-schema\`.REGISTEREDUSERS (name, email, password, date_created) VALUES (?, ?, ?, ?)`,
            [name, email, hashedPassword, dateCreated]
        );
        console.log("New user successfully created: ", results.insertId);
        return results.insertId;
    } catch (err) {
        // Check if the error is a duplicate entry error
        if (err.code === 'ER_DUP_ENTRY') {
            console.error("Error: Duplicate account - an account with this email already exists.");
            throw new Error('Duplicate account: An account with this email already exists.');
        } else {
            console.error("Error creating new user: ", err.message);
            throw err; // Throw other error
        }
    }
};

module.exports = {
    getUser,
    addUser
}