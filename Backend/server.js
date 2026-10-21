const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// 1. Ensure uploads directory physically exists on disk
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// 2. Allowed origins list
const allowedOrigins = [
  'http://localhost:5173',
  'https://major-project-opal-omega.vercel.app'
];

if (process.env.CLIENT_URL) {
  const cleanClientUrl = process.env.CLIENT_URL.replace(/\/+$/, '').split('/login')[0];
  if (!allowedOrigins.includes(cleanClientUrl)) {
    allowedOrigins.push(cleanClientUrl);
  }
}

// 3. CORS Configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow non-browser requests (Postman, mobile apps, or server-to-server)
    if (!origin) return callback(null, true);

    const sanitizedOrigin = origin.replace(/\/+$/, '');
    if (allowedOrigins.includes(sanitizedOrigin) || sanitizedOrigin.endsWith('.vercel.app')) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Preflight CORS handler
app.options('*', cors());

// 4. Request Parsers & Static Files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadsDir));

// 5. Mount API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/ngos', require('./routes/ngoRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
// app.use('/api/admin', require('./routes/adminRoutes'));

// 6. Fallback 404
app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

// 7. Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

// 8. Connect to MongoDB and Start Server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`[Server Running]: Port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();