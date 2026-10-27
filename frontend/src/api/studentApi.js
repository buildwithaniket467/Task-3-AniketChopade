import axios from "axios";

/**
 * Axios instance pre-configured to talk to the backend API.
 *
 * In development the Vite proxy (vite.config.js) forwards /api/* requests
 * to http://localhost:5000, so no absolute URL is needed here.
 *
 * If you ever want to call the backend directly (e.g. in production),
 * set VITE_API_URL in a frontend .env file and uncomment the baseURL line.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Student CRUD helpers ─────────────────────────────────────────────────────

/** Fetch all students */
export const getAllStudents = () => api.get("/students");

/** Fetch a single student by MongoDB _id */
export const getStudentById = (id) => api.get(`/students/${id}`);

/** Create a new student — body: { name, email, course } */
export const createStudent = (data) => api.post("/students", data);

/** Update an existing student — body: { name, email, course } */
export const updateStudent = (id, data) => api.put(`/students/${id}`, data);

/** Delete a student by _id */
export const deleteStudent = (id) => api.delete(`/students/${id}`);

export default api;
