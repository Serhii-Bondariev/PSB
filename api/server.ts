// backend/src/server.ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './../backend/src/routes/authRoutes'; // Оновлений шлях
import { VercelRequest, VercelResponse } from '@vercel/node';

dotenv.config();

const app = express();

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Підключення до MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('Успішно підключено до MongoDB ✅'))
  .catch((err) => {
    console.error('❌ Помилка підключення до MongoDB', err);
    process.exit(1);
  });

app.use('/api/auth', authRoutes);

// Експорт для Vercel
export default (req: VercelRequest, res: VercelResponse) => {
  app(req, res);
};