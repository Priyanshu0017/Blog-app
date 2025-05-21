const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const adminprotect = asyncHandler(async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      if(req.user.isAdmin){
        next();
      }else{
        res.status(400)
        throw new Error('Only Accessable By Admin')
    }
    }else{
        res.status(401)
        throw new Error('Unauthorized Access')
    }
  } catch (error) {
    res.status(401)
        throw new Error('Only Accessable By Admin')
  }
});

module.exports = adminprotect;
