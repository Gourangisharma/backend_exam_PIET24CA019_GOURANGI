// ============ A1.js : Task 1 - Library Book Management API ============
// Run:  node file/A1.js   (from the project root, where .env lives)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT_TASK1 || 3000;

app.use(express.json());   // parse JSON bodies
app.use(logger);           // log method + URL

app.use('/books', bookRoutes);

// unknown route -> 404
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

app.use(errorHandler);     // must be registered LAST

mongoose
  .connect(process.env.MONGO_URL_LIBRARY)
  .then(() => {
    console.log('MongoDB connected (library_db)');
    app.listen(PORT, () => console.log(`Task 1 server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
