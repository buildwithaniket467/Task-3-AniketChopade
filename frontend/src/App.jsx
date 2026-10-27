import React, { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm.jsx";
import StudentTable from "./components/StudentTable.jsx";
import Notification from "./components/Notification.jsx";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "./api/studentApi.js";

function App() {
  // ─── State ────────────────────────────────────────────────────────────────
  const [students, setStudents]           = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);  // null = "Add" mode
  const [notification, setNotification]   = useState(null);   // { type, message }
  const [loading, setLoading]             = useState(false);
  const [tableLoading, setTableLoading]   = useState(true);

  // ─── Fetch all students on mount ─────────────────────────────────────────
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setTableLoading(true);
    try {
      const res = await getAllStudents();
      setStudents(res.data.data);
    } catch (err) {
      showNotification("error", getErrorMessage(err));
    } finally {
      setTableLoading(false);
    }
  };

  // ─── Notification helpers ─────────────────────────────────────────────────
  const showNotification = (type, message) => {
    setNotification({ type, message });
    // Auto-clear after 4 seconds
    setTimeout(() => setNotification(null), 4000);
  };

  const getErrorMessage = (err) => {
    return (
      err?.response?.data?.message ||
      err?.message ||
      "An unexpected error occurred."
    );
  };

  // ─── CRUD handlers ────────────────────────────────────────────────────────

  /** Called when the form is submitted (both Add and Edit). */
  const handleFormSubmit = async (formData) => {
    setLoading(true);
    try {
      if (editingStudent) {
        // UPDATE
        await updateStudent(editingStudent._id, formData);
        showNotification("success", "Student updated successfully!");
      } else {
        // CREATE
        await createStudent(formData);
        showNotification("success", "Student added successfully!");
      }
      setEditingStudent(null); // Reset form to "Add" mode
      fetchStudents();         // Refresh the table
    } catch (err) {
      showNotification("error", getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  /** Populate the form with the selected student's data. */
  const handleEdit = (student) => {
    setEditingStudent(student);
    // Scroll to the top so the user can see the form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /** Cancel editing — revert form to "Add" mode. */
  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  /** Delete a student after confirmation. */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await deleteStudent(id);
      showNotification("success", "Student deleted successfully!");
      fetchStudents();
    } catch (err) {
      showNotification("error", getErrorMessage(err));
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="app-container">
      {/* ── Header ── */}
      <header className="app-header">
        <h1>Student Management System</h1>
        <p className="app-subtitle">
          Manage student records — add, view, edit, and delete with MongoDB persistence.
        </p>
      </header>

      {/* ── Notification Banner ── */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* ── Main Content ── */}
      <main className="main-content">
        {/* Add / Edit Form */}
        <section className="form-section">
          <h2>{editingStudent ? "✏️ Edit Student" : "➕ Add New Student"}</h2>
          <StudentForm
            editingStudent={editingStudent}
            onSubmit={handleFormSubmit}
            onCancelEdit={handleCancelEdit}
            loading={loading}
          />
        </section>

        {/* Student Records Table */}
        <section className="table-section">
          <h2>📋 Student Records</h2>
          <StudentTable
            students={students}
            loading={tableLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="app-footer">
        <p>
          DecodeLabs · Student Management System · MERN Stack Project
        </p>
      </footer>
    </div>
  );
}

export default App;
