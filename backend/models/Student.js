const mongoose = require("mongoose");

/**
 * Student Schema
 * Fields:
 *  - name   : Student's full name (required)
 *  - email  : Student's email address (required, unique)
 *  - course : Course the student is enrolled in (required)
 *
 * Timestamps are added automatically by Mongoose (createdAt, updatedAt).
 */
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true,
      minlength: [2, "Course must be at least 2 characters long"],
      maxlength: [100, "Course name cannot exceed 100 characters"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
