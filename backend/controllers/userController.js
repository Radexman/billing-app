import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// @desc   Register a new user
// @route  /api/users
// @access Public
export const registerUser = expressAsyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	// Validation
	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please include all fields');
	}

	// Find if user already exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalis user data');
	}
});

// @desc   Get current user
// @route  /api/users/me
// @access Private
export const getMe = expressAsyncHandler(async (req, res) => {
	const user = {
		id: req.user._id,
		email: req.user.email,
		name: req.user.name,
	};

	res.status(200).json(user);
});

// @desc   Login user
// @route  /api/users/login
// @access Public
export const loginUser = expressAsyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	// Check user and password match
	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid credentials');
	}
});

// Generate token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};
