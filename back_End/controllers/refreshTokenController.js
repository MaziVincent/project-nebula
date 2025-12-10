const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefresh = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.refreshToken) return res.sendStatus(401);
	const refreshToken = cookies.refreshToken;

	const foundUser = await User.findOne({ refreshToken }).exec();
	if (!foundUser) return res.sendStatus(403);

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, decoded) => {
		if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

		// Check token version for rotation
		if (decoded.tokenVersion !== foundUser.tokenVersion) {
			return res.sendStatus(403);
		}

		const roles = foundUser.type;

		// Create new access token
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

		// Rotate refresh token
		const newRefreshToken = jwt.sign(
			{
				email: foundUser.email,
				tokenVersion: foundUser.tokenVersion,
			},
			process.env.REFRESH_TOKEN,
			{ expiresIn: "7d" }
		);

		// Save new refresh token
		foundUser.refreshToken = newRefreshToken;
		await foundUser.save();

		// Send new refresh token in cookie
		res.cookie("refreshToken", newRefreshToken, {
			httpOnly: true,
			sameSite: "None",
			maxAge: 7 * 24 * 60 * 60 * 1000,
			domain: process.env.COOKIE_DOMAIN,
			secure: process.env.NODE_ENV === "production",
		});

		res.json({ accessToken, user: foundUser, roles });
	});
};

module.exports = { handleRefresh };
