const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.route("/login").post(authController.handleLogin);

router.route("/changepassword").put(userController.handleChangePassword);
module.exports = router;
