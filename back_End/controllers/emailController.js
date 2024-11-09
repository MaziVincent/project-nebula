
const emailService = require('../services/emailService')


const handleSendPin = async (req, res) => {
    const { email } = req.body;
    const response = await emailService.sendPin(email);
    if(response.error){
        return res.status(400).json({ error: response.message });
    }
    res.status(200).json(response);
}

module.exports = {
    handleSendPin
}