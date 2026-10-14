const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Allowed origins list
const allowedOrigins = [
  'http://localhost:5173',
  'https://major-project-opal-omega.vercel.app'
];

// If CLIENT_URL is defined in .env, clean it (remove trailing slashes or subpaths) and add it
if (process.env.CLIENT_URL) {
  const cleanClientUrl = process.env.CLIENT_URL.replace(/\/+$/, '').split('/login')[0];
  if (!allowedOrigins.includes(cleanClientUrl)) {
    allowedOrigins.push(cleanClientUrl);
  }
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow non-browser requests (e.g. Postman, mobile apps, or server-to-server)
    if (!origin) return callback(null, true);

    // Normalize origin by stripping any trailing slash
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

// Explicitly handle CORS preflight for all routes
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount API Endpoints
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/ngos', require('./routes/ngoRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Fallback 404
app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[Server Running]: Port ${PORT}`));