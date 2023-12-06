const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Model
const Student = require("./models/student");
const Teacher = require("./models/teacher");
const Class = require("./models/class");

// Middleware to parse JSON requests
router.use(express.json());

// Add a new student
router.post("/students", async (req, res) => {
  try {
    // Create a new student using the request body
    const newStudent = await Student.create(req.body);

    // Respond with the newly created student
    res.status(201).json(newStudent);
  } catch (error) {
    // Handle errors during student creation
    console.error("Error adding a new student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve student details by ID
router.get("/students/:id", async (req, res) => {
  try {
    // Find a student by ID
    const student = await Student.findById(req.params.id);
    // If no student is found, respond with a 404 status
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Respond with the found student
    res.json(student);
  } catch (error) {
    // Handle errors during student retrieval
    console.error("Error retrieving student details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// List students with cursor-based pagination
router.get("/students", async (req, res) => {
  try {
    const { cursor, limit = 10 } = req.query;

    // Build query based on cursor
    const query = cursor
      ? { _id: { $gt: mongoose.Types.ObjectId.createFromHexString(cursor) } }
      : {};

    // Find students, limit results, and sort by ID
    const students = await Student.find(query)
      .limit(Number(limit))
      .sort({ _id: 1 });

    // Respond with the list of students
    res.json(students);
  } catch (error) {
    console.error("Error listing students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update student information
router.put("/students/:id", async (req, res) => {
  try {
    // Update a student by ID and return the updated document
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Respond with the updated student
    res.json(updatedStudent);
  } catch (error) {
    console.error("Error updating student information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Remove a student
router.delete("/students/:id", async (req, res) => {
  try {
    // Delete a student by ID and return the deleted document
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Respond with a success message
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error removing a student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// summary
router.get("/summary", async (req, res) => {
  try {
    // Count total students
    const totalStudents = await Student.countDocuments();

    // Calculate average age using aggregation
    const averageAgeResult = await Student.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: "$age" },
        },
      },
    ]);

    // Count total classes
    const numberOfClasses = await Class.countDocuments();

    // Respond with the summary data
    res.json({
      totalStudents,
      averageAge: averageAgeResult[0]?.averageAge || 0,
      numberOfClasses,
    });
  } catch (error) {
    console.error("Error in aggregation endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
