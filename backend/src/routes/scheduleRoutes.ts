// backend/src/routes/scheduleRoutes.ts
// backend/src/routes/scheduleRoutes.ts
import express, { Request, Response, Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import Schedule from '../models/scheduleModel';
import User from '../models/userModel';

const router: Router = express.Router();

// Інтерфейс для типізації тіла запиту
interface ScheduleRequestBody {
  sport: string;
  name: string;
  phone: string;
  email: string;
  trainer: string;
  location: string;
  schedule: { day: string; time: string }[];
  photo?: string;
  description?: string;
}

// Отримати всі розклади
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (error) {
    console.error('Помилка отримання розкладів:', error);
    res.status(500).json({ message: 'Помилка сервера', error: (error as Error).message });
  }
});

// Створити розклад (лише для адмінів)
router.post(
  '/',
  authMiddleware,
  async (req: Request<{}, {}, ScheduleRequestBody>, res: Response): Promise<void> => {
    try {
      const user = await User.findById(req.userId);
      if (!user || user.role !== 'admin') {
        res.status(403).json({ message: 'Доступ заборонено' });
        return;
      }

      // Валідація
      const { sport, name, phone, email, trainer, location, schedule } = req.body;
      if (!sport || !name || !phone || !email || !trainer || !location || !schedule) {
        res.status(400).json({ message: 'Усі обов’язкові поля мають бути заповнені' });
        return;
      }

      // Перевірка, чи існує тренер
      const trainerExists = await User.findById(trainer);
      if (!trainerExists) {
        res.status(400).json({ message: 'Тренер не знайдений' });
        return;
      }

      const newSchedule = new Schedule(req.body);
      await newSchedule.save();
      res.status(201).json(newSchedule);
    } catch (error) {
      console.error('Помилка створення розкладу:', error);
      res.status(500).json({ message: 'Помилка сервера', error: (error as Error).message });
    }
  }
);

// Оновити розклад (лише для адмінів)
router.put(
  '/:id',
  authMiddleware,
  async (req: Request<{ id: string }, {}, ScheduleRequestBody>, res: Response): Promise<void> => {
    try {
      const user = await User.findById(req.userId);
      if (!user || user.role !== 'admin') {
        res.status(403).json({ message: 'Доступ заборонено' });
        return;
      }

      // Валідація
      const { sport, name, phone, email, trainer, location, schedule: scheduleData } = req.body;
      if (!sport || !name || !phone || !email || !trainer || !location || !scheduleData) {
        res.status(400).json({ message: 'Усі обов’язкові поля мають бути заповнені' });
        return;
      }

      // Перевірка, чи існує тренер
      const trainerExists = await User.findById(trainer);
      if (!trainerExists) {
        res.status(400).json({ message: 'Тренер не знайдений' });
        return;
      }

      const updatedSchedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updatedSchedule) {
        res.status(404).json({ message: 'Розклад не знайдено' });
        return;
      }
      res.json(updatedSchedule);
    } catch (error) {
      console.error('Помилка оновлення розкладу:', error);
      res.status(500).json({ message: 'Помилка сервера', error: (error as Error).message });
    }
  }
);

// Видалити розклад (лише для адмінів)
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
      const schedule = await Schedule.findByIdAndDelete(req.params.id);
      if (!schedule) {
        res.status(404).json({ message: 'Розклад не знайдено' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error('Помилка видалення розкладу:', error);
      res.status(500).json({ message: 'Помилка сервера', error: (error as Error).message });
    }
  }
);

// Отримати тренерів
router.get('/trainers', async (req: Request, res: Response): Promise<void> => {
  try {
    const trainers = await User.find({ role: 'user' }).select('name');
    res.json(trainers.map((t) => ({ id: t._id, name: t.name })));
  } catch (error) {
    console.error('Помилка отримання тренерів:', error);
    res.status(500).json({ message: 'Помилка сервера', error: (error as Error).message });
  }
});

export default router;

// import express, { Request, Response, Router } from 'express';
// import { authMiddleware } from '../middleware/authMiddleware';
// import Schedule from '../models/scheduleModel';
// import User from '../models/userModel';

// const router: Router = express.Router();

// // Інтерфейс для типізації тіла запиту
// interface ScheduleRequestBody {
//   sport: string;
//   trainer: string;
//   location: string;
//   schedule: { day: string; time: string }[];
// }

// // Отримати всі розклади
// router.get('/', async (req: Request, res: Response): Promise<void> => {
//   try {
//     const schedules = await Schedule.find();
//     res.json(schedules);
//   } catch (error) {
//     console.error('Помилка отримання розкладів:', error);
//     res.status(500).json({ message: 'Помилка сервера' });
//   }
// });

// // Створити розклад (лише для адмінів)
// router.post(
//   '/',
//   authMiddleware,
//   async (req: Request<{}, {}, ScheduleRequestBody>, res: Response): Promise<void> => {
//     try {
//       const user = await User.findById(req.userId);
//       if (!user || user.role !== 'admin') {
//         res.status(403).json({ message: 'Доступ заборонено' });
//         return;
//       }
//       const schedule = new Schedule(req.body);
//       await schedule.save();
//       res.status(201).json(schedule);
//     } catch (error) {
//       console.error('Помилка створення розкладу:', error);
//       res.status(500).json({ message: 'Помилка сервера' });
//     }
//   }
// );

// // Оновити розклад (лише для адмінів)
// router.put(
//   '/:id',
//   authMiddleware,
//   async (req: Request<{ id: string }, {}, ScheduleRequestBody>, res: Response): Promise<void> => {
//     try {
//       const user = await User.findById(req.userId);
//       if (!user || user.role !== 'admin') {
//         res.status(403).json({ message: 'Доступ заборонено' });
//         return;
//       }
//       const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
//       if (!schedule) {
//         res.status(404).json({ message: 'Розклад не знайдено' });
//         return;
//       }
//       res.json(schedule);
//     } catch (error) {
//       console.error('Помилка оновлення розкладу:', error);
//       res.status(500).json({ message: 'Помилка сервера' });
//     }
//   }
// );

// // Видалити розклад (лише для адмінів)
// router.delete(
//   '/:id',
//   authMiddleware,
//   async (req: Request<{ id: string }>, res: Response): Promise<void> => {
//     try {
//       const user = await User.findById(req.userId);
//       if (!user || user.role !== 'admin') {
//         res.status(403).json({ message: 'Доступ заборонено' });
//         return;
//       }
//       const schedule = await Schedule.findByIdAndDelete(req.params.id);
//       if (!schedule) {
//         res.status(404).json({ message: 'Розклад не знайдено' });
//         return;
//       }
//       res.status(204).send();
//     } catch (error) {
//       console.error('Помилка видалення розкладу:', error);
//       res.status(500).json({ message: 'Помилка сервера' });
//     }
//   }
// );

// // Отримати тренерів
// router.get('/trainers', async (req: Request, res: Response): Promise<void> => {
//   try {
//     const trainers = await User.find({ role: 'user' }).select('name');
//     res.json(trainers.map((t) => ({ id: t._id, name: t.name })));
//   } catch (error) {
//     console.error('Помилка отримання тренерів:', error);
//     res.status(500).json({ message: 'Помилка сервера' });
//   }
// });

// export default router;
