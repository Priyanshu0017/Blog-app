const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const Author = require("../models/authorModel");
const Category = require("../models/categoriesModel");

// Blog Posts
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate("author category");
  res.json(posts);
});
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json({ message: "Post deleted" });
});

// Authors
const getAllAuthors = asyncHandler(async (req, res) => {
  const authors = await Author.find();
  res.json(authors);
});
const updateAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!author) return res.status(404).json({ message: "Author not found" });
  res.json(author);
});
const deleteAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findByIdAndDelete(req.params.id);
  if (!author) return res.status(404).json({ message: "Author not found" });
  res.json({ message: "Author deleted" });
});

// Categories
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.json(category);
});
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.json({ message: "Category deleted" });
});

module.exports = {
  getAllPosts,
  updatePost,
  deletePost,
  getAllAuthors,
  updateAuthor,
  deleteAuthor,
  getAllCategories,
  updateCategory,
  deleteCategory,
};