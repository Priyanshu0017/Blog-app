const express = require("express");
const protect = require("../middlewares/authMiddleware");
const { createAuthor, getAllAuthors, getAuthorById, updateAuthor, deleteAuthor } = require("../controllers/authorController");
const router = express.Router();

// Create Author
router.post("/",protect,createAuthor);

// Get All Authors
router.get("/",protect,getAllAuthors);

// Get Single Author
router.get("/:id",protect ,getAuthorById);

// Update Author
router.put("/:id",protect ,updateAuthor);

// Delete Author
router.delete("/:id",protect,deleteAuthor);

module.exports = router;