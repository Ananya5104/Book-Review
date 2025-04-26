# 📚 Book Review Platform

A full-featured book review platform built with the MERN stack that allows users to discover books, leave reviews, and interact through a clean and responsive UI. Admins can manage content via a dedicated dashboard. Designed to foster a reading community through thoughtful engagement.

---

## 🚀 Live Demo

🔗 [Visit the Live Application](https://book-review-frontend-x0zl.onrender.com/)

---

## 🛠 Tech Stack & Tools

### ⚛️ Frontend
- **React.js** – For building user interfaces
- **Redux Toolkit** – State management
- **React Router** – Page routing
- **Axios** – HTTP requests
- **React Toastify** – Notifications
- **Responsive CSS** – Works across all devices

### 🔙 Backend
- **Node.js + Express.js** – RESTful APIs
- **MongoDB + Mongoose** – NoSQL database and schema modeling
- **JWT** – Authentication using JSON Web Tokens
- **bcrypt** – Secure password hashing
- **dotenv** – Environment configuration
- **cors + helmet** – Secure API headers

---

## ✅ Features

### 👤 User Management
- Secure JWT-based authentication (Register/Login)
- Update user profile
- Role-based access: Regular User vs Admin

### 📖 Book Catalog
- Add/edit/delete books (admin only)
- View full book info: title, author, genre, description, cover, etc.
- Search books by title
- Filter books by genre
- Pagination for efficient data handling
- Highlight featured books on homepage

### ✍️ Review System
- Authenticated users can:
  - Post reviews with 1–5 star ratings
  - Add comments
  - Edit or delete their own reviews
- Reviews are linked to both book and user
- Real-time rating aggregation for each book
- ⚠️ **Note:** *“Refine Review” button is present but **not functional** — AI integration is planned for future versions.*

### 🛠 Admin Dashboard
- Add, update, or remove books
- Feature/unfeature books for homepage promotion
- Manage user accounts and permissions

---

## 🧠 Advanced Features

- ✅ Real-time average rating updates
- ✅ Client and server-side form validation
- ✅ Responsive image fallbacks
- ✅ Toast alerts for all key actions
- 🚫 *Review refinement via AI is planned but currently inactive*

---

## 🗂 Folder Structure

book-review-platform/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.js
├── README.md
└── package.json

---

## 🛠 Setup Instructions

### 🧩 Prerequisites
- Node.js & npm
- MongoDB (local or MongoDB Atlas)
- Git

---

### 📦 Backend Setup

### 📦 Backend Setup

1. Navigate to the backend directory and install dependencies:

   ```bash
   cd backend
   npm install

2. Create a .env file and add the following:
   PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
3. Run the backend:

   ```bash
   cd backend
   npm install


4. Navigate to the frontend directory and install dependencies:
      ```bash
   cd frontend
   npm install

5. Run Frontend:
    ```bash
    npm run dev

## 🧪 Known Issues

- The **"Refine Review"** button is visible in the review form but currently non-functional.  
  This feature is intended for future AI-powered enhancements (e.g., using GPT models).

---

## 💡 Future Enhancements

- GPT-powered review polishing
- Likes and comments on reviews
- User following and reading lists
- Notifications system
- Book recommendation engine
