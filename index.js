const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('src/config/db');
const authRoutes = require('src/routes/authRoutes');
const searchRoutes = require('src/routes/searchRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.use('/courses', courseRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3306');
});