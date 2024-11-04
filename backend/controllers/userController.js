import expressAsyncHandler from 'express-async-handler';

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
	res.send('Redister Route');
});

// @desc   Login user
// @route  /api/users/login
// @access Public
export const loginUser = expressAsyncHandler(async (req, res) => {
	res.send('Login Route');
});
