/* eslint-disable no-undef */
const mongoose = require("mongoose");
const lessonsSchema = require("../db/lessons.module");
const classesSchema = require("../db/classes.module");

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

const db = async (mongodb_url) => {
  await mongoose
    .connect(mongodb_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the Database.");
    })
    .catch((err) => console.error(err));

  try {
    const lessons = await getLessons();
    const classes = await getClasses();

    return { lessons, classes };
  } catch (error) {
    console.error("Error in the main function:", error);
    throw error;
  }
};

module.exports = db;
