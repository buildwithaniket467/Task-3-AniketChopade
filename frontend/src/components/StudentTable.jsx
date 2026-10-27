import React from "react";

/**
 * StudentTable — renders all student records in a responsive table.
 *
 * Props:
 *  - students : Student[]  — array of student objects from the API
 *  - loading  : boolean    — shows a loading row while data is being fetched
 *  - onEdit   : (student) => void
 *  - onDelete : (id) => void
 */
function StudentTable({ students, loading, onEdit, onDelete }) {
  // ─── Loading state ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="table-message">
        <p>⏳ Loading student records…</p>
      </div>
    );
  }

  // ─── Empty state ─────────────────────────────────────────────────────────
  if (students.length === 0) {
    return (
      <div className="table-message">
        <p>📭 No student records found. Use the form above to add the first student!</p>
      </div>
    );
  }

  // ─── Table ────────────────────────────────────────────────────────────────
  return (
    <div className="table-wrapper">
      <p className="record-count">
        Total records: <strong>{students.length}</strong>
      </p>
      <table className="student-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Added On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>
                {new Date(student.createdAt).toLocaleDateString("en-IN", {
                  day:   "2-digit",
                  month: "short",
                  year:  "numeric",
                })}
              </td>
              <td className="action-cell">
                <button
                  id={`edit-btn-${student._id}`}
                  className="btn btn-edit"
                  onClick={() => onEdit(student)}
                  title="Edit this student"
                >
                  ✏️ Edit
                </button>
                <button
                  id={`delete-btn-${student._id}`}
                  className="btn btn-danger"
                  onClick={() => onDelete(student._id)}
                  title="Delete this student"
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
