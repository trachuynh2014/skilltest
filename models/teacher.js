const mongoose = require("mongoose");

// Define the schema for the 'Teacher' model
const teacherSchema = new mongoose.Schema({
  name: String,
  subject: String,
});

// Create the 'Teacher' model based on the schema
const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
