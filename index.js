require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

// Routes
app.use('/auth', require('./src/routes/authRoutes'));

// Jalankan server
app.listen(process.env.APP_PORT, () => {
  console.log(`Server running on port ${process.env.APP_PORT}`);
});