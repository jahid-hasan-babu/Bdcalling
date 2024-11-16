import Trainer, { ITrainer } from "../trainers/trainers.model";
import jwt from "jsonwebtoken";

class TrainerService {
  static async createTrainer(data: {
    name: string;
    email: string;
    password: string;
    specialization: string;
  }): Promise<ITrainer> {
    try {
      const trainer = new Trainer(data);
      return await trainer.save();
    } catch (error: any) {
      if (error.code === 11000 && error.keyPattern?.email) {
        throw new Error("Email already exists.");
      }
      throw error;
    }
  }

  static async login(email: string, password: string): Promise<string | null> {
    const trainer = await Trainer.findOne({ email });

    if (trainer && trainer.password === password) {
      // Directly compare the password
      const token = jwt.sign(
        { id: trainer._id, role: "trainer" },
        process.env.JWT_SECRET!,
        {
          expiresIn: "12h", // Token expiry time
        }
      );
      return token;
    }

    return null; // Return null if login fails
  }

  // Get all trainers
  static async getAllTrainers(): Promise<ITrainer[]> {
    return await Trainer.find(); // You can add .select() to exclude fields if needed
  }

  // Get one trainer by ID
  static async getTrainerById(id: string): Promise<ITrainer | null> {
    return await Trainer.findById(id);
  }

  // Update a trainer by ID
  static async updateTrainer(
    id: string,
    data: Partial<ITrainer>
  ): Promise<ITrainer | null> {
    return await Trainer.findByIdAndUpdate(id, data, { new: true });
  }

  // Delete a trainer by ID
  static async deleteTrainer(id: string): Promise<ITrainer | null> {
    return await Trainer.findByIdAndDelete(id);
  }
}

export default TrainerService;
