const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// ─────────────────────────────────────────────
// Helper: send a consistent error response
// ─────────────────────────────────────────────
const handleError = (res, error, statusCode = 500) => {
  // Mongoose validation errors → 400 Bad Request
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: messages.join(", ") });
  }
  // Duplicate key (unique email violation) → 409 Conflict
  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "A student with this email already exists.",
    });
  }
  // Generic server error
  return res.status(statusCode).json({ success: false, message: error.message });
};

// ─────────────────────────────────────────────
// CREATE — POST /api/students
// ─────────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const { name, email, course } = req.body;

    // Basic presence check (Mongoose validators also run, but give a friendlier early message)
    if (!name || !email || !course) {
      return res
        .status(400)
        .json({ success: false, message: "Name, email, and course are all required." });
    }

    const student = new Student({ name, email, course });
    const saved = await student.save();

    res.status(201).json({
      success: true,
      message: "Student added successfully!",
      data: saved,
    });
  } catch (error) {
    handleError(res, error);
  }
});

// ─────────────────────────────────────────────
// READ ALL — GET /api/students
// ─────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    // Sort newest first
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    handleError(res, error);
  }
});

// ─────────────────────────────────────────────
// READ ONE — GET /api/students/:id
// ─────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    handleError(res, error);
  }
});

// ─────────────────────────────────────────────
// UPDATE — PUT /api/students/:id
// ─────────────────────────────────────────────
router.put("/:id", async (req, res) => {
  try {
    const { name, email, course } = req.body;

    if (!name || !email || !course) {
      return res
        .status(400)
        .json({ success: false, message: "Name, email, and course are all required." });
    }

    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, course },
      {
        new: true,          // return the updated document
        runValidators: true, // run schema validators on update
      }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully!",
      data: updated,
    });
  } catch (error) {
    handleError(res, error);
  }
});

// ─────────────────────────────────────────────
// DELETE — DELETE /api/students/:id
// ─────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }
    res.status(200).json({
      success: true,
      message: "Student deleted successfully!",
      data: deleted,
    });
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
