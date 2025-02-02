const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

mongoose
  .connect(
    "mongodb+srv://kavindajayaweera:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0.sbsjmwz.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to Database");
  })
  .catch(() => {
    console.log("Connection Failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,DELETE,OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
