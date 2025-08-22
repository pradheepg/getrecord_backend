import dotenv from "dotenv";
dotenv.config(); 

export const config = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/test",
  JWT_SECRET: process.env.JWT_SECRET || "default_secret"
};
