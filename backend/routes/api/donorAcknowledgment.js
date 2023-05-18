const express = require("express");
const router = express.Router();
const upload = require("../../multer");

// middlewares
const authorizeUser = require("../../middlewares/authorizeUser");

// controllers
const {
    getDonorAcknowledgment,
    updateAcknowledgmentMessage,
    addMedia, getSingleMedia,
    deleteSingleMedia
} = require("../../controllers/acknowledgmentController");

// @route /api/donorAcknowledgment/
// @method GET
router.get("/", authorizeUser, getDonorAcknowledgment);

// @route /api/donorAcknowledgment/docId/mediaId
// @method GET
router.get("/getSingleMedia/:docId/:mediaId", authorizeUser, getSingleMedia);

// @route /api/donorAcknowledgment/docId/mediaId
// @method DELETE
router.delete("/getSingleMedia/:docId/:mediaId", authorizeUser, deleteSingleMedia);

// @route /api/donorAcknowledgment/updateMessage
// @method POST
router.post("/updateMessage", authorizeUser, updateAcknowledgmentMessage);

// @route /api/donorAcknowledgment/addMedia
// @method POST
router.post("/addMedia", authorizeUser, upload.single("uploadedFile"), addMedia);

module.exports = router;