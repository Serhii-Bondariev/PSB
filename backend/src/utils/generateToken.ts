// import jwt from 'jsonwebtoken';

// interface TokenPayload {
//   id: string;
// }

// export const generateToken = (id: string): string => {
//   if (!process.env.JWT_SECRET) {
//     throw new Error('JWT_SECRET is not defined');
//   }

//   return jwt.sign({ id } as TokenPayload, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });
// };
