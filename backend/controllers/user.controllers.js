import User from "../models/user.model.js";

export const getUsersSidebar = async (req, res) => {
  try {
    const { loggedInUserId } = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(`Error at getUsersSideBar controller: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};
