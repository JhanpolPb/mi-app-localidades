// models/grupoEtnicoModel.js
import pool from '../db/connection.js';

const GrupoEtnicoModel = {
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM grupo_etnico ORDER BY ID_GRUPO_ETNICO');
    return rows;
  },

  create: async (nombre) => {
    const [result] = await pool.query(
      'INSERT INTO grupo_etnico (NOMBRE_GRUPO_ETNICO) VALUES (?)',
      [nombre]
    );
    return result;
  },
};

export default GrupoEtnicoModel;
