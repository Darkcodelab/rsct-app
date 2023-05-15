const asyncHandler = require("express-async-handler");
const Joi = require("joi");
const dayjs = require("dayjs");

// models
const TC = require("../models/TC");

// utils
const sanitizeTC = require("../utils/sanitizeTC");

const createTC = asyncHandler(async (req, res) => {
  const tcObj = {
    donorName: req.body.donorName,
    phoneNumber: req.body.phoneNumber,
    followUpDate: req.body.followUpDate,
    note: req.body.note,
  };
  const schema = Joi.object({
    donorName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    followUpDate: Joi.date().required(),
    note: Joi.string().optional().allow(null).empty("").default(""),
  });
  const value = await schema.validateAsync(tcObj);
  value.createdBy = res.locals.user._id;
  const newTC = await TC.create(value);
  if (newTC) {
    res.json({ success: true, tc: newTC });
    return;
  }
  res.status(500).json({ success: false, error: "Database error" });
});

const downloadAllTCs = asyncHandler(async (req, res) => {
  if (!res.locals.user._id) {
    res.json({ success: false, error: "Unauthorized" });
    return;
  }
  let allTCs = await TC.find().populate("createdBy", "name").lean();
  if (allTCs) {
    allTCs = sanitizeTC(allTCs);

    res.json({ success: true, tc: allTCs });
    return;
  }
  res.json({ success: false, error: "Database error" });
});

const rangeDownloadTC = asyncHandler(async (req, res) => {
  if (!res.locals.user._id) {
    res.json({ success: false, error: "Unauthorized" });
    return;
  }
  const { start_date, end_date } = req.query;
  let rangeTCs = await TC.find({
    createdAt: { $gte: new Date(start_date), $lte: new Date(end_date) }
  }).populate("createdBy", "name").lean();
  if (rangeTCs) {
    rangeTCs = sanitizeTC(rangeTCs);
    res.json({ success: true, tc: rangeTCs });
    return;
  }
  res.json({ success: false, error: "Database error" });
});

const getTodaysTC = asyncHandler(async (req, res) => {
  if (!res.locals.user._id) {
    res.json({ success: false, error: "Unauthorized" });
    return;
  }

  const today = dayjs().startOf("day");

  let todayTCs = await TC.find({
    followUpDate: {
      $gte: today.toDate(),
      $lt: dayjs(today).endOf("day").toDate()
    }
  }).populate("createdBy", "name").lean();

  if (todayTCs) {
    todayTCs = sanitizeTC(todayTCs);
    res.json({ success: true, tc: todayTCs });
    return;
  }
  res.json({ success: false, error: "Database error" });
});

const getTCById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let tcFromDB = await TC.findById(id).populate("createdBy", "name").lean();
  if (tcFromDB) {
    tcFromDB = sanitizeTC([tcFromDB]);
    res.json({ success: true, tc: tcFromDB });
    return;
  }
  res.json({ success: false, error: "Database error" });
});

const getTCByUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let tcFromDB = await TC.find({ createdBy: id }).populate("createdBy", "name").lean();
  if (tcFromDB) {
    tcFromDB = sanitizeTC(tcFromDB);
    res.json({ success: true, tc: tcFromDB });
    return;
  }
  res.json({ success: false, error: "Database error" });
});

const getRecentActivity = asyncHandler(async (req, res) => {
  const today = dayjs().startOf("day");
  let tcFromDB = await TC.find({ createdAt: { $gte: today.toDate() } }).populate("createdBy", "name").lean();
  if (tcFromDB) {
    tcFromDB = sanitizeTC(tcFromDB);
    res.json({ success: true, tc: tcFromDB });
    return;
  }
  res.json({ success: false, error: "Database error" });
});

module.exports = {
  createTC,
  downloadAllTCs,
  rangeDownloadTC,
  getTodaysTC,
  getTCById,
  getTCByUser,
  getRecentActivity,
};
