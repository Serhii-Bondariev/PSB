"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/api/server.ts
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRoutes_1 = __importDefault(require("../routes/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use((0, cors_1.default)({
    origin: frontendUrl,
    credentials: true,
}));
app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Успішно підключено до MongoDB ✅'))
    .catch((err) => {
    console.error('❌ Помилка підключення до MongoDB', err);
    process.exit(1);
});
app.use('/api/auth', authRoutes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер працює на порту ${PORT} 🚀`));
