import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.2tw5hy6.mongodb.net/?retryWrites=true&w=majority`;
export const Connection = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Database connected Successfully");
  } catch (error) {
    console.log("error connecting to database", error.message);
  }
};
