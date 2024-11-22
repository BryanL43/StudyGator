const convertDate = (isoDate) => {
    const date = new Date(isoDate);
    
    // UTC-8 adjustments (Daylight savings for Fall 2024)
    const pstDate = new Date(date.getTime() - (8 * 60 * 60 * 1000));

    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    return formatter.format(pstDate);
};

module.exports = convertDate;