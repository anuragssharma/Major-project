# eDonationHUB Full-Stack Project

## Architecture
- **Backend:** Node.js, Express, MongoDB Mongoose, JWT Auth, Multer, Bcrypt
- **Frontend:** React 18, Vite, Tailwind CSS, Lucide Icons, Axios
- **AI Verification:** Google Gemini 3 Flash multimodal forensic inspection

## Quick Start Instructions

### 1. Database Setup
Ensure MongoDB is running locally on `mongodb://localhost:27017/edonationhub` or update `backend/.env` with your Atlas connection string.

### 2. Backend Setup
```bash
cd backend
npm install
node seed.js    # Creates admin account: admin@edonationhub.com / admin123
npm run dev     # Server starts on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev     # App starts on http://localhost:5173
```

### 4. Admin Credentials
- **Email:** admin@edonationhub.com
- **Password:** admin123
- **Role:** ADMIN
