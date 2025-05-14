// backend/src/routes/authRoutes.ts
import express, { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const router = express.Router();

interface LoginRequestBody {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    role: string;
  };
}

const loginHandler: RequestHandler<{}, LoginResponse, LoginRequestBody> = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Користувача не знайдено' });
      return;
    }

    console.log('Знайдено користувача:', user);

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(400).json({ message: 'Невірний пароль' });
      return;
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    const responseUser = {
      id: user._id as string,
      name: user.name,
      role: user.role,
    };

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 3600000,
    });

    res.json({ message: 'Успішний вхід', token, user: responseUser });
  } catch (error) {
    console.error('Помилка при логіні:', error);
    res.status(500).json({ message: 'Внутрішня помилка сервера' });
  }
};

const profileHandler: RequestHandler<{}, LoginResponse['user'] | { message: string }> = async (
  req,
  res
) => {
  console.log('Request headers:', req.headers);
  console.log('Request cookies:', req.cookies);
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Токен не надано' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string };
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      res.status(404).json({ message: 'Користувача не знайдено' });
      return;
    }

    const responseUser = {
      id: user._id as string,
      name: user.name,
      role: user.role,
    };

    res.json(responseUser);
  } catch (error) {
    console.error('Помилка верифікації токена:', error);
    res.status(401).json({ message: 'Недійсний токен' });
  }
};

router.get('/profile', profileHandler);
router.post('/login', loginHandler);

export default router;
