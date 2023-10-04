/* eslint-disable no-undef */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const lessonsSchema = require("../db/lessons.module");
const classesSchema = require("../db/classes.module");
const User = require("../db/user.module");

async function getLessons() {
  try {
    const lessons = await lessonsSchema.find().lean();
    return lessons;
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw error;
  }
}

async function getClasses() {
  try {
    const classes = await classesSchema.find().lean();

    return classes;
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw error;
  }
}

async function insertUserIfNotExists(username, password) {
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("User already exists:", existingUser);
      return existingUser;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      password: hashedPassword,
    });

    await newUser.save(); // Save the new user to the database
    console.log("User inserted successfully:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  }
}

async function getUser(username) {
  try {
    const user = await User.findOne({ username }).lean();
    return user;
  } catch (error) {
    console.error("Error retrieving user data:", error);
    throw error;
  }
}

const db = async (mongodb_url) => {
  try {
    await mongoose
      .connect(mongodb_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to the Database.");
      })
      .catch((err) => console.error(err));

    const defaultUsername = "admin"; // Change this to the desired default username
    const defaultPassword = "admin123"; // Change this to the desired default password
    const defaultUser = await insertUserIfNotExists(
      defaultUsername,
      defaultPassword
    );

    const lessons = await getLessons();
    const classes = await getClasses();

    return { lessons, classes, getUser };
  } catch (error) {
    console.error("Error in the main function:", error);
    throw error;
  }
};

module.exports = db;
