const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../config");
const Joi = require("joi");

const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      success: false,
      error: "Please include a valid email and password",
    });
    return;
  }
  if (!validator.isEmail(email) || !validator.isAlphanumeric(password)) {
  }
  email = email.toLowerCase();
  let existingUser = await User.findOne({ email });
  if (!existingUser) {
    res.status(401).json({ success: false, error: "User not registered" });
    return;
  }
  if (bcrypt.compareSync(password, existingUser.password)) {
    existingUser = existingUser.toObject();
    delete existingUser.password;
    delete existingUser.__v;

    const token = jwt.sign(existingUser, env.JWT_SECRET_KEY);
    res.json({ success: true, user: existingUser, token });
  } else {
    res.status(401).json({ success: false, error: "Invalid credentials" });
  }
});

const registerAdmin = asyncHandler(async (req, res) => {
  let { email, password, adminToken, name } = req.body;

  if (!email || !password || !adminToken) {
    res.status(400).json({
      success: false,
      error: "Please include: valid email, adminToken, and password",
    });
    return;
  }

  if (
    !validator.isEmail(email) ||
    !validator.isAlphanumeric(password) ||
    !validator.isAlphanumeric(adminToken)
  ) {
    res.status(400).json({
      success: false,
      error: "Please include: email, password, adminToken",
    });
    return;
  }
  if (adminToken !== env.ADMIN_TOKEN) {
    res.status(401).json({
      success: false,
      error: "Invalid Admin Token",
    });
    return;
  }
  email = email.toLowerCase();
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    if (existingUser._id) {
      return res.json({ success: false, error: "User already registered" });
    }
  }

  let user = await User.create({
    email,
    password: bcrypt.hashSync(password, 10),
    name,
    admin: true,
  });
  user = user.toObject();
  delete user.password;
  res.json({ success: true, user });
});

const verifyToken = asyncHandler(async (req, res) => {
  const token =
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[1];
  if (!token) {
    res.status(400).json({ success: false, error: "Unauthorized" });
  }
  const decoded = jwt.verify(token, env.JWT_SECRET_KEY);
  if (decoded._id) {
    let user = await User.findOne({ _id: decoded._id });
    if (user) {
      user = user.toObject();
      delete user.password, delete user.__v;

      res.json({ success: true, user });
      return;
    }
  }
  res.json({ success: false });
});

const createUser = asyncHandler(async (req, res) => {
  if (!res.locals.user) {
    res.status(401).json({ success: false, error: "Unauthorized" });
  }
  if (!res.locals.user.admin) {
    res.status(401).json({ success: false, error: "Unauthorized" });
  }
  let { email, password, name } = req.body;
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
  });
  email = email.toLowerCase();
  const value = await schema.validateAsync({ email, password, name });
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    if (existingUser._id) {
      res
        .status(400)
        .json({ success: false, error: "Email already registered" });
      return;
    }
  }
  value.password = bcrypt.hashSync(value.password, 10);
  const newUser = await User.create({
    ...value,
    createdBy: res.locals.user._id,
  });
  if (newUser) {
    res.json({ success: true, user: newUser });
    return;
  }
  return res.status(500).json({ success: false, error: "Database error" });
});

module.exports = {
  loginUser,
  registerAdmin,
  verifyToken,
  createUser,
};
