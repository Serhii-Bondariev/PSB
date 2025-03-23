// backend/src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { AuthRequest } from '../../types/express';

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

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
    res.status(500).json({ message: 'Помилка сервера' });
  }
};


// **Логін користувача**
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ message: 'Невірний email або пароль' });
      return;
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
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
    res.status(500).json({ message: 'Помилка сервера' });
  }
};
