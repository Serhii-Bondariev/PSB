//backend/src/models/scheduleModel.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ISchedule extends Document {
  sport: string;
  name: string;
  phone: string;
  email: string;
  photo: string;
  description: string;
  trainer: string;
  location: string;
  schedule: { day: string; time: string }[];
}

const ScheduleSchema = new Schema<ISchedule>({
  sport: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  photo: { type: String, required: false },
  description: { type: String, required: false },
  trainer: { type: String, required: true },
  location: { type: String, required: true },

  schedule: [
    {
      day: { type: String, required: true },
      time: { type: String, required: true },
    },
  ],
});

export default mongoose.model<ISchedule>('Schedule', ScheduleSchema);
