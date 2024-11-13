import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import router from './routes/userRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Conect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.status(201).json({ message: 'Hello World' });
});

// Routes
app.use('/api/users', router);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});
