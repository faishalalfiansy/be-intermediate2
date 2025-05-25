const userModel = require('../models/userModel');

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password, repassword, no_hp } = req.body;

      if (!name || !email || !password || !repassword) {
        return res.status(400).json({ 
          success: false,
          error: "Name, email, password, dan repassword wajib diisi" 
        });
      }

      if (password !== repassword) {
        return res.status(400).json({
          success: false,
          error: "Password tidak sama"
        });
      }

      const existingUser = await userModel.login(email);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          error: "Email sudah terdaftar"
        });
      }

      const userId = await userModel.register({
        name,
        email,
        password,
        no_hp: no_hp || null
      });

      return res.status(201).json({
        success: true,
        message: "Registrasi berhasil",
        data: {
          user_id: userId,
          name,
          email
        },
        meta: {
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('Registration Error:', error);
      return res.status(500).json({
        success: false,
        error: "Terjadi kesalahan server",
        ...(process.env.NODE_ENV === 'development' && {
          detail: error.message
        })
      });
    }
  },
  login: async (req, res) => {
    try {
      const user = await userModel.login(req.body.email);
      
      if (!user || user.password !== req.body.password) {
        return res.status(401).json({
          success: false,
          error: "Email atau password salah",
          suggestion: "Periksa kembali credential Anda"
        });
      }

      res.json({
        success: true,
        message: "Login berhasil",
        data: {
          user_id: user.user_id,
          name: user.name,
          email: user.email
        },
        meta: {
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Server error",
        detail: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { user_id } = req.params;
      const { name, email, no_hp } = req.body;

      await userModel.updateProfile(user_id, { name, email, no_hp });

      res.json({
        success: true,
        message: "Profil berhasil diperbarui",
        data: {
          user_id,
          name,
          email,
          no_hp
        },
        meta: {
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Server error",
        detail: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};