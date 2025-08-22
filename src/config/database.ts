import mongoose from "mongoose";
import {config} from "../config/config";


export const connectDB = async () => {  
  try {
    await mongoose.connect(config.mongoURI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
