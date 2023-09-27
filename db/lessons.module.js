/* eslint-disable no-undef */

const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  lessonNumber: Number,
  lessonName: String,
  lessonTeacher: String,
  lessonBackground: String,
  lessonClass: Number,
});

const classScheduleSchema = new mongoose.Schema({
  lessons_monday: [lessonSchema],
  lessons_tuesday: [lessonSchema],
  lessons_wednesday: [lessonSchema],
  lessons_thursday: [lessonSchema],
  lessons_friday: [lessonSchema],
});

const schoolScheduleSchema = new mongoose.Schema({
  classes: {
    type: Map,
    of: classScheduleSchema,
  },
});

const SchoolScheduleModel = mongoose.model(
  "School-Schedule",
  schoolScheduleSchema,
  "lessons"
);

module.exports = SchoolScheduleModel;
