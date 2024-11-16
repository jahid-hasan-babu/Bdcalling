import mongoose, { Document, Schema } from "mongoose";

export interface ISchedule extends Document {
  className: string;
  date: Date;
  timeSlot: string;
  maxSlots: number;
  bookedSlots: number;
  trainees: mongoose.Types.ObjectId[];
}

const scheduleSchema = new Schema<ISchedule>(
  {
    className: { type: String, required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    maxSlots: { type: Number, default: 10 },
    bookedSlots: { type: Number, default: 0 },
    trainees: [{ type: mongoose.Types.ObjectId, ref: "Trainee" }],
  },
  { timestamps: true, versionKey: false }
);

export const Schedule = mongoose.model<ISchedule>("Schedule", scheduleSchema);
