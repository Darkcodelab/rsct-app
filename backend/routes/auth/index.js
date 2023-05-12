const router = require("express").Router();

// controllers
const {
  loginUser,
  registerAdmin,
  verifyToken,
  createUser,
} = require("../../controllers/authController.js");

// middlewares
const authorizeUser = require("../../middlewares/authorizeUser.js");

// @method POST
// @route /auth/login
router.post("/login", loginUser);

// @method POST
// @route /auth/registerAdmin
router.post("/registerAdmin", registerAdmin);

// @method GET
// @route /auth/verifyToken
router.get("/verifyToken", verifyToken);

// @method POST
// @route /auth/createUser
router.post("/createUser", authorizeUser, createUser);

module.exports = router;
