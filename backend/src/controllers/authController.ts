// backend/src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { AuthRequest } from '../../types/express';

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Логування отриманих даних
    console.log('Запит на логін: ', req.body);

    const user = await User.findOne({ email });
    if (!user) {
      console.log('Користувач не знайдений за email: ', email);
      return res.status(401).json({ message: 'Користувача не знайдено' });
    }

    // Порівняння пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Невірний пароль для користувача: ', email);
      return res.status(401).json({ message: 'Невірний пароль' });
    }

    // Генерація токену
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log('Успішний вхід для користувача: ', email);
    return res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    console.error('Помилка при логіні: ', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

// **Реєстрація користувача**
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: 'Email вже використовується' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });

    res.status(201).json({ message: 'Користувач створений', user: newUser });
  } catch (error) {
    console.error('Помилка при реєстрації: ', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: 'Неавторизовано' });
      return;
    }
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      res.status(404).json({ message: 'Користувача не знайдено' });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error('Помилка при отриманні профілю: ', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};
