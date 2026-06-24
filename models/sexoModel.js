// models/sexoModel.js
import pool from '../db/connection.js';

const SexoModel = {
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM sexo ORDER BY ID_SEXO');
    return rows;
  },

  create: async (nombre) => {
    const [result] = await pool.query(
      'INSERT INTO sexo (NOMBRE_SEXO) VALUES (?)',
      [nombre]
    );
    return result;
  },
};

export default SexoModel;
