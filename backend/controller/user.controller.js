import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

//SIGNED A NEW USER
export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;
  try {
    if (!fullName || !email || !password || !bio) {
      return res.json({ success: false, message: "Missing Details" });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.json({ success: false, message: "Account already exists" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName: fullName,
      email: email,
      password: hashedPassword,
      bio: bio,
    });
    const token = generateToken(newUser._id);

    res.json({
      success: true,
      user: newUser,
      token,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//LOGIN  A USER
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid credentitals" });
    }
    const token = generateToken(userData._id);
    res.json({
      success: true,
      user: userData,
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//CONTROLLER TO CHECK IF USER IS AUTHENTICATED
export const checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
};

//CONTROLLER TO UPDATE USER PROFILE DETAILS
export const updatedProfile = async (req, res) => {
  try {
    const { bio, fullName } = req.body;
    const userId = req.user._id;

    let updateData = { bio, fullName };

    // Agar file aayi hai (multer se)
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "chat-app-profiles",
      });

      updateData.profilePic = result.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
