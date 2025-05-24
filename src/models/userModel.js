const db = require('../config/db');

module.exports = {
  register: async ({ name, email, password, no_hp }) => {
    const [result] = await db.query(
      "INSERT INTO user (name, email, password, no_hp) VALUES (?, ?, ?, ?)",
      [name, email, password, no_hp]
    );
    return result.insertId;
  },

  login: async (email) => {
    const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
    return rows[0];
  },

  updateProfile: async (userId, { name, email, no_hp }) => {
    await db.query(
      "UPDATE user SET name = ?, email = ?, no_hp = ? WHERE user_id = ?",
      [name, email, no_hp, userId]
    );
  }
};