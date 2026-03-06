import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

import usersRoute from './routes/usersRoute.js';
import betsRoute from './routes/betsRoute.js';
import depositsRoute from './routes/depositsRoute.js';
import withdrawalsRoute from './routes/withdrawalsRoute.js';
import balancesRoute from './routes/balancesRoute.js';
import authRoute from './routes/authRouter.js';
import footballRoute from './routes/footballRoute.js';

dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
	origin: [
		'http://localhost:5173',
		'http://localhost:5174',
		'https://secret-bet-cleint.vercel.app',
		'https://secret-bet-admin.vercel.app',
	],
	credentials: true,
};

// Enable CORS for all routes + preflight
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usersRoute);
app.use('/api/bets', betsRoute);
app.use('/api/deposits', depositsRoute);
app.use('/api/withdrawals', withdrawalsRoute);
app.use('/api/balances', balancesRoute);
app.use('/api/auth', authRoute);
app.use('/api/football', footballRoute);

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
 