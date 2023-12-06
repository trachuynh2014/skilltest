const mongoose = require("mongoose");

// Define the schema for the 'Student' model
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  grade: String,
  classID: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
});

// Create the 'Student' model based on the schema
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
