// backend/src/models/userModel.ts
// backend/src/models/userModel.ts
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  birthday?: Date;
  gender?: string;
  address?: {
    postalCode?: string;
    country?: string;
    region?: string;
    city?: string;
    street?: string;
    building?: string;
    apartment?: string;
  };
  about?: string;
  password: string;
  role: 'admin' | 'moderator' | 'user';
  matchPassword(enteredPassword: string): Promise<boolean>; // Додайте метод matchPassword до інтерфейсу
}

// Модель користувача
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  avatar: { type: String },
  birthday: { type: Date },
  gender: { type: String },
  address: {
    postalCode: { type: String },
    country: { type: String },
    region: { type: String },
    city: { type: String },
    street: { type: String },
    building: { type: String },
    apartment: { type: String },
  },
  about: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'moderator', 'user'], default: 'user' },
});

// Хешування пароля перед збереженням
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Метод для порівняння пароля
UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
