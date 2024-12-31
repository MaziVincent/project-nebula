const smsService = require("../services/smsService");

const sendOTP = async (req, res) => {
  const { phone, email } = req.body;
  if (!phone)
    return res.status(400).json({ message: "Phone number is required" });
  if (!email) return res.status(400).json({ message: "Email is required" });
  try {
    const data = { phone, email };
    const response = await smsService.sendOTP(data);
    if (response.error)
      return res.status(409).json({ message: response.error });

    res.status(200).json({ response });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

//
const sendCode = async (req, res) => {
  const { phone } = req.body;
  if (!phone)
    return res.status(400).json({ message: "Phone number is required" });

  try {
    const data = { phone };
    const response = await smsService.sendCode(data);
    if (response.error)
      return res.status(409).json({ message: response.error });

    res.status(200).json({ response });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const verifyOTP = async (req, res) => {
  const { pin, pinId } = req.body;
  if (!pin || !pinId)
    return res.status(400).json({ message: "Pin and PinId is required" });

  try {
    const response = await smsService.verifyOTP(pin, pinId);
    res.status(200).json({ response });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  sendOTP,
  sendCode,
  verifyOTP,
};
