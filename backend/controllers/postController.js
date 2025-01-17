import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        error: "Post not found",
      });
    }
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
    console.log("Error in creatingPost: ", error.message);
  }
};
const createPost = async (req, res) => {
  try {
    const { postedBy, text } = req.body;
    let { img } = req.body;
    if (!postedBy || !text) {
      return res.status(400).json({
        error: "Posted By and text fields are required",
      });
    }
    const user = await User.findById(postedBy);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }
    const maxLength = 500;
    if (text.length > 500) {
      return res.status(400).json({
        error: `Text must be less than ${maxLength} characters`,
      });
    }
    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }
    const newPost = new Post({ postedBy, text, img });
    await newPost.save();
    res.status(201).json({
      message: "Post created successfully",
      newPost,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
    console.log("Error in creatingPost: ", error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        error: "Post not found",
      });
    }
    if (post.postedBy.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        error: "Unauthorized to delete the post",
      });
    }
    await Post.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
    console.log("Error in deletingPost: ", error.message);
  }
};
const likeOrUnlike = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        error: "Post not found",
      });
    }
    const userLikedPost = post.likes.includes(userId);
    if (userLikedPost) {
      //Unlike Post
      await Post.updateOne({ _id: userId }, { $pull: { likes: userId } });
      res.status(200).json({
        message: "Post unliked successfully",
      });
    } else {
      //Like Post
      post.likes.push(userId);
      res.status(200).json({
        message: "Post liked successfully",
      });
    }
  } catch (error) {
    return res.status(404).json({
      error: "Post not found",
    });
  }
};
const replyToPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    const userProfilePic = req.user.userProfilePic;
    const username = req.user.username;
    if (!text) {
      return res.status(400).json({
        error: "Text field is required",
      });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({
        error: "Post not found",
      });
    }
    const reply = { userId, text, userProfilePic, username };
    post.replies.push(reply);
    res.status(200).json({
      message: "Reply added successfully",
      post,
    });
    await post.save();
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
    console.log("Error in replying to post: ", error.message);
  }
};

const getFeed = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    const following = user.following;
    const feedPosts = await Post.find({
      postedBy: { $in: following },
    }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      message: "Feed featched successfully",
      feedPosts,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
    console.log("Error in getting the feed: ", error.message);
  }
};

export { createPost, getPost, deletePost, likeOrUnlike, replyToPost, getFeed };
