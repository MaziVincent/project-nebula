
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const userService = require('../services/userService');


const transporter = nodemailer.createTransport({
  service: 'zoho',
  auth: {
    user: 'info@megatechrealestate.ng',
    pass: 'mega64797'
  }
});

const sendPin = async (email) => {

    const user = await userService.userExists(email);
    if(!user || user.error){
        return {error: true, message: "User does not exist"};
    }

    //generate pin
    const pin = crypto.randomInt(1000, 9999).toString();
    const mailOptions = {
        from: 'info@megatechrealestate.ng',
        to: email,
        subject: 'Verification Pin',
        text: `Your Verification pin is ${pin}`
    };

    try{
        await transporter.sendMail(mailOptions);
        return {error: false, message: "Pin sent successfully", pin: pin};

    }catch(err){
        return {error: true, message: err.message };
    }


}


module.exports = {sendPin};

