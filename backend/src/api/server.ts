// backend/src/api/index.ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from '../routes/authRoutes';

dotenv.config();

const app = express();

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);

// Підключення до MongoDB для Vercel (без локального запуску)
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('Успішно підключено до MongoDB ✅'))
  .catch((err) => console.error('❌ Помилка підключення до MongoDB', err));

export default app; // Експорт для Vercel
