const userModel = require('../models/userModel');

module.exports = {
  register: async (req, res) => {
    try {
      if (req.body.password !== req.body.repassword) {
        return res.status(400).json({
          success: false,
          error: "Password tidak sama",
          suggestion: "Periksa kembali password Anda"
        });
      }

      const existingUser = await userModel.login(req.body.email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: "Email sudah terdaftar",
          suggestion: "Gunakan email lain"
        });
      }
      
      const userId = await userModel.register(req.body);
      res.status(201).json({
        success: true,
        message: "Registrasi berhasil",
        data: {
          user_id: userId
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
  }
};