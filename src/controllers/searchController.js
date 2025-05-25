const courseModel = require('../models/searchModels');

module.exports = {
  searchCourses: async (req, res) => {
    try {

      const { kategori, min_price, max_price } = req.query;

      const results = await courseModel.searchCourses({
        kategori,
        min_price: parseFloat(min_price),
        max_price: parseFloat(max_price)
      });

      res.json({
        success: true,
        data: results
      });
    } catch (error) {
      console.error("Error searching courses:", error);
      res.status(500).json({ 
        success: false,
        error: "Terjadi kesalahan saat mencari kursus" 
      });
    }
  }
};