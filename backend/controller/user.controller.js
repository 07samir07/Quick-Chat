import User from "../models/user.model.js";

//SIGNED A NEW USER
export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;
  try {
    if (!fullName || !email || !password || !bio) {
      return res.json({ success: false, messsage: "Missing Details" });
    }
    const user = await User.create();
  } catch (error) {}
};
