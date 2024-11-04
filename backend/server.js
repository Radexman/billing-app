import express from 'express';
import dotenv from 'dotenv';
import router from './routes/userRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
	res.status(201).json({ message: 'Hello World' });
});

// Routes
app.use('/api/users', router);

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});
