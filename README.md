# Talabat Junior | طلبات جونيور 🚀

Welcome to **Talabat Junior**, a high-end Node.js backend system designed for the next generation of food delivery services. This project follows clean architecture principles and modern backend practices.

## 🛠 Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with Bcrypt password hashing
- **File Handling**: Multer for image uploads
- **Frontend**: Next.js 16+, Framer Motion, Tailwind CSS (Neo-Cyberpunk Aesthetic)

## 🏗 Backend Architecture
The system is structured for scalability and maintainability:
- `/routes`: API endpoints definition
- `/controllers`: Business logic implementation
- `/middleware`: Authentication, Error Handling, and File Uploads
- `/models`: Mongoose schemas and relationships

## 🔐 Security Features
- Password hashing using `bcryptjs`
- Protected routes using JWT middlware
- Role-based authorization (User/Admin)
- Express security best practices

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local installation

### Setup Instructions
1. **Clone the repository**
2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
3. **Configure Environment**:
   Create a `.env` file in the `backend` folder:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```
4. **Run the Server**:
   ```bash
   npm start
   ```

5. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📜 API Documentation
A Postman collection is included in the root directory for easy testing of all endpoints.

### Key Endpoints
- `POST /api/auth/register`: Create a new account
- `POST /api/auth/login`: Authenticate user
- `GET /api/restaurants`: List all restaurants
- `GET /api/menu-items`: Fetch menu items by restaurant

---
Developed as a **Final Project** for Node.js Backend Development.
