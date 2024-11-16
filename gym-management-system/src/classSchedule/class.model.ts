import { Schema, model, Document } from "mongoose";

export interface IClassSchedule extends Document {
  trainerId: Schema.Types.ObjectId; // Reference to Trainer
  date: Date;
  startTime: Date;
  endTime: Date;
  trainees: Schema.Types.ObjectId[];
  maxTrainees?: number;
}

// Create the ClassSchedule schema
const ClassScheduleSchema = new Schema<IClassSchedule>(
  {
    trainerId: { type: Schema.Types.ObjectId, ref: "Trainer", required: true },
    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    trainees: [{ type: Schema.Types.ObjectId, ref: "User" }],
    maxTrainees: { type: Number, default: 10 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IClassSchedule>("ClassSchedule", ClassScheduleSchema);
