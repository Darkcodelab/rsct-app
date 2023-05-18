const asyncHandler = require("express-async-handler");
const Acknowledgment = require("../models/Acknowledgment");
const deleteUploadedFile = require("../utils/deleteUploadedFile");
const env = require("../config");
const { default: axios } = require("axios");
const { backendURL, wassengerAPI_URL } = require("../config/appConfig");

const getDonorAcknowledgment = asyncHandler(async (req, res) => {
    const data = await Acknowledgment.find({});
    if (data) {
        res.json({ success: true, acknowledgment: data });
        return;
    }
    res.json({ success: false, message: "Database error" });
});

const updateAcknowledgmentMessage = asyncHandler(async (req, res) => {
    if (!res.locals.user.admin) {
        return res.json({ success: false, error: "Unauthorized" });
    }
    const { message, id } = req.body;
    const acknowledgment = await Acknowledgment.findById(id);
    if (acknowledgment) {
        acknowledgment.message = message;
        await acknowledgment.save();
        res.json({ success: true, acknowledgment });
        return;
    }
    res.json({ success: false, error: "Database error" });
});

const addMedia = asyncHandler(async (req, res) => {
    if (!res.locals.user.admin) {
        return res.json({ success: false, error: "Unauthorized" });
    }
    if (!req.file) {
        return res.json({ success: false, error: "Unable to upload file" });
    }
    const { id } = req.body;
    const acknowledgment = await Acknowledgment.findById(id);
    if (acknowledgment) {
        let { data: mediaUpload } = await axios.post(wassengerAPI_URL + "/files", {
            url: backendURL + "/uploads/" + req.file.filename,
            filename: req.file.originalname,
            expiration: "2y"
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": env.WASSENGER_TOKEN
            }
        });
        mediaUpload = mediaUpload[0];

        if (!mediaUpload) {
            return res.json({ success: false, error: "Unable to upload to wassenger" });
        }

        if (!mediaUpload.id) {
            return res.json({ success: false, error: mediaUpload.message || "Unable to upload to wassenger" });
        }
        acknowledgment.media.push({ filename: req.file.filename, selected: true, originalFilename: req.file.originalname, wassengerFileId: mediaUpload.id });
        await acknowledgment.save();
        res.json({ success: true, file: acknowledgment.media[acknowledgment.media.length - 1] });
        return;
    }
    res.json({ success: false, error: "Database error" });
});


const getSingleMedia = asyncHandler(async (req, res) => {
    if (!res.locals.user.admin) {
        return res.json({ success: false, error: "Unauthorized" });
    }
    const { docId, mediaId } = req.params;
    const acknowledgment = await Acknowledgment.findById(docId);
    if (acknowledgment) {
        let media = acknowledgment.media.find(e => e._id.toString() === mediaId);
        res.json({ success: true, file: media });
        return;
    }
    res.json({ success: false, error: "Database error" });
});

const deleteSingleMedia = asyncHandler(async (req, res) => {
    if (!res.locals.user.admin) {
        return res.json({ success: false, error: "Unauthorized" });
    }
    const { docId, mediaId } = req.params;
    const acknowledgment = await Acknowledgment.findById(docId);
    if (acknowledgment) {
        const { filename, wassengerFileId } = acknowledgment.media.find(e => e._id.toString() === mediaId);
        let { data: wassengerResponse } = await axios.delete(wassengerAPI_URL + "/files" + wassengerFileId, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": env.WASSENGER_TOKEN
            }
        });
        let media = acknowledgment.media.filter(e => e._id.toString() !== mediaId);
        acknowledgment.media = media;
        await acknowledgment.save();
        deleteUploadedFile(filename);
        if (wassengerResponse?.message) {
            return res.json({ success: false, error: wassengerResponse.message });
        }
        return res.json({ success: true });
    }
    res.json({ success: false, error: "Database error" });
});


module.exports = {
    getDonorAcknowledgment,
    updateAcknowledgmentMessage,
    addMedia,
    getSingleMedia,
    deleteSingleMedia,
};