const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: "Username and password required" });
	}

	const foundUser = await User.findOne({ email: email }).exec();

	// console.log(foundUser)
	if (!foundUser) return res.sendStatus(401); // unAuthorized

	//evaluate password
	const match = await bcrypt.compare(password, foundUser.password);
	if (!match) return res.sendStatus(401); //UnAuthorized

	const roles = foundUser.type;

	//create jwt
	const accessToken = jwt.sign(
		{
			UserInfo: {
				email: foundUser.email,
				roles: roles,
			},
		},

		process.env.ACCESS_TOKEN,
		{ expiresIn: "15m" }
	);

	const refreshToken = jwt.sign(
		{
			email: foundUser.email,
			tokenVersion: foundUser.tokenVersion,
		},
		process.env.REFRESH_TOKEN,
		{ expiresIn: "7d" }
	);
	// saving the refreshtoken
	foundUser.refreshToken = refreshToken;

	const result = await foundUser.save();
	//    console.log(result)

	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		sameSite: "None",
		maxAge: 24 * 60 * 60 * 1000,
		secure: true,
	});

	res.json({ accessToken, user: foundUser, roles });
};

module.exports = { handleLogin };
