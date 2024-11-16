import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "admin" | "trainer" | "trainee";
  comparePassword(password: string): Promise<boolean>;
}

// Create the User schema
const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
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
    role: {
      type: String,
      enum: ["admin", "trainer", "trainee"],
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// Hash the password before saving the user document
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Export the model with the correct typing
export default model<IUser>("User", UserSchema);
