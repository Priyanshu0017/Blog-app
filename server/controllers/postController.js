const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const Author = require("../models/authorModel");
const Category = require("../models/categoriesModel");

// Create Post
const createPost = asyncHandler(async (req, res) => {
  const { title, content, author: authorId, category: categoryId, publishStatus } = req.body;
  if (!title || !content || !authorId || !categoryId) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Find if user exists
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(401);
    throw new Error("Invalid Request");
  }

  // Find Author and Category
  const author = await Author.findById(authorId);
  const category = await Category.findById(categoryId);

  if (!author || !category) {
    res.status(400);
    throw new Error("Invalid author or category");
  }

  const post = await Post.create({
    title,
    content,
    author: author._id,
    category: category._id,
    publishStatus,
  });
  res.status(201).json(post);
});

// Get All Posts
const getAllPosts = asyncHandler(async (req, res) => {
  // Find if user exists
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid Request");
  }

  const posts = await Post.find().populate("author category");
  res.status(200).json(posts);
});

// Get Single Post
const getPostById = asyncHandler(async (req, res) => {
  // Find if user exists
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid Request");
  }

  const post = await Post.findById(req.params.id).populate("author category");
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
  res.status(200).json(post);
});

// Update Post
const updatePost = asyncHandler(async (req, res) => {
  // Find if user exists
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid Request");
  }

  const { title, content, author, category, publishStatus } = req.body;
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { title, content, author, category, publishStatus },
    { new: true }
  );
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
  res.status(200).json(post);
});

// Delete Post
const deletePost = asyncHandler(async (req, res) => {
  // Find if user exists
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid Request");
  }

  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
  res.status(200).json({ message: "Post deleted" });
});

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
