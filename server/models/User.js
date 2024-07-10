import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "splitifyUsers" }
);

export const User = mongoose.model("user", userSchema);
