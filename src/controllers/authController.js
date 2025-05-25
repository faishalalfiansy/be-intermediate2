const User = require("../models/userModel");

exports.register = (req, res) => {
  const { name, email, password, repassword, no_hp } = req.body;
  if (!name || !email || !password || !repassword || !no_hp) {
    return res.status(400).json({ message: "Semua field wajib diisi!" });
  }

  if (password !== repassword) {
    return res.status(400).json({ message: "Password tidak cocok!" });
  }

  User.findByEmail(email, (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ message: "Email sudah terdaftar!" });
    }

    User.create({ name, email, password, no_hp }, (err) => {
      if (err) return res.status(500).json({ message: "Gagal register" });
      res.json({ message: "Berhasil register" });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, (err, results) => {
    if (results.length === 0) {
      return res.status(400).json({ message: "Email tidak ditemukan" });
    }

    const user = results[0];
    if (user.password !== password) {
      return res.status(400).json({ message: "Password salah" });
    }

    res.json({ message: "Berhasil login", user });
  });
};

exports.updateUser = (req, res) => {
  const { name, email, no_hp } = req.body;
  const id = req.params.id;

  User.update(id, { name, email, no_hp }, (err) => {
    if (err) return res.status(500).json({ message: "Gagal update user" });
    res.json({ message: "User berhasil diupdate" });
  });
};
