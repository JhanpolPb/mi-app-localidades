// models/sisbenModel.js
import pool from '../db/connection.js';

const SisbenModel = {
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM sisben ORDER BY ID_SISBEN');
    return rows;
  },

  delete: async (id) => {
    const [result] = await pool.query(
      'DELETE FROM sisben WHERE ID_SISBEN = ?',
      [id]
    );
    return result;
  },
};

export default SisbenModel;
