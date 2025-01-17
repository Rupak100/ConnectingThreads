import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helper/generateToken.js";
import { v2 as cloudinary } from "cloudinary";

//Registering the user -------------------->>>>>>>>>>>>>>-------------------
const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({
        error: "User already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        bio: newUser.bio,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({
        error: "Invalid user data",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
    console.log("Error in signup: ", error.message);
  }
};

//loginUSer ------------------->>>>>>

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const ishashedPassword = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !ishashedPassword) {
      return res.status(400).json({
        error: "Invalid username or password",
      });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
    console.log("Error in login: ", error.message);
  }
};

//Logout controller  ---------------->>>>>>>>>>>>>>>

const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logout successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
    console.log("Error in logout: ", error.message);
  }
};

///Following or Unfollowing user ------------------->>>>>>>>>>>>>>>>

const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);
    if (id === req.user._id.toString()) {
      return res.status(401).json({
        error: "You cannot follow or unfollow",
      });
    }
    if (!userToModify || !currentUser) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      //UnfollowUSer
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      return res.status(200).json({
        message: "user unfollowed successfully",
      });
    } else {
      //Follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      return res.status(200).json({
        message: "user followed successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
    console.log("Error in Follow and Unfollow : ", error.message);
  }
};

const updateUser = async (req, res) => {
  const { name, email, username, password, bio } = req.body;
  let { profilePic } = req.body;
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if (req.params.id !== userId.toString()) {
      return res.status(400).json({
        error: "You cant update others profile",
      });
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }
    if (profilePic) {
      if (user.profilePic) {
        await cloudinary.uploader.destroy(
          user.profilePic.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadedResponse.secure_url;
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;
    user = await user.save();

    // To ignore password
    user.password = null;

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
    console.log("Error in profile update: ", error.message);
  }
};

const getProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username })
      .select("-password")
      .select("updatedAt");
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
    console.log("Error in getting Your profile: ", error.message);
  }
};

export {
  signupUser,
  loginUser,
  logoutUser,
  followUnfollowUser,
  updateUser,
  getProfile,
};
