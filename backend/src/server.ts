// backend/src/server.ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';

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

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('Успішно підключено до MongoDB ✅'))
  .catch((err) => {
    console.error('❌ Помилка підключення до MongoDB', err);
    process.exit(1);
  });

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер працює на порту ${PORT} 🚀`));
