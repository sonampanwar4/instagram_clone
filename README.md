# 📸 Instagram Clone (React Router v7 + Fastify)

A simplified Instagram-style web application built in 5 days using a modern full-stack architecture.

The project separates the frontend and backend into two independent services to maintain a clean separation of concerns, improve scalability, and follow modern development practices.

✨ Key highlights:
- ⚡ Server-Side Rendering (SSR)
- 🚀 Fast and modular backend
- 📦 Clean architecture inspired by NestJS
- 🧪 Test Driven Development (TDD)
- 🎨 Modern UI with Tailwind CSS

## 👀 Project Overview

This project aims to replicate core Instagram features such as:
- Viewing user profiles
- Displaying reels
- Viewing tagged posts
- Highlights with dynamic routes
- Creating posts with file uploads

The system is structured as two independent services:
- Frontend: SSR React application
- Backend: Fastify REST API

Both services communicate through HTTP APIs.

## 🧱 Architecture

The project follows a decoupled architecture:
- Backend exposes a REST API
- Frontend consumes the API via Axios
- State management handled with Zustand
- Data validation handled with Zod
```
Client (Browser)
    │ 
    ▼ 
React Router v7 SSR Frontend 
    │ 
    ▼ 
Axios HTTP Requests 
    │ 
    ▼
Fastify Backend API 
    │ 
    ▼ 
SQLite Database
```
### ⭐ Architecture Principles
- 🔹 Separation of concerns
- 🔹 Modular backend design
- 🔹 API-driven frontend
- 🔹 Type-safe validation with Zod

## 🗂 Project Structure
```
instagram_clone/
│
├── backend/
│   └── fastify_app/
│       ├── tests/
│
├── frontend/
│   └── react_app/
│       ├── app/
│
├── package.json
├── tsconfig.json
├── vite.config.json
└── README.md
```
## 🛠 Core Technologies
- Runtime: `Node`
- Backend: `Fastify, TypeScript, SQLite, Zod, amparo-fastify`
- Frontend: `React Router v7 (SSR), TypeScript, Axios, Zustand, Zod, Tailwind CSS`

## ⚙️ Installation & Setup 
Follow these steps to run the project locally.

### 📍 Clone the Repository
`git clone https://github.com/sonampanwar4/instagram_clone.git` 

Go to project directory: `cd instagram_clone`

Install dependencies: `npm install`

Navigate to the backend application: `cd backend/fastify_app`

Navigate to the frontend application: `cd frontend/react_app`

### 🔆 Start the development server:

⏩ Run backend server in one Terminal: `npm run dev:api`

⏩ Run frontend server in another Terminal: `npm run dev:ui`

The backend will start at: 👉 `http://localhost:3000` ✅

The frontend SSR application will run at: 👉 `http:// localhost:5173` ✅

### 🔐 Environment Variables
Create a .env file in the frontend project:

## 🧪 Testing Strategy

The backend follows a Test Driven Development (TDD) approach for critical modules such as Posts.

Testing ensures:
- Endpoint correctness
- Schema validation
- Error handling
- Stable API behavior

## 🚀 Deployment
Example deployment setup:
- Frontend : Vercel
- Backend : Render
- Database : SQLite

## 📌 Future Improvements

Potential enhancements:
- 🔐 Authentication system
- ❤️ Likes and comments
- ♾ Infinite scrolling feed
- 🖼 Image optimization
- 🔔 Notifications
- 👥 Follow / unfollow system

## 👨‍💻 Author

Built as a learning project to explore:
- Fastify backend architecture
- React Router v7 SSR
- Modern TypeScript full-stack patterns

## 📄 License

💟 This project is open source and available under the MIT License. 💌