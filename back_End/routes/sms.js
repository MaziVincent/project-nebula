const express = require("express");
const router = express.Router();
const smsController = require("../controllers/smsController")

router.route("/otp")
  .post(smsController.sendOTP)

router.route("/code")
  .post(smsController.sendCode);
  
  
router.route("/verifyotp")
   .post(smsController.verifyOTP)
  
module.exports = router

