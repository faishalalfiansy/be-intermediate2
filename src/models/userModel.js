const db = require("../config/db");

const User = {
  create: (data, callback) => {
    const sql = "INSERT INTO user (name, email, password, no_hp) VALUES (?, ?, ?, ?)";
    db.query(sql, [data.name, data.email, data.password, data.no_hp], callback);
  },

  findByEmail: (email, callback) => {
    const sql = "SELECT * FROM user WHERE email = ?";
    db.query(sql, [email], callback);
  },

  update: (id, data, callback) => {
    const sql = "UPDATE user SET name = ?, email = ?, no_hp = ? WHERE id = ?";
    db.query(sql, [data.name, data.email, data.no_hp, id], callback);
  }
};

module.exports = User;
