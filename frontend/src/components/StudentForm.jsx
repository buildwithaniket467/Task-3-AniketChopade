import React, { useState, useEffect } from "react";

/**
 * StudentForm — used for both Adding and Editing a student.
 *
 * Props:
 *  - editingStudent : object | null  — when set, the form pre-fills with the student's data
 *  - onSubmit       : (formData) => void
 *  - onCancelEdit   : () => void
 *  - loading        : boolean        — disables the submit button while saving
 */
function StudentForm({ editingStudent, onSubmit, onCancelEdit, loading }) {
  const emptyForm = { name: "", email: "", course: "" };

  const [formData, setFormData]   = useState(emptyForm);
  const [errors, setErrors]       = useState({});

  // ─── Sync form fields whenever the editing target changes ─────────────────
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name:   editingStudent.name   || "",
        email:  editingStudent.email  || "",
        course: editingStudent.course || "",
      });
    } else {
      setFormData(emptyForm);
    }
    setErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingStudent]);

  // ─── Field change handler ─────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for the field the user is currently fixing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ─── Client-side validation ───────────────────────────────────────────────
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.course.trim()) {
      newErrors.course = "Course is required.";
    } else if (formData.course.trim().length < 2) {
      newErrors.course = "Course must be at least 2 characters.";
    }

    return newErrors;
  };

  // ─── Submit handler ───────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit({
      name:   formData.name.trim(),
      email:  formData.email.trim().toLowerCase(),
      course: formData.course.trim(),
    });
  };

  // ─── Cancel handler ───────────────────────────────────────────────────────
  const handleCancel = () => {
    setFormData(emptyForm);
    setErrors({});
    onCancelEdit();
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <form className="student-form" onSubmit={handleSubmit} noValidate>
      {/* Name */}
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Aniket Sharma"
          className={errors.name ? "input-error" : ""}
          disabled={loading}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. aniket@example.com"
          className={errors.email ? "input-error" : ""}
          disabled={loading}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      {/* Course */}
      <div className="form-group">
        <label htmlFor="course">Course</label>
        <input
          id="course"
          type="text"
          name="course"
          value={formData.course}
          onChange={handleChange}
          placeholder="e.g. Full Stack Development"
          className={errors.course ? "input-error" : ""}
          disabled={loading}
        />
        {errors.course && <span className="error-text">{errors.course}</span>}
      </div>

      {/* Actions */}
      <div className="form-actions">
        <button
          id="submit-btn"
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading
            ? "Saving…"
            : editingStudent
            ? "Update Student"
            : "Add Student"}
        </button>

        {editingStudent && (
          <button
            id="cancel-btn"
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default StudentForm;
