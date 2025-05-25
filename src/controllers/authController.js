const User = require("../models/userModel");

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, repassword, no_hp } = req.body;

    if (!name || !email || !password || !repassword || !no_hp) {
      return res.status(400).json({ 
        success: false,
        message: "Semua field wajib diisi!" 
      });
    }

    if (password !== repassword) {
      return res.status(400).json({ 
        success: false,
        message: "Password tidak cocok!" 
      });
    }

    // Cek email
    User.findByEmail(email, (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        return res.status(400).json({ 
          success: false,
          message: "Email sudah terdaftar!" 
        });
      }

      // Proses registrasi
      User.create({ name, email, password, no_hp }, (err) => {
        if (err) {
          console.error('Error saat create:', err);
          return res.status(500).json({ 
            success: false,
            message: "Gagal menyimpan user",
            error: "Terjadi kesalahan saat membuat user"
          });
        }
        
        res.json({ 
          success: true,
          message: "Registrasi berhasil!" 
        });
      });
    });

  } catch (err) {
    console.error('Error di controller:', err);
    res.status(500).json({ 
      success: false,
      message: "Terjadi kesalahan sistem",
      error: err.message 
    });
  }
};

// Login
exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({ 
        success: false,
        message: "Error server" 
      });
    }

    if (results.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: "Email belum terdaftar" 
      });
    }

    const user = results[0];
    if (user.password !== password) {
      return res.status(400).json({ 
        success: false,
        message: "Password salah" 
      });
    }

    res.json({ 
      success: true,
      message: "Login berhasil",
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        no_hp: user.no_hp
      }
    });
  });
};

// Update User
exports.updateUser = (req, res) => {
  const { name, email, no_hp } = req.body;
  const user_id = req.params.id;

  if (!name && !email && !no_hp) {
    return res.status(400).json({ 
      success: false,
      message: "Minimal isi satu field untuk update" 
    });
  }

  const updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (no_hp) updateData.no_hp = no_hp;

  User.update(user_id, updateData, (err) => {
    if (err) {
      return res.status(500).json({ 
        success: false,
        message: "Gagal update user" 
      });
    }
    
    res.json({ 
      success: true,
      message: "User berhasil diupdate" 
    });
  });
};