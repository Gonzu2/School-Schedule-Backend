/* eslint-disable no-undef */

const express = require("express");
const cors = require("cors");
const db = require("./db");
const dotenv = require("dotenv");

dotenv.config();

const mongodb_url = process.env.MONGODB_URL;

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://kahoot-copy-2gxt.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
const port = 5231;

// Call the db function and handle the retrieved data
db(mongodb_url)
  .then((data) => {
    const { lessons, classes } = data; // Destructure the object to access lessons and classes
    console.log(lessons);

    app.get("/getLessons", (req, res) => {
      res.send(lessons);
    });
    app.get("/getClasses", (req, res) => {
      res.json(classes);
    });
  })
  .catch((error) => {
    console.error("Error in index.js:", error);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
