"use strict";
// backend/src/middleware/authMiddleware.ts
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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Токен не надано' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        console.error('Помилка авторизації:', error);
        res.status(401).json({ message: 'Недійсний токен' });
    }
});
exports.authMiddleware = authMiddleware;
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';
// export interface AuthRequest extends Request {
//   userId?: string;
// }
// export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) {
//     res.status(401).json({ message: 'Немає доступу' });
//     return;
//   }
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
//     req.userId = decoded.id;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Недійсний токен' });
//   }
// };
