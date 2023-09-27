/* eslint-disable no-undef */

const mongoose = require("mongoose");

const classesSchema = new mongoose.Schema(
  {
    class: String,
  },
  {
    _id: false, // Exclude the _id field from the documents
  }
);

const classesModule = mongoose.model("Class", classesSchema, "classes");

module.exports = classesModule;
