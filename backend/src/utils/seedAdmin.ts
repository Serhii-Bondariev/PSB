import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/UserModel';

dotenv.config();

const seedAdminAndModerator = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    const existingAdmin = await User.findOne({ email: 'admin@sport.com' });
    const existingModerator = await User.findOne({ email: 'mod1@sport.com' });

    if (!existingAdmin) {
      const admin = new User({
        name: 'Admin',
        email: 'admin@sport.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
      });
      await admin.save();
      console.log('✅ Адміністратор доданий');
    } else {
      console.log('⚠️ Адміністратор вже існує');
    }

    if (!existingModerator) {
      const moderator = new User({
        name: 'Moderator',
        email: 'mod1@sport.com',
        password: await bcrypt.hash('mod123', 10),
        role: 'moderator',
      });
      await moderator.save();
      console.log('✅ Модератор доданий');
    } else {
      console.log('⚠️ Модератор вже існує');
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Помилка при додаванні користувачів:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedAdminAndModerator();
