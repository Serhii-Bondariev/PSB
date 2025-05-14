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
// backend/src/routes/authRoutes.ts
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const router = express_1.default.Router();
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'Користувача не знайдено' });
            return;
        }
        console.log('Знайдено користувача:', user);
        const isMatch = yield user.matchPassword(password);
        if (!isMatch) {
            res.status(400).json({ message: 'Невірний пароль' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        const responseUser = {
            id: user._id,
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
    }
    catch (error) {
        console.error('Помилка при логіні:', error);
        res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
});
const profileHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('Request headers:', req.headers);
    console.log('Request cookies:', req.cookies);
    const token = req.cookies.token || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
    if (!token) {
        res.status(401).json({ message: 'Токен не надано' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield userModel_1.default.findById(decoded.userId).select('-password');
        if (!user) {
            res.status(404).json({ message: 'Користувача не знайдено' });
            return;
        }
        const responseUser = {
            id: user._id,
            name: user.name,
            role: user.role,
        };
        res.json(responseUser);
    }
    catch (error) {
        console.error('Помилка верифікації токена:', error);
        res.status(401).json({ message: 'Недійсний токен' });
    }
});
router.get('/profile', profileHandler);
router.post('/login', loginHandler);
exports.default = router;
