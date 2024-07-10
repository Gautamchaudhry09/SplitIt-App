import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: {
    backgroundColor: { type: String, required: true },
    color: { type: String, required: true },
  },
  initials: { type: String, required: true },
});

const transactionSchema = new mongoose.Schema({
  friend: { type: friendSchema, required: true },
  amount: { type: Number, required: true },
});

const occasionSchema = new mongoose.Schema(
  {
    //   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    friends: [{ type: friendSchema, required: true }],
    transactions: [{ type: transactionSchema, required: false }],
  },
  { collection: "splitifyOccasions" }
);

export const Occasion = mongoose.model("Occasion", occasionSchema);
