const userModel = require('../models/userModel');

module.exports = {
  register: async (req, res) => {
    try {
      if (req.body.password !== req.body.repassword) {
        return res.status(400).json({ error: "Password tidak sama" });
      }
      
      const userId = await userModel.register(req.body);
      res.status(201).json({ user_id: userId });
    } catch (error) {
      res.status(400).json({ error: "Email sudah terdaftar" });
    }
  },

  login: async (req, res) => {
    try {
      const user = await userModel.login(req.body.email);
      
      if (!user || user.password !== req.body.password) {
        return res.status(401).json({ error: "Email atau password salah" });
      }

      res.json({ 
        user_id: user.user_id,
        name: user.name 
      });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
};