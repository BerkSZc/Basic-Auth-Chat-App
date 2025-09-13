import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  const { fullName, username, password, gender } = req.body;
  try {
    if (!fullName || !username || !password || !gender) {
      return res.status(400).json({ message: "Provide all fields" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(404).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
    }

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
    });
  } catch (error) {
    console.log(`Error at signup controller: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    const isPasswordMatch = bcrypt.compare(password, user?.password);

    if (!user || !isPasswordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
    });
  } catch (error) {
    console.log(`Error at login controller: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("chat-token");
  res.status(200).json({ message: "Logged out successfully" });
};
