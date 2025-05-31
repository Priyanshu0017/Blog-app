//  this  is for google oAuth

const express = require("express");
const passport = require("passport");
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const User = require('../models/userModel'); // <-- Correct import for your User model

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // ✅ Send token to frontend in query or as a cookie
    res.redirect(`https://blog-app01-sigma.vercel.app/google/callback?token=${req.user.token}`);
  }
);

router.get("/user", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json(user);
});


module.exports = router;