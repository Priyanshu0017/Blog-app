const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminprotect = require('../middlewares/adminMiddleware')

// Blog Posts Management
router.get("/posts",adminprotect, adminController.getAllPosts);
router.put("/posts/:id",adminprotect, adminController.updatePost);
router.delete("/posts/:id",adminprotect, adminController.deletePost);

// Authors Management
router.get("/authors",adminprotect, adminController.getAllAuthors);
router.put("/authors/:id",adminprotect, adminController.updateAuthor);
router.delete("/authors/:id",adminprotect, adminController.deleteAuthor);

// Categories Management
router.get("/categories",adminprotect, adminController.getAllCategories);
router.put("/categories/:id",adminprotect, adminController.updateCategory);
router.delete("/categories/:id",adminprotect, adminController.deleteCategory);

module.exports = router;