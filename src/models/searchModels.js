const db = require('../config/db');

module.exports = {
  searchCourses: async ({ kategori, min_price, max_price }) => {
    let query = `
      SELECT 
        p.kelas_id, 
        p.nama_kelas, 
        p.description, 
        p.price,
        k.kategori
      FROM produk_kelas p
      JOIN kategori_kelas k ON p.no_id = k.no_id
      WHERE 1=1
    `;
    const params = [];

    if (kategori) {
      query += ' AND k.kategori = ?';
      params.push(kategori);
    }
    if (min_price) {
      query += ' AND p.price >= ?';
      params.push(min_price);
    }
    if (max_price) {
      query += ' AND p.price <= ?';
      params.push(max_price);
    }

    const [rows] = await db.query(query, params);
    return rows;
  },

  getCourseDetail: async (id) => {
    const [rows] = await db.query(`
      SELECT 
        p.*,
        k.kategori
      FROM produk_kelas p
      JOIN kategori_kelas k ON p.no_id = k.no_id
      WHERE p.kelas_id = ?
    `, [id]);
    return rows[0];
  }
};