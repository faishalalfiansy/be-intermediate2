require('dotenv').config();
const mysql = require('mysql2');

// Buat koneksi ke database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect ke database
db.connect((err) => {
  if (err) {
    console.error('Gagal konek ke MySQL:', err.stack);
    process.exit(1); // Stop aplikasi jika error
  }
  console.log('terhubung ke MySQL sebagai ID', db.threadId);
});

// Handle error setelah koneksi
db.on('error', (err) => {
  console.error('MySQL Error:', err.code);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
  }
});

module.exports = db;