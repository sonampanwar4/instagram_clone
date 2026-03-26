# 📸 Instagram Clone (React Router v7 + Fastify)

A simplified Instagram-style web application built with a modern full-stack architecture using Hexagonal Architecture (Ports & Adapters) for the backend and SSR React Router v7 for the frontend.

This project emphasizes clean architecture, scalability, and maintainability, making it suitable as a production-style reference.

---

✨ Key highlights:
- ⚡ Server-Side Rendering (SSR)
- 🚀 Hexagonal Architecture (Backend)
- 🔌 Decoupled frontend & backend services
- 📦 Modular & scalable codebase
- 🧪 Test Driven Development (TDD)
- 🎨 Modern UI with Tailwind CSS
- ✅ Type-safe validation using Zod

## 👀 Project Overview

This project aims to replicate core Instagram features such as:
- Viewing user profiles
- Displaying reels
- Viewing tagged posts
- Highlights with dynamic routes
- Creating posts with file uploads

Both services communicate through HTTP APIs.

## 🧱 Architecture
#### 🔷 System Overview
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
#### 🧩 Backend Architecture (Hexagonal)
```
[ HTTP Layer (Fastify) ]
    │ 
    ▼ 
[ Controllers (Adapters) ]
    │ 
    ▼ 
[ Application (Use Cases) ]
    │ 
    ▼ 
[ Domain (Entities & Ports) ]
    │ 
    ▼ 
[ Repository Ports ]
    │ 
    ▼ 
[ Infrastructure (DB, SQLite) ]
```
### ⭐ Architecture Principles
- 🔹 Domain is framework-independent
- 🔹 Use cases contain business logic orchestration
- 🔹 ACommunication happens via ports (interfaces)
- 🔹 High testability through dependency inversion
- 🔹 Infrastructure is pluggable (DB, HTTP, etc.)

## 🗂 Project Structure
```
instagram_clone/
│
├── api-service/
│   └── src/
│       ├── common/
│           ├── file-storage.service.ts/
│
│           ├── core/
│           │   ├── database/
│           │   │   ├── database.plugin.ts
│           │   │   ├── database.transactions.ts
│
│           ├── modules/ # routes, service, test, types
│           │   ├── posts/  
│           │   ├── highlights/
│           │   ├── reels/
│           │   ├── tagged/
│           │   ├── server.ts
│   ├── tests/
│
├── ui-service/
│   └── app/
│       ├── components/
│       ├── routes/
│       ├── schemas/
│       ├── services/
│           │   ├── api.ts
│       ├── app.css
│       ├── root.tsx
│       ├── routes.ts
│       ├── public/
│       ├── react-router.config.ts
│
├── package.json
├── tsconfig.json
├── .prettierrc
├── eslint.config.mjs
├── jest.config.mjs
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

### ▶️ Run the Application

#### ✅ Start Backend
`npm run dev:api`

The backend runs on: 👉 `http://localhost:3000`
#### ✅ Start Frontend
`npm run dev:ui`

The frontend runs on: 👉 `http:// localhost:5173`

### 🔐 Environment Variables
Create a `.env` file inside the frontend `ui-service` folder:
`VITE_API_URL=http://localhost:3000`

## 🧪 Testing Strategy

The backend follows Test Driven Development (TDD).

✅ Tests cover:
- Use cases (business logic)
- Repository implementations
- API endpoints
- Validation (Zod schemas)

## 🚀 Deployment
Example deployment setup:
- Frontend -> Vercel
- Backend -> Render
- Database -> SQLite (or migrate to PostgreSQL)

## 📌 Future Improvements

Potential enhancements:
- 🔐 Authentication (JWT / OAuth)
- ❤️ Likes and comments system
- ♾ Infinite scrolling feed
- 🖼 Image optimization
- 🔔 Notifications
- 👥 Follow / unfollow system
- 🗄 Switch SQLite → PostgreSQL

## 👨‍💻 Author

Built as a learning project to explore:
- Hexagonal Architecture (Ports & Adapters)
- Fastify backend design
- React Router v7 SSR
- Scalable TypeScript patterns

## 📄 License

💟 This project is open source and available under the MIT License.