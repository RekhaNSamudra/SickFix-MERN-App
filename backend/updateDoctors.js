import mongoose from "mongoose";
import dotenv from "dotenv";
import doctorModel from "./models/doctorModels.js";

dotenv.config();

const updateDoctors = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/sickfix`);

    console.log("Connected to MongoDB");

    // Log documents missing the "available" field
    const missingAvailable = await doctorModel.find({ available: { $exists: false } });
    console.log("Documents missing 'available':", missingAvailable.length);

    // Update documents missing the "available" field
    const result = await doctorModel.updateMany(
      { available: { $exists: false } },
      { $set: { available: true } }
    );
    console.log(`Updated ${result.modifiedCount} documents.`);
  } catch (error) {
    console.error("Error updating doctors:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

updateDoctors();
