const asyncHandler = require("express-async-handler");
const Joi = require("joi");
const dayjs = require("dayjs");

// models
const TC = require("../models/TC");

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
    allTCs = allTCs.map((tc) => {
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
    rangeTCs = rangeTCs.map((tc) => {
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
    todayTCs = todayTCs.map(tc => {
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
    res.json({ success: true, tc: todayTCs });
    return;
  }
  res.json({ success: false, error: "Database error" });
});

const getTCById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let tcFromDB = await TC.findById(id).populate("createdBy", "name").lean();
  if (tcFromDB) {
    tcFromDB = [tcFromDB].map(tc => {
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
  getTCById
};
