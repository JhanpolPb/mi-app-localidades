// models/edadModel.js
import pool from '../db/connection.js';

const EdadModel = {
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM edad ORDER BY ID_EDAD');
    return rows;
  },

  delete: async (id) => {
    const [result] = await pool.query(
      'DELETE FROM edad WHERE ID_EDAD = ?',
      [id]
    );
    return result;
  },
};

export default EdadModel;
