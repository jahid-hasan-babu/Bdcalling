import ClassSchedule, { IClassSchedule } from "./class.model";

class ClassService {
  async createSchedule(data: IClassSchedule): Promise<IClassSchedule> {
    const { date, startTime, endTime, trainerId, trainees } = data;

    // Check if the provided timespan is exactly 2 hours
    const durationInMs =
      new Date(endTime).getTime() - new Date(startTime).getTime();
    const durationInHours = durationInMs / (1000 * 60 * 60);
    if (durationInHours !== 2) {
      throw new Error("Class schedule duration must be exactly 2 hours.");
    }

    // Count the number of classes already scheduled for this date
    const dateStart = new Date(date);
    dateStart.setHours(0, 0, 0, 0);
    const dateEnd = new Date(date);
    dateEnd.setHours(23, 59, 59, 999);

    const schedulesCount = await ClassSchedule.countDocuments({
      date: { $gte: dateStart, $lte: dateEnd },
    });
    if (schedulesCount >= 5) {
      throw new Error(
        "The maximum number of schedules (5) for this date has been reached."
      );
    }

    // Enforce maximum trainee limit
    if (trainees && trainees.length > 10) {
      throw new Error("A class cannot have more than 10 trainees.");
    }

    // Proceed to create the schedule
    const schedule = new ClassSchedule(data);
    return await schedule.save();
  }

  async updateSchedule(
    id: string,
    data: Partial<IClassSchedule>
  ): Promise<IClassSchedule | null> {
    const { startTime, endTime, trainees } = data;

    // Check if duration is exactly 2 hours if startTime or endTime is being updated
    if (startTime && endTime) {
      const durationInMs =
        new Date(endTime).getTime() - new Date(startTime).getTime();
      const durationInHours = durationInMs / (1000 * 60 * 60);
      if (durationInHours !== 2) {
        throw new Error("Class schedule duration must be exactly 2 hours.");
      }
    }

    // Enforce maximum trainee limit if trainees are being updated
    if (trainees && trainees.length > 10) {
      throw new Error("A class cannot have more than 10 trainees.");
    }

    // Proceed to update the schedule
    return await ClassSchedule.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteSchedule(id: string): Promise<IClassSchedule | null> {
    return await ClassSchedule.findByIdAndDelete(id);
  }

  async getClassesByUser(
    userId: string,
    userRole: string
  ): Promise<IClassSchedule[]> {
    if (!userId) {
      throw new Error("User is not authenticated");
    }

    if (userRole === "admin") {
      return await ClassSchedule.find();
    }

    return await ClassSchedule.find({
      $or: [{ trainerId: userId }, { trainees: userId }],
    });
  }

  async getScheduleById(id: string): Promise<IClassSchedule | null> {
    return await ClassSchedule.findById(id);
  }
}

export default new ClassService();
