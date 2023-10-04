/* eslint-disable no-undef */

const express = require("express");
const cors = require("cors");
const db = require("./db");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

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

app.use(express.json());
const port = 5231;

// Call the db function and handle the retrieved data
db(mongodb_url)
  .then((data) => {
    const { lessons, classes, getUser } = data; // Destructure the object to access lessons and classes

    app.get("/getLessons", (req, res) => {
      res.send(lessons);
    });
    app.get("/getClasses", (req, res) => {
      res.json(classes);
    });

    app.post("/login", async (req, res) => {
      console.log("Received login");
      console.log(req.body);
      const { username, password } = req.body;

      try {
        const user = await getUser(username);

        if (user && bcrypt.compareSync(password, user.password)) {
          res.status(200).json({ message: "Login successful" });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
  })
  .catch((error) => {
    console.error("Error in index.js:", error);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
