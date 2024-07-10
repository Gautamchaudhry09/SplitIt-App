import { Occasion } from "../models/Occasion.js";

export const OccasionController = {
  saveOccasion: async (req, res) => {
    try {
      const { username, name, friends, transactions } = req.body;
      const newOccasion = new Occasion({
        username: username,
        name: name,
        friends: friends,
        transactions: transactions,
      });
      await newOccasion.save();
      return res
        .status(200)
        .json({ message: `${name} Occasion Saved Successfully`, newOccasion });
    } catch (error) {
      console.error("Error Saving Occasion", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  findOccasions: async (req, res) => {
    try {
      const { username } = req.body;
      const occasions = await Occasion.find({ username: username });
      return res.status(200).json({ occasions });
    } catch (error) {
      console.error("Error fetching occasions", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  deleteOccasion: async (req, res) => {
    try {
      const { _id } = req.body;
      // const occasion_Id = new OccasionId(_id);
      const occasions = await Occasion.findByIdAndDelete(_id);
      return res.status(200).json(occasions);
    } catch (error) {
      console.error("Error deleting occasion", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
