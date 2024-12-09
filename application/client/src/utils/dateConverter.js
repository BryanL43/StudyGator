/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 12/5/2024
*
* File:: dateConverter.js
*
* Description:: This file handles date conversion to local SF time.
*
**************************************************************/

const convertDate = (isoDate) => {
    const date = new Date(isoDate);

    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "America/Los_Angeles"
    });

    return formatter.format(date);
};

module.exports = convertDate;