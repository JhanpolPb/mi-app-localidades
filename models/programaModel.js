// models/programaModel.js
import pool from '../db/connection.js';

const ProgramaModel = {
  getAll: async () => {
    const query = `
      SELECT p.ID_PROGRAMA, p.NOMBRE_PROGRAMA, i.NOMBRE_INSTITUCION
      FROM programa p
      JOIN institucion i ON p.ID_IES = i.ID_INSTITUCION
      ORDER BY p.ID_PROGRAMA
    `;
    const [rows] = await pool.query(query);
    return rows;
  },
};

export default ProgramaModel;
