// models/institucionModel.js
import pool from '../db/connection.js';

const InstitucionModel = {
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM institucion ORDER BY ID_INSTITUCION');
    return rows;
  },
};

export default InstitucionModel;
