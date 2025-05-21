const express = require("express");
const {
  register,
  login,
} = require("../controllers/authController");
const router = express.Router();

// Method : post
// ACCESS : Public
// Route : /api/user/
router.post("/register", register);

// Method : post
// ACCESS : Public
// Route : /api/user/login
router.post("/login", login);


module.exports = router;
