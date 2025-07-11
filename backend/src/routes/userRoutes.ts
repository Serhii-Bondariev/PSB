import express, { Request, Response, Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';

const router: Router = express.Router();

// Інтерфейс для типізації тіла запиту
interface UserRequestBody {
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'moderator' | 'user';
}

// Отримати всіх користувачів (лише для адмінів)
router.get('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Запит до /api/users, userId:', req.userId); // Діагностика
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'admin') {
      res.status(403).json({ message: 'Доступ заборонено' });
      return;
    }
    const users = await User.find().select('-password');
    console.log('Знайдені користувачі:', users); // Діагностика
    res.json(users);
  } catch (error) {
    console.error('Помилка в /api/users:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// Створити користувача (лише для адмінів)
router.post(
  '/',
  authMiddleware,
  async (req: Request<{}, {}, UserRequestBody>, res: Response): Promise<void> => {
    try {
      const user = await User.findById(req.userId);
      if (!user || user.role !== 'admin') {
        res.status(403).json({ message: 'Доступ заборонено' });
        return;
      }
      const { name, email, password, role } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: 'Email вже використовується' });
        return;
      }
      if (!password) {
        res.status(400).json({ message: 'Пароль є обов’язковим' });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, email, password: hashedPassword, role });
      const { password: _, ...userWithoutPassword } = newUser.toObject();
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error('Помилка створення користувача:', error);
      res.status(500).json({ message: 'Помилка сервера' });
    }
  }
);

// Оновити користувача (лише для адмінів)
router.put(
  '/:_id',
  authMiddleware,
  async (req: Request<{ _id: string }, {}, UserRequestBody>, res: Response): Promise<void> => {
    try {
      const user = await User.findById(req.userId);
      if (!user || user.role !== 'admin') {
        res.status(403).json({ message: 'Доступ заборонено' });
        return;
      }
      const { name, email, role, password } = req.body;
      const updateData: Partial<UserRequestBody> = { name, email, role };
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }
      const updatedUser = await User.findByIdAndUpdate(req.params._id, updateData, {
        new: true,
      }).select('-password');
      if (!updatedUser) {
        res.status(404).json({ message: 'Користувача не знайдено' });
        return;
      }
      res.json(updatedUser);
    } catch (error) {
      console.error('Помилка оновлення користувача:', error);
      res.status(500).json({ message: 'Помилка сервера' });
    }
  }
);

// Видалити користувача (лише для адмінів)
router.delete(
  '/:id',
  authMiddleware,
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const user = await User.findById(req.userId);
      if (!user || user.role !== 'admin') {
        res.status(403).json({ message: 'Доступ заборонено' });
        return;
      }
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        res.status(404).json({ message: 'Користувача не знайдено' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error('Помилка видалення користувача:', error);
      res.status(500).json({ message: 'Помилка сервера' });
    }
  }
);

export default router;
