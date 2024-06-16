import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  followUnfollowUser,
  updateUser,
  getProfile,
} from "../controllers/userController.js";
import protectRoute from "../middlewires/protectRoute.js";
const router = express.Router();
//GET requests
router.get("/profile/:username", getProfile);

//POST requests
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnfollowUser);
router.put("/update/:id", protectRoute, updateUser);
export default router;
