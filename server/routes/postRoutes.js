const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const protect = require("../middlewares/authMiddleware");

// Create Post
router.post("/",protect, createPost);

// Get All Posts
router.get("/",protect, getAllPosts);

// Get Single Post
router.get("/:id",protect, getPostById);

// Update Post
router.put("/:id",protect, updatePost);

// Delete Post
router.delete("/:id",protect, deletePost);

module.exports = router;