// ============ A2.js : Task 2 - Student Portal (JWT auth + protected routes) ============
// Run:  node file/A2.js   (from the project root, where .env lives)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth');

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET missing in .env');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT_TASK2 || 4000;

// ---- basic security ----
app.use(helmet());                                  // secure HTTP headers
app.use(cors());                                    // allow cross-origin requests
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,                         // 15 minutes
  max: 100,                                         // 100 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, try again later' },
}));

app.use(express.json());
app.use('/', authRoutes);

app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URL_PORTAL)
  .then(() => {
    console.log('MongoDB connected (student_portal_db)');
    app.listen(PORT, () => console.log(`Task 2 server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
