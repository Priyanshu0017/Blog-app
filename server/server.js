const express = require("express");
const app = express();
const colors = require("colors");
const connectDB = require("./config/db_config");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();
const cors = require("cors");
const passport = require('passport')
const passport_config = require('./config/passport_config')
const oauthRoutes = require('./routes/oauthRoutes')

app.set('trust proxy',1);

connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://blog-app01-sigma.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
// Body-Parser
app.use(express.json());

// Url-Encoded
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;


app.use(passport.initialize())


app.get("/", (req, res) => {
  res.json({
    msg: "Blog-app API RUNNING...",
  });
});

// user Routes
app.use("/api/user", require("./routes/authRoutes"));

app.use("/api/author", require("./routes/authorRoutes"));
app.use("/api/categories", require("./routes/categoriesRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

//  this  is for google oAuth
app.use("/auth", oauthRoutes);
// errorHandler
app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log(`server is running on port : ${PORT}`.bgBlue.black);
});
