const dayjs = require("dayjs");

const sanitizeTC = (tcArr) => {
    return tcArr.map(tc => {
        return {
            createdAt: dayjs(tc.createdAt).format("MMM D, YYYY HH:mm"),
            donorName: tc.donorName,
            followUpDate: dayjs(tc.followUpDate).format("MMM D, YYYY"),
            createdBy: tc.createdBy.name,
            id: tc._id,
            phoneNumber: tc.phoneNumber,
            note: tc.note,
        };
    });
};

module.exports = sanitizeTC;