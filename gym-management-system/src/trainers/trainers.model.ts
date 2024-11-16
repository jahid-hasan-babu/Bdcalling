import { Schema, model, Document } from "mongoose";

export interface ITrainer extends Document {
  name: string;
  email: string;
  password: string;
  specialization: "trainer";
}

const TrainerSchema = new Schema<ITrainer>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          // Simple email validation regex
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Invalid email format.",
      },
    },
    password: { type: String, required: true },
    specialization: { type: String, enum: ["trainer"], required: true },
  },
  { timestamps: true, versionKey: false }
);

TrainerSchema.index({ email: 1 }, { unique: true });

export default model<ITrainer>("Trainer", TrainerSchema);
