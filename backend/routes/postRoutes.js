import express from "express";
import protectRoute from "../middlewires/protectRoute.js";
import {
  createPost,
  getPost,
  deletePost,
  likeOrUnlike,
  replyToPost,
  getFeedPosts,
  getUserPosts,
} from "../controllers/postController.js";
const router = express.Router();

router.get("/feed", protectRoute, getFeedPosts);
router.get("/:postid", getPost);
router.get("/user/:username", getUserPosts);
router.delete("/delete/:id", protectRoute, deletePost);
router.post("/create", protectRoute, createPost);
router.post("/likeOrUnlike/:id", protectRoute, likeOrUnlike);
router.post("/reply/:id", protectRoute, replyToPost);
export default router;
