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
exports.getProfile = exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Логування отриманих даних
        console.log('Запит на логін: ', req.body);
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            console.log('Користувач не знайдений за email: ', email);
            return res.status(401).json({ message: 'Користувача не знайдено' });
        }
        // Порівняння пароля
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            console.log('Невірний пароль для користувача: ', email);
            return res.status(401).json({ message: 'Невірний пароль' });
        }
        // Генерація токену
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, JWT_SECRET, {
            expiresIn: '1h',
        });
        console.log('Успішний вхід для користувача: ', email);
        return res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
    }
    catch (error) {
        console.error('Помилка при логіні: ', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
});
exports.login = login;
// **Реєстрація користувача**
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Email вже використовується' });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield userModel_1.default.create({ name, email, password: hashedPassword, role });
        res.status(201).json({ message: 'Користувач створений', user: newUser });
    }
    catch (error) {
        console.error('Помилка при реєстрації: ', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
});
exports.register = register;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Неавторизовано' });
            return;
        }
        const user = yield userModel_1.default.findById(req.userId).select('-password');
        if (!user) {
            res.status(404).json({ message: 'Користувача не знайдено' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        console.error('Помилка при отриманні профілю: ', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
});
exports.getProfile = getProfile;
