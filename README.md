# 🌟 eDonationHUB

eDonationHUB is a full-stack, role-based platform designed to connect donors, NGOs, and administrative teams to streamline transparent charity operations, resource distributions, and donation tracking.

---

## 🚀 Overview

The application is deployed using a decoupled architecture:
- **Frontend:** Hosted on Vercel
- **Backend:** Hosted on Render
- **Database:** MongoDB Atlas

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React with Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios (with Bearer token authorization interceptors)

### Backend
- **Runtime:** Node.js & Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT) & bcrypt.js password hashing
- **AI Integration:** Google Gemini API

---

## 📁 Repository Structure

```text
├── Frontend/                 # React + Vite client-side application
│   ├── src/
│   │   ├── pages/            # Admin, NGO, and Donor dashboard views
│   │   ├── api/              # Axios instance configuration
│   │   ├── App.jsx           # Client router and layout management
│   │   └── main.jsx          # React DOM entry point
│   └── package.json
│
├── Backend/                  # Express REST API
│   ├── config/               # Database connection setup
│   ├── routes/               # API endpoints (auth, donations, ngos, admin)
│   ├── uploads/              # Static file storage
│   ├── server.js             # Express entry point & CORS configuration
│   └── package.json
└── README.md