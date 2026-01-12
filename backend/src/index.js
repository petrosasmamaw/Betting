import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import usersRouter from './routes/users.js';
import betsRouter from './routes/bets.js';
import depositsRouter from './routes/deposits.js';
import withdrawalsRouter from './routes/withdrawals.js';
import balancesRouter from './routes/balances.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
	origin: (origin, callback) => callback(null, true),
	credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usersRouter);
app.use('/api/bets', betsRouter);
app.use('/api/deposits', depositsRouter);
app.use('/api/withdrawals', withdrawalsRouter);
app.use('/api/balances', balancesRouter);

app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

const mongoUri =  process.env.MONGO_URI ;

mongoose.connect(mongoUri)
	.then(() => console.log('✅ MongoDB connected'))
	.catch(err => {
		console.error('MongoDB connection error:', err);
		process.exit(1);
	});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
 