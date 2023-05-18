const path = require("path");
const fs = require("fs");

const deleteUploadedFile = (filename) => {
    const filePath = path.join(__dirname, "..", "public/uploads", filename);
    fs.unlink(filePath, (err) => {
        if (err) console.log(err);
    });
};

module.exports = deleteUploadedFile;