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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = express_1.default.Router();
// Отримати всіх користувачів (лише для адмінів)
router.get('/', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Запит до /api/users, userId:', req.userId); // Діагностика
        const user = yield userModel_1.default.findById(req.userId);
        if (!user || user.role !== 'admin') {
            res.status(403).json({ message: 'Доступ заборонено' });
            return;
        }
        const users = yield userModel_1.default.find().select('-password');
        console.log('Знайдені користувачі:', users); // Діагностика
        res.json(users);
    }
    catch (error) {
        console.error('Помилка в /api/users:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
}));
// Створити користувача (лише для адмінів)
router.post('/', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.userId);
        if (!user || user.role !== 'admin') {
            res.status(403).json({ message: 'Доступ заборонено' });
            return;
        }
        const { name, email, password, role } = req.body;
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Email вже використовується' });
            return;
        }
        if (!password) {
            res.status(400).json({ message: 'Пароль є обов’язковим' });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield userModel_1.default.create({ name, email, password: hashedPassword, role });
        const _a = newUser.toObject(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]);
        res.status(201).json(userWithoutPassword);
    }
    catch (error) {
        console.error('Помилка створення користувача:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
}));
// Оновити користувача (лише для адмінів)
router.put('/:_id', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.userId);
        if (!user || user.role !== 'admin') {
            res.status(403).json({ message: 'Доступ заборонено' });
            return;
        }
        const { name, email, role, password } = req.body;
        const updateData = { name, email, role };
        if (password) {
            updateData.password = yield bcryptjs_1.default.hash(password, 10);
        }
        const updatedUser = yield userModel_1.default.findByIdAndUpdate(req.params._id, updateData, {
            new: true,
        }).select('-password');
        if (!updatedUser) {
            res.status(404).json({ message: 'Користувача не знайдено' });
            return;
        }
        res.json(updatedUser);
    }
    catch (error) {
        console.error('Помилка оновлення користувача:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
}));
// Видалити користувача (лише для адмінів)
router.delete('/:id', authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.userId);
        if (!user || user.role !== 'admin') {
            res.status(403).json({ message: 'Доступ заборонено' });
            return;
        }
        const deletedUser = yield userModel_1.default.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            res.status(404).json({ message: 'Користувача не знайдено' });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        console.error('Помилка видалення користувача:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
}));
exports.default = router;
