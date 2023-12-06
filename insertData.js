// insertData.js
require("dotenv").config();

const mongoose = require("mongoose");
const Student = require("./models/student");
const Teacher = require("./models/teacher");
const Class = require("./models/class");

const mongoString = process.env.DATABASE_URL;

// Connect to MongoDB
mongoose.connect(mongoString);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
  try {
    // Insert sample data

    // Insert teachers
    const teacher1 = await Teacher.create({
      name: "John Doe",
      subject: "Mathematics",
    });
    const teacher2 = await Teacher.create({
      name: "Jane Smith",
      subject: "Science",
    });

    // Insert classes
    const class1 = await Class.create({
      subject: "Math Class",
      teacherID: teacher1._id,
      numberOfStudents: 20,
    });
    const class2 = await Class.create({
      subject: "Science Class",
      teacherID: teacher2._id,
      numberOfStudents: 15,
    });

    // Insert students
    await Student.create({
      name: "Student1",
      age: 15,
      grade: "A",
      classID: class1._id,
    });
    await Student.create({
      name: "Student2",
      age: 16,
      grade: "B",
      classID: class1._id,
    });
    await Student.create({
      name: "Student3",
      age: 14,
      grade: "A",
      classID: class2._id,
    });
    await Student.create({
      name: "Student4",
      age: 17,
      grade: "C",
      classID: class2._id,
    });

    console.log("Sample data inserted successfully");
  } catch (error) {
    console.error("Error inserting sample data:", error);
  } finally {
    // Close the connection after inserting data
    mongoose.connection.close();
  }
});
