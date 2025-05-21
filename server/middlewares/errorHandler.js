const { stack } = require("../routes/authRoutes");

// Custom Error Handler
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode <= 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    msg: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
  next();
};

module.exports = errorHandler;
