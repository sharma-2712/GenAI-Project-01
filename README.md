# 🤖 Prep IQ 

A full-stack AI-powered interview preparation and resume tailoring platform. The app lets users register, log in, upload a resume, describe a target job, and generate an AI interview report with technical questions, behavioral questions, skill-gap analysis, and a 7-day preparation plan. It also supports downloading a tailored resume PDF.

## ✨ Features

- 🔐 User authentication with register, login, logout, and protected routes
- 📄 Resume-based interview report generation using Google GenAI
- 🧠 AI-generated technical and behavioral interview questions
- 📊 Match score, skill gaps, and preparation roadmap
- 🧾 Generated resume PDF download
- 🗂️ MongoDB persistence for users, reports, and token blacklist
- 🌐 React + Vite frontend with route protection and modern UI

## 🧱 Tech Stack

### Backend
- 🟢 Node.js
- ⚡ Express
- 🍃 MongoDB + Mongoose
- 🪪 JSON Web Token authentication
- 🔑 bcryptjs password hashing
- 📤 Multer for resume uploads
- 🧾 pdf-parse for extracting resume text
- 🤖 @google/genai for AI generation
- 🖨️ Puppeteer for PDF creation

### Frontend
- ⚛️ React 19
- 🚀 Vite
- 🧭 React Router
- 🌐 Axios
- 🔔 React Hot Toast
- 🎨 Sass / SCSS

## 📁 Project Structure

```text
GenAI Project/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── config/
│       ├── controller/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── services/
└── frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── app.routes.jsx
        └── features/
            ├── auth/
            └── interview/
```

## 🚀 Getting Started

### 1) Clone the repository

```bash
git clone <your-repo-url>
cd "GenAI Project"
```

### 2) Install backend dependencies

```bash
cd backend
npm install
```

### 3) Install frontend dependencies

Open a second terminal:

```bash
cd frontend
npm install
```

## 🔑 Environment Variables

Create a `.env` file inside `backend/` with the following values:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECERT=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
```

## ▶️ Run the App Locally

### Backend

From `backend/`:

```bash
npm run dev
```

The server runs on `http://localhost:3000`.

### Frontend

From `frontend/`:

```bash
npm run dev
```

The Vite app runs on `http://localhost:5173`.

## 🌍 Deployment

### Frontend - Vercel
The frontend is deployed on **Vercel** for seamless React + Vite hosting.
- Build command: `npm run build`
- Start command: `npm run preview` (local) or automatic on Vercel

### Backend - Render
The backend API is deployed on **Render** for Node.js/Express hosting.
- Environment variables are configured in Render dashboard
- Auto-deploys from the main branch

**Note:** Ensure your frontend API calls point to the Render backend URL and CORS is configured appropriately.

## 🔄 How It Works

1. 📝 A user registers or logs in.
2. 🔒 The backend sets an auth token in an HTTP-only cookie.
3. 📄 The user uploads a resume and pastes a job description and self-description.
4. 🤖 The backend extracts resume text, sends the input to Google GenAI, and stores the generated interview report in MongoDB.
5. 📈 The frontend shows the report, skill gaps, and preparation roadmap.
6. 🖨️ The user can download a tailored resume PDF generated from the report data.

## 🧭 Main Routes

### Frontend Routes
- `/login` - Login page
- `/register` - Registration page
- `/` - Protected home dashboard
- `/interview/:interviewId` - Protected interview report view

### Backend API Routes

#### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/logout`
- `GET /api/auth/get-me`

#### Interview
- `POST /api/interview/`
- `GET /api/interview/`
- `GET /api/interview/report/:interviewId`
- `POST /api/interview/resume/pdf/:interviewReportId`

## 📌 Notes

- 📎 Resume upload is implemented with in-memory storage and a 3 MB file limit on the backend.
- 📄 The backend interview report flow currently expects a PDF resume for text extraction.
- 🍪 Authentication relies on cookies, so the frontend and backend run on `localhost:5173` and `localhost:3000` with CORS credentials enabled.

## 🛠️ Useful Commands

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## 📜 License

No license file is included in the repository.
