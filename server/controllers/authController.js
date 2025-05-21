const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if Any detail is missing
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all details");
  }
  // Check if user already exists
  const userExist = await User.findOne({ email: email });

  if (userExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  // Hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  console.log(hashedPassword);
  // Create user
  const userCreate = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (!userCreate) {
    res.status(400);
    throw new Error("User Not Created");
  }
  res.status(201).json({
    id: userCreate._id,
    name: userCreate.name,
    email: userCreate.email,
    token: generateToken(userCreate._id),
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if Any detail is missing
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all details");
  }

  // check userexists or not
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      isAdmin : user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};


module.exports = { register, login };