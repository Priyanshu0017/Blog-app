const asyncHandler = require("express-async-handler");
const Author = require("../models/authorModel");
const User = require("../models/userModel");

// Create Author
const createAuthor = asyncHandler(async (req, res) => {
  const { name, avatar, bio } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Name is required");
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid Request");
  }

  const author = await Author.create({ name, avatar, bio });
  res.status(201).json(author);
});

// Get All Authors
const getAllAuthors = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid Request");
  }

  const authors = await Author.find();
  res.status(200).json(authors);
});

// Get Single Author
const getAuthorById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid Request");
  }

  const author = await Author.findById(req.params.id);
  if (!author) {
    res.status(404);
    throw new Error("Author not found");
  }
  res.status(200).json(author);
});

// Update Author
const updateAuthor = asyncHandler(async (req, res) => {
  const { name, avatar, bio } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid Request");
  }

  const author = await Author.findByIdAndUpdate(
    req.params.id,
    { name, avatar, bio },
    { new: true }
  );
  if (!author) {
    res.status(404);
    throw new Error("Author not found");
  }
  res.status(200).json(author);
});

// Delete Author
const deleteAuthor = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid Request");
  }

  const author = await Author.findByIdAndDelete(req.params.id);
  if (!author) {
    res.status(404);
    throw new Error("Author not found");
  }
  res.status(200).json({ message: "Author deleted" });
});

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
