import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI as string)
.then(() => console.log(" Успішно підключено до MongoDB ✅"))
.catch((err) => console.error("❌ Помилка підключення до MongoDB", err));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000 || 5001;
app.listen(PORT, () => console.log(`Сервер працює на порту ${PORT} 🚀`));
