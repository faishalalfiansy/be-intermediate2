const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const searchRoutes = require('./src/routes/searchRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.use('/search', searchRoutes);

app.get('/', (req, res) => {
  res.send('Server berjalan dengan sukses!');
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
