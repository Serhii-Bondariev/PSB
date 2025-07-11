"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/scheduleRoutes.ts
// backend/src/routes/scheduleRoutes.ts
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const scheduleModel_1 = __importDefault(require("../models/scheduleModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const router = express_1.default.Router();
// Отримати всі розклади
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedules = yield scheduleModel_1.default.find();
        res.json(schedules);
    }
    catch (error) {
        console.error('Помилка отримання розкладів:', error);
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
}));
// Створити розклад (лише для адмінів)
router.post('/', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.userId);
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
        const trainerExists = yield userModel_1.default.findById(trainer);
        if (!trainerExists) {
            res.status(400).json({ message: 'Тренер не знайдений' });
            return;
        }
        const newSchedule = new scheduleModel_1.default(req.body);
        yield newSchedule.save();
        res.status(201).json(newSchedule);
    }
    catch (error) {
        console.error('Помилка створення розкладу:', error);
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
}));
// Оновити розклад (лише для адмінів)
router.put('/:id', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.userId);
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
        const trainerExists = yield userModel_1.default.findById(trainer);
        if (!trainerExists) {
            res.status(400).json({ message: 'Тренер не знайдений' });
            return;
        }
        const updatedSchedule = yield scheduleModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedSchedule) {
            res.status(404).json({ message: 'Розклад не знайдено' });
            return;
        }
        res.json(updatedSchedule);
    }
    catch (error) {
        console.error('Помилка оновлення розкладу:', error);
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
}));
// Видалити розклад (лише для адмінів)
router.delete('/:id', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.userId);
        if (!user || user.role !== 'admin') {
            res.status(403).json({ message: 'Доступ заборонено' });
            return;
        }
        const schedule = yield scheduleModel_1.default.findByIdAndDelete(req.params.id);
        if (!schedule) {
            res.status(404).json({ message: 'Розклад не знайдено' });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        console.error('Помилка видалення розкладу:', error);
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
}));
// Отримати тренерів
router.get('/trainers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainers = yield userModel_1.default.find({ role: 'user' }).select('name');
        res.json(trainers.map((t) => ({ id: t._id, name: t.name })));
    }
    catch (error) {
        console.error('Помилка отримання тренерів:', error);
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
}));
exports.default = router;
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
