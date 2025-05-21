const express = require("express");
const protect = require("../middlewares/authMiddleware");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoriesController");
const router = express.Router();

// Create
router.post("/", protect, createCategory);

// Get All
router.get("/", protect, getAllCategories);

// Get Single
router.get("/:id", protect, getCategoryById);

// Update
router.put("/:id", protect, updateCategory);

// Delete
router.delete("/:id", protect, deleteCategory);

module.exports = router;
