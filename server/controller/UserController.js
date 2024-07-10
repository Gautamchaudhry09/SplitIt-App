import { User } from "../models/User.js";

export const UserController = {
  addUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      let exist = await User.findOne({ name: username });
      if (exist) {
        return res.status(404).json({ message: "user already exists" });
      }
      const newUser = new User({ name: username, password: password });
      await newUser.save();
      return res
        .status(200)
        .json({ message: "User Registered Successfully", newUser });
    } catch (error) {
      console.error("Error Registering user", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  findUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      //check if user exists
      const user = await User.findOne({ name: username });
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found, Please Register First!" });
      }
      //Validate password
      if (password !== user.password) {
        return res.status(404).json({ message: "Invalid password" });
      }
      //password is correct
      return res.status(200).json({ message: "Login successfull", user });
    } catch (error) {
      console.error("Error logging in user", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
