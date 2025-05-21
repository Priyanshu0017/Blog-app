const express = require('express')
const app = express()
const colors = require("colors");
const connectDB = require("./config/db_config");
const errorHandler = require('./middlewares/errorHandler');
require("dotenv").config();
const cors = require("cors");

connectDB();

app.use(cors({origin : "*"}));

// Body-Parser
app.use(express.json());

// Url-Encoded
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT  || 8080;

app.get("/", (req, res) => {
  res.json({
    msg: "Blog-app API RUNNING...",
  });
});

// user Routes
app.use("/api/user", require("./routes/authRoutes"));

app.use('/api/author',require('./routes/authorRoutes'))
app.use('/api/categories',require('./routes/categoriesRoutes'))
app.use('/api/posts',require('./routes/postRoutes'))
app.use('/api/admin',require('./routes/adminRoutes'))

// errorHandler
app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log(`server is running on port : ${PORT}`.bgBlue.black);
});