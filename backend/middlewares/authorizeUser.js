const jwt = require("jsonwebtoken");
const env = require("../config");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const authorizeUser = asyncHandler(async (req, res, next) => {
  const token =
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[1];
  if (!token) {
    res.json({ success: false, error: "Unauthorized" });
    return;
  }
  const decoded = jwt.verify(token, env.JWT_SECRET_KEY);
  if (!decoded) {
    res.json({ success: false, error: "Unauthorized" });
  }
  if (!decoded._id) {
    res.json({ success: false, error: "Unauthorized" });
  }
  const user = await User.findOne({ _id: decoded._id });
  if (user) {
    res.locals.user = user;
    next();
  } else {
    res.json({ success: false, error: "Unauthorized" });
  }
});

module.exports = authorizeUser;
