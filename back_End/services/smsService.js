const axios = require("axios");
const User = require("../model/User");

const sendOTP = async (data) => {
  try {
    const user = await User.findOne({
      $or: [{ phone:data.phone }, { email:data.email }],
    }).exec();
    if (user) return { error: "Phone Number or Email already exist" };
    const unformated = data.phone.slice(1);
    const formated = `234${unformated}`;
    var payload = {
      to: formated,
      from: "N-Alert",
      message_type: "NUMERIC",
      channel: "dnd",
      api_key: process.env.TERMII_API_KEY,
      pin_length: 4,
      pin_placeholder: "< 1234 >",
      message_text:
        "Your Nebula RealEstate verification code is < 1234 >, it will expire in 5 minutes",
      pin_attempts: 3,
      pin_time_to_live: 5,
      pin_type: "NUMERIC",
    };
    const response = await axios.post(process.env.TERMII_SEND_OTP_URL, payload);

    return response.data;
  } catch (error) {
    console.error("Error sending SMS:", error.response?.data || error.message);
    throw new Error("Failed to send SMS");
  }
};

const sendCode = async (data) => {
  try {
    const user = await User.findOne({ phone: data.phone }).exec();
    if (!user) return { error: "Phone Number does not exist" };
    const unformated = data.phone.slice(1);
    const formated = `234${unformated}`;
    var payload = {
      to: formated,
      from: "N-Alert",
      message_type: "NUMERIC",
      channel: "dnd",
      api_key: process.env.TERMII_API_KEY,
      pin_length: 4,
      pin_placeholder: "< 1234 >",
      message_text:
        "Your Nebula RealEstate verification code is < 1234 >, it will expire in 5 minutes",
      pin_attempts: 3,
      pin_time_to_live: 5,
      pin_type: "NUMERIC",
    };
    const response = await axios.post(process.env.TERMII_SEND_OTP_URL, payload);

    return response.data;
  } catch (error) {
    console.error("Error sending SMS:", error.response?.data || error.message);
    throw new Error("Failed to send SMS");
  }
};

const verifyOTP = async (pin, pinId) => {
  try {
    var payload = {
      pin_id: pinId,
      pinId: pinId,
      pin: pin,
      api_key: process.env.TERMII_API_KEY,
    };

    const response = await axios.post(
      process.env.TERMII_VERIFY_OTP_URL,
      payload
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error Verifying token:",
      error.response?.data || error.message
    );
    throw new Error("Failed to verify token");
  }
};

module.exports = {
  sendOTP,
  sendCode,
  verifyOTP,
};
