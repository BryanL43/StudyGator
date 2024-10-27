/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 10/26/2024
*
* File:: subjectController.js
*
* Description:: Subject controller that handles communication between
*               api endpoints and subject model to interact with the database.
*               Offers the functionality of retrieving the list of subjects.
*
**************************************************************/

const { getSubjectList } = require("../models/subjectModel");

/**
 * Communicates with api endpoint to retrieve list of subjects.
 * 
 * @returns Response status: 200 (Success) or 500 (Internal server error).
 *          Response status has corresponding json message in form of { message: "status msg" } or { json list } on success.
 */
const retrieveSubjectHandler = async(req, res) => {
    try {
        const results = await getSubjectList();
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ message: "Failed to retrieve subject list" });
    }
}

module.exports = {
    retrieveSubjectHandler
}