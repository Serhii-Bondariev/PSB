import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  avatar: { type: String },
  birthday: { type: Date },
  gender: { type: String },
  address:
        { postalCode: { type: String },
          country: { type: String },
          region: { type: String },
          city: { type: String },
          street: { type: String },
          building: { type: String },
          apartment: { type: String },
        },
  about: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'moderator', 'user'], default: 'user' }
});

const User = mongoose.model('User', UserSchema);
export default User;
