// backend/src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Токен не надано' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Помилка авторизації:', error);
    res.status(401).json({ message: 'Недійсний токен' });
  }
};

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
