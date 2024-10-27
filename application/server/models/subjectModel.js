/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 10/26/2024
*
* File:: subjectModel.js
*
* Description:: Subject model that interacts with the database table.
*               Retrieves the list of subjects as json with their id and names.
*
**************************************************************/

const connectDB = require("../config/db");

/**
 * Retrieves the list of subjects from SUBJECT table. 
 * 
 * @returns json data of the subjects.
 */
const getSubjectList = async() => {
    const connection = await connectDB();
    
    try {
        const [results] = await connection.execute('SELECT * FROM `data-schema`.SUBJECTS');
        return results;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getSubjectList
}