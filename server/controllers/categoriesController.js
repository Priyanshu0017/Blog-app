const asyncHandler = require("express-async-handler");
const Category = require("../models/categoriesModel");
const User = require("../models/userModel");

// Create Category
const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  // Find if user exists
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid Request");
  }

  if (!name) {
    res.status(400);
    throw new Error("Name is required");
  }

  const category = await Category.create({ name, description });
  res.status(201).json(category);
});

// Get All Categories
const getAllCategories = asyncHandler(async (req, res) => {
  // Find if user exists
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid Request");
  }

  const categories = await Category.find();
  res.status(200).json(categories);
});

// Get Single Category
const getCategoryById = asyncHandler(async (req, res) => {
  // Find if user exists
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid Request");
  }

  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  res.status(200).json(category);
});

// Update Category
const updateCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  // Find if user exists
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid Request");
  }

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name, description },
    { new: true }
  );
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  res.status(200).json(category);
});

// Delete Category
const deleteCategory = asyncHandler(async (req, res) => {
  // Find if user exists
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid Request");
  }

  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  res.status(200).json({ message: "Category deleted" });
});

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
