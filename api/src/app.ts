import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.route';
import carbonCreditRoutes from './routes/carbonCredit.routes';
import marketDataRoutes from './routes/marketData.route';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/carbon-credit-db';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use('/v1/auth', authRoutes);
app.use('/v1/carbon', carbonCreditRoutes);
app.use('/v1/market', marketDataRoutes);


export default app;
