import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.ATLAS_URI;

const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(String(connectionString!));

    console.log("Mongo Connected");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export { connectDb };
