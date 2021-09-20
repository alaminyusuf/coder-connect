const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { compare } = require("bcryptjs");
const { hashPassword } = require("../utils/hashPassword");
const {
	sendRefreshToken,
	createRefreshToken,
} = require("../utils/jwtFunctions");
const auth = require("../middleware/auth");
const { validateFields } = require("../utils/validationUtil");

/**
 * Get all users endpoint
 * @returns An array of all the users
 */
router.get("/users", async (req, res) => {
	const response = await User.find({}).select("-password");
	res.status(200).json({ response });
});

/**
 * Get single user by ID
 * @augments id
 */
router.get("/:id", async (req, res) => {
	const user = await User.findById(req.params.id).select("-password");
	res.status(200).json({ response: user });
});

/**
 * Create user endpoint
 * @augments name
 * @augments email
 * @augments password
 *
 * @returns A json with user's data
 */
router.post("/users", async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (user)
		return res.status(400).json({
			response: {
				success: false,
				statusCode: 400,
				info: "User already exists",
			},
		});

	const { name, email, password } = req.body;

	const err = validateFields(email, name, password);
	if (err) res.status(400).json({ err });
	const hashedPassword = await hashPassword(password);

	const input = {
		name,
		email,
		password: hashedPassword,
	};

	const newUser = await User.create(input);
	const token = createRefreshToken(newUser);
	sendRefreshToken(res, token);
	return res.json({ newUser });
});

/**
 * Login user endpoint
 * @augments email
 * @augments password
 *
 * @returns A json with user's data
 */
router.post("/user/login", async (req, res, next) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	try {
		if (!user) {
			res.status(400).json({
				response: {
					field: "email",
					statusCode: 400,
					info: "Could not find user",
				},
			});
		}

		const valid = await compare(password, user.password);

		if (!valid) {
			res.status(400).json({
				response: {
					field: "password",
					statusCode: 400,
					info: "Incorrect password",
				},
			});
		}
		const token = createRefreshToken(user);
		sendRefreshToken(res, token);

		return res.json({
			response: {
				status: "success",
				statusCode: 200,
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					token,
				},
			},
		});
	} catch (err) {
		next(err);
	}
});

/**
 * Check for user's authentication
 */
router.get("/user/auth", auth, async (req, res, next) => {
	const token = req.headers["x-auth-token"];
	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			return res.json({
				response: {
					status: "success",
					statusCode: 200,
					user: decoded,
				},
			});
		} catch (err) {
			next(err);
		}
	}
});
module.exports = router;
