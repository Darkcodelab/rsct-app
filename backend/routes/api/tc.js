const router = require("express").Router();

// middlewares
const authorizeUser = require("../../middlewares/authorizeUser");

// controllers
const { createTC, downloadAllTCs, rangeDownloadTC, getTodaysTC, getTCById } = require("../../controllers/tcController");

// @route /api/tc/downloadAllTCs
// @method GET
router.get("/downloadAllTCs", authorizeUser, downloadAllTCs);

// @route /api/tc/rangeDownload
// @method GET
router.get("/rangeDownloadTC", authorizeUser, rangeDownloadTC);


// @route /api/tc/getTodaysTC
// @method GET
router.get("/getTodaysTC", authorizeUser, getTodaysTC);

// @route /api/tc/getTCById/:id
// @method GET
router.get("/getTCById/:id", authorizeUser, getTCById);

// @route /api/tc
// @method POST
router.post("/", authorizeUser, createTC);

module.exports = router;
