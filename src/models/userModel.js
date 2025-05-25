const db = require("../config/db");

const User = {
  // Register: Buat user baru
  create: (data, callback) => {
    const sql = "INSERT INTO user (name, email, password, no_hp) VALUES (?, ?, ?, ?)";
    db.query(sql, 
      [data.name, data.email, data.password, data.no_hp],
      (err, results) => {
        if (err) {
          console.error('Error di model:', err);
          return callback(err);
        }
        callback(null, results);
      }
    );
  },

  // Login: Cari user by email
  findByEmail: (email, callback) => {
    const sql = "SELECT * FROM user WHERE email = ?";
    db.query(sql, [email], callback);
  },

  // Update: Edit user by ID
  update: (id, data, callback) => {
    const sql = "UPDATE user SET ? WHERE user_id = ?";
    db.query(sql, [data, id], callback);
  },

  getById: (id, callback) => {
    const sql = "SELECT user_id, name, email, no_hp FROM user WHERE user_id = ?";
    db.query(sql, [id], callback);
  }
};

module.exports = User;