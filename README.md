# Student Management System — MERN Stack

A full-stack CRUD application built with **MongoDB, Express.js, React (Vite), and Node.js**.

> **DecodeLabs · Full Stack Development · Project 3**

---

## 📁 Project Structure

```
Project3/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── models/
│   │   └── Student.js             # Mongoose Student schema
│   ├── routes/
│   │   └── studentRoutes.js       # Express CRUD routes
│   ├── .env                       # Environment variables (not in Git)
│   ├── .env.example               # Template — copy this to .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js                  # Express app entry point
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── api/
    │   │   └── studentApi.js      # Axios API service functions
    │   ├── components/
    │   │   ├── Notification.jsx   # Success / error banner
    │   │   ├── StudentForm.jsx    # Add & Edit form
    │   │   └── StudentTable.jsx   # Records table
    │   ├── App.jsx                # Root component (state & handlers)
    │   ├── index.css              # Global styles
    │   └── main.jsx               # React entry point
    ├── index.html
    ├── package.json
    └── vite.config.js             # Vite + proxy config
```

---

## Prerequisites

| Tool        | Version (min) | Download                              |
|-------------|---------------|---------------------------------------|
| Node.js     | 18+           | https://nodejs.org/                   |
| npm         | 9+            | Included with Node.js                 |
| MongoDB     | 6+ (local)    | https://www.mongodb.com/try/download/ |
| _or Atlas_  | (cloud)       | https://www.mongodb.com/cloud/atlas   |

---

## Step-by-Step Setup

### Step 1 — Configure the Database

**Option A — Local MongoDB**

1. Install and start MongoDB (the mongod service must be running).
2. Open backend/.env — the default value is already correct:
   MONGO_URI=mongodb://localhost:27017/student_management
   PORT=5000

**Option B — MongoDB Atlas (cloud)**

1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a new project and a free-tier (M0) cluster.
3. Under Database Access, add a database user (username + password).
4. Under Network Access, add 0.0.0.0/0 to allow your machine.
5. Click Connect > Drivers and copy the connection string.
6. Open backend/.env and replace MONGO_URI:
   MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/student_management?retryWrites=true&w=majority

---

### Step 2 — Install Backend Dependencies

  cd Project3/backend
  npm install

### Step 3 — Start the Backend Server

  npm start           # production
  npm run dev         # development (nodemon auto-restart)

Expected output:
  MongoDB Connected: localhost
  Server is running on http://localhost:5000

### Step 4 — Install Frontend Dependencies

Open a NEW terminal window:

  cd Project3/frontend
  npm install

### Step 5 — Start the Frontend Dev Server

  npm run dev

Open http://localhost:5173 in your browser.

---

## Testing Each CRUD Operation

**Create** — Fill in Name, Email, Course and click Add Student.
**Read**   — Table loads automatically; sorted newest-first.
**Update** — Click Edit on a row; form pre-fills. Click Update Student to save.
**Delete** — Click Delete on a row; confirm the dialog.

---

## Verifying Records in MongoDB

**Local mongosh:**
  mongosh
  use student_management
  db.students.find().pretty()

**MongoDB Atlas:**
  Dashboard > Browse Collections > student_management > students

---

## REST API Reference

  GET    /api/students          — Get all students
  GET    /api/students/:id      — Get one student
  POST   /api/students          — Create student  { name, email, course }
  PUT    /api/students/:id      — Update student  { name, email, course }
  DELETE /api/students/:id      — Delete student

---

## Troubleshooting

  ECONNREFUSED         — MongoDB not running. Start mongod service.
  bad auth             — Wrong Atlas username/password in .env
  connection timed out — IP not whitelisted on Atlas Network Access
  409 Conflict         — Email already exists. Use a unique email.
  CORS error           — Backend not running on port 5000.
  Port already in use  — Change PORT in .env and update vite.config.js proxy.
