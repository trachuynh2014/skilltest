const mongoose = require("mongoose");

// Define the schema for the 'Class' model
const classSchema = new mongoose.Schema({
  subject: String,
  teacherID: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  numberOfStudents: Number,
});

// Create the 'Class' model based on the schema
const Class = mongoose.model("Class", classSchema);

module.exports = Class;
